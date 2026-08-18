import { AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, Box, CircleDollarSign, LayoutDashboard, LogOut, PackageCheck, Search, Settings, ShoppingBag, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { LoadingState } from "../components/LoadingState";
import { useStore } from "../context/StoreContext";
import type { AdminDashboard } from "../types";
import { formatDate, formatMoney } from "../utils/format";

export function AdminPage() {
  const { user, token, logout, notify } = useStore();
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    let cancelled = false;
    api.adminDashboard(token)
      .then((response) => { if (!cancelled) setDashboard(response.data); })
      .catch((reason: Error) => { if (!cancelled) setError(reason.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, user?.role]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await api.updateOrderStatus(token, id, status);
      setDashboard((current) => current ? { ...current, orders: current.orders.map((order) => order.id === id ? response.data : order) } : current);
      notify(`Order ${id} moved to ${status}.`);
    } catch (reason) {
      notify(reason instanceof Error ? reason.message : "Status update failed.");
    }
  };

  if (!user || user.role !== "admin") return <div className="empty-results admin-locked"><AlertTriangle size={42} strokeWidth={1.2} /><h1>Admin access only</h1><p>Use the provided admin demo credentials to enter the operations studio.</p><Link className="button button--dark" to="/auth">Open admin sign in</Link></div>;
  if (loading) return <LoadingState label="Opening the operations studio" />;

  const maxRevenue = Math.max(...(dashboard?.monthlyRevenue.map((item) => item.value) || [1]));
  return (
    <section className="admin-shell">
      <aside className="admin-nav"><Link className="admin-brand" to="/"><span>ÉLAN</span><small>OPERATIONS</small></Link><nav><a className="is-active" href="#overview"><LayoutDashboard size={18} /> Overview</a><a href="#orders"><ShoppingBag size={18} /> Orders <span>{dashboard?.orders.length || 0}</span></a><a href="#inventory"><Box size={18} /> Products</a><a href="#customers"><Users size={18} /> Customers</a><a href="#analytics"><BarChart3 size={18} /> Analytics</a></nav><div className="admin-nav__bottom"><a href="#settings"><Settings size={18} /> Settings</a><button type="button" onClick={logout}><LogOut size={18} /> Sign out</button><div><span>{user.name.slice(0, 1)}</span><p><strong>{user.name}</strong><small>Administrator</small></p></div></div></aside>
      <main className="admin-main" id="overview">
        <header className="admin-header"><div><p>Tuesday, 18 August 2026</p><h1>Good morning, {user.name.split(" ")[0]}.</h1></div><div className="admin-search"><Search size={17} /><input placeholder="Search orders, products…" /></div></header>
        {error || !dashboard ? <div className="form-error">{error || "Dashboard data is unavailable."}</div> : <>
          <section className="metric-grid"><article><div><span>Net revenue</span><CircleDollarSign size={19} /></div><strong>{formatMoney(dashboard.metrics.revenue)}</strong><p className="positive"><ArrowUpRight size={14} /> 18.4% <span>vs last month</span></p></article><article><div><span>Total orders</span><ShoppingBag size={19} /></div><strong>{dashboard.metrics.orders}</strong><p className="positive"><ArrowUpRight size={14} /> 12.8% <span>vs last month</span></p></article><article><div><span>Units moved</span><PackageCheck size={19} /></div><strong>{dashboard.metrics.units}</strong><p className="positive"><ArrowUpRight size={14} /> 9.2% <span>vs last month</span></p></article><article><div><span>Conversion</span><BarChart3 size={19} /></div><strong>{dashboard.metrics.conversion}%</strong><p className="negative"><ArrowDownRight size={14} /> 0.3% <span>vs last month</span></p></article></section>
          <section className="admin-grid"><article className="admin-chart" id="analytics"><header><div><p className="eyebrow">Revenue movement</p><h2>Sales overview</h2></div><select aria-label="Chart date range"><option>Last 6 months</option></select></header><div className="chart-area"><div className="chart-scale"><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div><div className="bars">{dashboard.monthlyRevenue.map((item) => <div key={item.month}><div className="bar" style={{ height: `${(item.value / maxRevenue) * 100}%` }}><span>{formatMoney(item.value)}</span></div><small>{item.month}</small></div>)}</div></div></article><article className="stock-panel" id="inventory"><header><div><p className="eyebrow">Attention</p><h2>Low stock</h2></div><span>{dashboard.lowStock.length}</span></header><div>{dashboard.lowStock.slice(0, 5).map((item) => <article key={item.sku}><div><strong>{item.product}</strong><span>{item.color} · {item.size}</span></div><p><strong>{item.stock}</strong> left</p></article>)}</div><a className="underlined-link" href="#inventory">View inventory <ArrowRightIcon /></a></article></section>
          <section className="admin-orders" id="orders"><header><div><p className="eyebrow">Live workflow</p><h2>Recent orders</h2></div><button type="button" className="button button--outline">Export report</button></header><div className="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead><tbody>{dashboard.orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.shippingAddress.name || "Élan client"}</td><td>{formatDate(order.createdAt)}</td><td>{formatMoney(order.totals.total)}</td><td><span className={`status-badge status-${order.paymentStatus}`}>{order.paymentStatus}</span></td><td><select value={order.orderStatus} onChange={(event) => updateStatus(order.id, event.target.value)} aria-label={`Status for ${order.id}`}><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option></select></td></tr>)}</tbody></table></div></section>
        </>}
      </main>
    </section>
  );
}

function ArrowRightIcon() {
  return <ArrowUpRight size={14} />;
}
