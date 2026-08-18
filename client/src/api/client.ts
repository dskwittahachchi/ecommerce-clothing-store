import type { AdminDashboard, Order, Product, User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "/api";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Array<{ field: string; message: string }>;
  meta?: Record<string, unknown>;
};

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || "Request failed.");
  return payload;
}

export const api = {
  products: () => request<Product[]>("/products?limit=24"),
  product: (slug: string) => request<Product>(`/products/${slug}`),
  login: (email: string, password: string) => request<{ user: User; token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  register: (name: string, email: string, password: string) => request<{ user: User; token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  }),
  createOrder: (token: string, body: unknown) => request<Order>("/orders", { method: "POST", body: JSON.stringify(body) }, token),
  myOrders: (token: string) => request<Order[]>("/orders/my", {}, token),
  adminDashboard: (token: string) => request<AdminDashboard>("/admin/dashboard", {}, token),
  updateOrderStatus: (token: string, id: string, status: string) => request<Order>(`/admin/orders/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status })
  }, token)
};
