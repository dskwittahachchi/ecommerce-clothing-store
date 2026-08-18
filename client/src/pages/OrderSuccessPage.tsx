import { ArrowRight, Check, PackageCheck } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import type { Order } from "../types";
import { formatMoney } from "../utils/format";

export function OrderSuccessPage() {
  const { id } = useParams();
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;
  return (
    <section className="success-page">
      <div className="success-mark"><Check size={34} /></div><p className="eyebrow">Order {id}</p><h1>It’s in motion.</h1><p>Thank you for choosing with intention. Your order is confirmed and our atelier is preparing each piece.</p>
      {order ? <div className="success-card"><div><PackageCheck size={23} /><span><strong>Order confirmed</strong>A confirmation has been prepared for {order.shippingAddress.email}.</span></div><strong>{formatMoney(order.totals.total)}</strong></div> : null}
      <div className="success-actions"><Link className="button button--dark" to="/account">Track your order <ArrowRight size={15} /></Link><Link className="button button--outline" to="/shop">Continue exploring</Link></div>
    </section>
  );
}
