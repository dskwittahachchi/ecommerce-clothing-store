import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatMoney } from "../utils/format";

export function CheckoutPage() {
  const { cart, cartSubtotal, user, placeOrder } = useStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const shipping = cartSubtotal >= 150 ? 0 : 12;
  const tax = cartSubtotal * 0.08;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const values = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    try {
      const order = await placeOrder(values);
      navigate(`/order-success/${order.id}`, { state: { order } });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Checkout could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  if (!cart.length) return <div className="empty-results checkout-empty"><ShoppingBag size={42} strokeWidth={1.2} /><h1>Your bag is empty</h1><p>Choose a piece before continuing to checkout.</p><Link className="button button--dark" to="/shop">Explore the collection</Link></div>;

  return (
    <section className="checkout-page">
      <div className="checkout-main">
        <Link className="back-link" to="/shop"><ArrowLeft size={15} /> Continue shopping</Link>
        <div className="checkout-heading"><p className="eyebrow">Secure checkout</p><h1>Complete your order</h1><p>One final step before your pieces enter the atelier.</p></div>
        {!user ? <div className="signin-callout"><div><strong>Already part of Élan?</strong><span>Sign in to continue and keep this order in your account.</span></div><Link className="button button--outline" to="/auth">Sign in</Link></div> : <div className="signed-in-note">Checking out as <strong>{user.email}</strong></div>}
        <form id="checkout-form" className="checkout-form" onSubmit={submit}>
          <fieldset><legend><span>01</span> Contact</legend><div className="form-grid"><label className="field--full">Email address<input name="email" type="email" required defaultValue={user?.email || ""} /></label></div></fieldset>
          <fieldset><legend><span>02</span> Shipping address</legend><div className="form-grid"><label className="field--full">Full name<input name="name" required defaultValue={user?.name || ""} /></label><label className="field--full">Address<input name="line1" required placeholder="Street and number" /></label><label className="field--full">Apartment, suite (optional)<input name="line2" /></label><label>City<input name="city" required /></label><label>Region / province<input name="region" required /></label><label>Postal code<input name="postalCode" required /></label><label>Country<input name="country" required defaultValue="Sri Lanka" /></label></div></fieldset>
          <fieldset><legend><span>03</span> Payment</legend><div className="payment-card"><div><LockKeyhole size={18} /><span><strong>Secure mock payment</strong>Portfolio sandbox — no real charge is made</span></div><div className="form-grid"><label className="field--full">Card number<input inputMode="numeric" defaultValue="4242 4242 4242 4242" readOnly /></label><label>Expiry<input defaultValue="12 / 30" readOnly /></label><label>Security code<input defaultValue="123" readOnly /></label></div></div></fieldset>
          {error ? <div className="form-error" role="alert">{error}</div> : null}
        </form>
      </div>
      <aside className="order-summary">
        <p className="eyebrow">Your order</p><h2>{cart.length} {cart.length === 1 ? "piece" : "pieces"}</h2>
        <div className="summary-items">{cart.map((item) => <article key={item.key}><img src={item.product.image} alt="" onError={(event) => { event.currentTarget.src = "/images/elan-campaign-hero.png"; }} /><div><h3>{item.product.name}</h3><p>{item.color} · {item.size} · Qty {item.quantity}</p></div><strong>{formatMoney(item.product.basePrice * item.quantity)}</strong></article>)}</div>
        <dl><div><dt>Subtotal</dt><dd>{formatMoney(cartSubtotal)}</dd></div><div><dt>Shipping</dt><dd>{shipping ? formatMoney(shipping) : "Complimentary"}</dd></div><div><dt>Estimated tax</dt><dd>{formatMoney(tax)}</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatMoney(cartSubtotal + shipping + tax)} <small>USD</small></dd></div></dl>
        <button className="button button--dark button--full" type="submit" form="checkout-form" disabled={busy || !user}>{busy ? "Confirming your order…" : user ? "Place secure order" : "Sign in to place order"}<LockKeyhole size={15} /></button>
        <p className="secure-note"><LockKeyhole size={13} /> Encrypted, secure checkout</p>
      </aside>
    </section>
  );
}
