import { ArrowRight, LogOut, MapPin, Package, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { LoadingState } from "../components/LoadingState";
import { useStore } from "../context/StoreContext";
import type { Order } from "../types";
import { formatDate, formatMoney } from "../utils/format";

export function AccountPage() {
  const { user, token, logout } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api.myOrders(token)
      .then((response) => { if (!cancelled) setOrders(response.data); })
      .catch((reason: Error) => { if (!cancelled) setError(reason.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token]);

  if (!user) return <div className="empty-results account-guest"><UserRound size={42} strokeWidth={1.2} /><h1>Your account awaits</h1><p>Sign in to view orders, track deliveries and return to your saved edit.</p><Link className="button button--dark" to="/auth">Sign in</Link></div>;

  return (
    <section className="account-page">
      <aside className="account-sidebar"><p className="eyebrow">Private client</p><div className="account-avatar">{user.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div><h2>{user.name}</h2><p>{user.email}</p><nav><a className="is-active" href="#orders"><Package size={17} /> Orders</a><Link to="/wishlist">♡ Your edit</Link><a href="#profile"><UserRound size={17} /> Profile</a><a href="#addresses"><MapPin size={17} /> Addresses</a></nav>{user.role === "admin" ? <Link className="button button--outline button--full" to="/admin">Open admin studio</Link> : null}<button type="button" className="text-button logout-button" onClick={logout}><LogOut size={15} /> Sign out</button></aside>
      <div className="account-content" id="orders"><header><p className="eyebrow">Your archive</p><h1>Orders</h1><p>Follow every piece from atelier to arrival.</p></header>
        {loading ? <LoadingState label="Gathering your orders" /> : error ? <div className="form-error">{error}</div> : orders.length === 0 ? <div className="empty-results"><Package size={38} /><h2>No orders yet</h2><Link className="button button--dark" to="/shop">Explore the collection</Link></div> : (
          <div className="order-list">{orders.map((order) => <article className="order-card" key={order.id}><header><div><span>Order {order.id}</span><small>Placed {formatDate(order.createdAt)}</small></div><span className={`status-badge status-${order.orderStatus}`}>{order.orderStatus}</span></header><div className="order-card__body"><div className="order-thumbnails">{order.items.slice(0, 3).map((item) => <div key={`${order.id}-${item.productId}`}><span>{item.quantity}</span><Package size={25} /></div>)}</div><div className="order-copy"><h3>{order.items.map((item) => item.name).join(", ")}</h3><p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} pieces · {formatMoney(order.totals.total)}</p></div><button type="button" className="underlined-link">View details <ArrowRight size={14} /></button></div><div className="order-timeline">{order.timeline.map((step) => <div className={step.complete ? "is-complete" : ""} key={step.label}><i /><span><strong>{step.label}</strong><small>{step.date}</small></span></div>)}</div></article>)}</div>
        )}
      </div>
    </section>
  );
}
