import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "../api/client";
import type { CartItem, Order, Product, User, Variant } from "../types";

type Toast = { id: number; message: string } | null;

type StoreValue = {
  products: Product[];
  loading: boolean;
  error: string;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  wishlist: string[];
  user: User | null;
  token: string;
  toast: Toast;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: Variant, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  toggleWishlist: (productId: string) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  placeOrder: (shippingAddress: Record<string, string>) => Promise<Order>;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "elan-store-cart-v1";
const WISHLIST_KEY = "elan-store-wishlist-v1";
const SESSION_KEY = "elan-store-session-v1";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<CartItem[]>(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage(WISHLIST_KEY, []));
  const [session, setSession] = useState<{ user: User | null; token: string }>(() => readStorage(SESSION_KEY, { user: null, token: "" }));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    let cancelled = false;
    api.products()
      .then((response) => {
        if (!cancelled) setProducts(response.data);
      })
      .catch((reason: Error) => {
        if (!cancelled) setError(reason.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem(SESSION_KEY, JSON.stringify(session)), [session]);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => setToast((current) => current?.id === id ? null : current), 3200);
  }, []);

  const addToCart = useCallback((product: Product, variant: Variant, quantity = 1) => {
    const key = `${product.id}:${variant.id}`;
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item);
      return [...current, { key, product, variantId: variant.id, size: variant.size, color: variant.color, quantity }];
    });
    setCartOpen(true);
    notify(`${product.name} added to your bag.`);
  }, [notify]);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((current) => current.map((item) => item.key === key ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) } : item));
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((current) => current.filter((item) => item.key !== key));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => {
      const isSaved = current.includes(productId);
      notify(isSaved ? "Removed from your edit." : "Saved to your edit.");
      return isSaved ? current.filter((id) => id !== productId) : [...current, productId];
    });
  }, [notify]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.login(email, password);
    setSession(response.data);
    notify(`Welcome back, ${response.data.user.name.split(" ")[0]}.`);
    return response.data.user;
  }, [notify]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await api.register(name, email, password);
    setSession(response.data);
    notify("Your Élan account is ready.");
    return response.data.user;
  }, [notify]);

  const logout = useCallback(() => {
    setSession({ user: null, token: "" });
    notify("You’re signed out.");
  }, [notify]);

  const placeOrder = useCallback(async (shippingAddress: Record<string, string>) => {
    if (!session.token) throw new Error("Please sign in before completing checkout.");
    const response = await api.createOrder(session.token, {
      items: cart.map((item) => ({ productId: item.product.id, variantId: item.variantId, quantity: item.quantity })),
      shippingAddress
    });
    setCart([]);
    notify("Order confirmed — welcome to the atelier.");
    return response.data;
  }, [cart, notify, session.token]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);

  const value = useMemo<StoreValue>(() => ({
    products,
    loading,
    error,
    cart,
    cartCount,
    cartSubtotal,
    cartOpen,
    wishlist,
    user: session.user,
    token: session.token,
    toast,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    login,
    register,
    logout,
    placeOrder,
    notify
  }), [products, loading, error, cart, cartCount, cartSubtotal, cartOpen, wishlist, session, toast, addToCart, updateQuantity, removeFromCart, toggleWishlist, login, register, logout, placeOrder, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider.");
  return value;
}
