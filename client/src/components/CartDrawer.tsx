import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatMoney } from "../utils/format";

export function CartDrawer() {
  const { cart, cartOpen, cartCount, cartSubtotal, setCartOpen, updateQuantity, removeFromCart } = useStore();

  return (
    <>
      <button
        type="button"
        className={`drawer-backdrop ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
        aria-label="Close shopping bag"
        tabIndex={cartOpen ? 0 : -1}
      />
      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen} aria-label="Shopping bag">
        <header className="drawer-header">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Shopping bag <span>({cartCount})</span></h2>
          </div>
          <button type="button" className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={20} /></button>
        </header>

        {cart.length === 0 ? (
          <div className="empty-bag">
            <ShoppingBag size={38} strokeWidth={1.25} />
            <h3>Your bag is waiting</h3>
            <p>Discover considered pieces designed to move beautifully through your day.</p>
            <Link className="button button--dark" to="/shop" onClick={() => setCartOpen(false)}>Explore the collection</Link>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <article className="drawer-item" key={item.key}>
                  <img src={item.product.image} alt="" onError={(event) => { event.currentTarget.src = "/images/elan-campaign-hero.png"; }} />
                  <div className="drawer-item__content">
                    <div>
                      <h3>{item.product.name}</h3>
                      <p>{item.color} · {item.size}</p>
                    </div>
                    <div className="drawer-item__actions">
                      <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                      </div>
                      <strong>{formatMoney(item.product.basePrice * item.quantity)}</strong>
                    </div>
                    <button type="button" className="text-button" onClick={() => removeFromCart(item.key)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
            <footer className="drawer-footer">
              <div className="progress-copy">
                <span>{cartSubtotal >= 150 ? "Complimentary shipping unlocked" : `${formatMoney(150 - cartSubtotal)} away from complimentary shipping`}</span>
                <div><i style={{ width: `${Math.min(100, cartSubtotal / 1.5)}%` }} /></div>
              </div>
              <div className="drawer-subtotal"><span>Subtotal</span><strong>{formatMoney(cartSubtotal)}</strong></div>
              <p>Taxes and shipping calculated at checkout.</p>
              <Link className="button button--dark button--full" to="/checkout" onClick={() => setCartOpen(false)}>Continue to checkout</Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
