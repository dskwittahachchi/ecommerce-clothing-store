import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export function WishlistPage() {
  const { products, wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return (
    <section className="subpage wishlist-page">
      <header className="subpage-heading"><p className="eyebrow">A personal composition</p><h1>Your edit</h1><p>Pieces saved for a second look, held quietly in one place.</p></header>
      {saved.length ? <div className="product-grid catalog-grid">{saved.map((product) => <ProductCard key={product.id} product={product} />)}</div> : (
        <div className="empty-results"><Heart size={40} strokeWidth={1.2} /><h2>Nothing saved yet</h2><p>Tap the heart on any piece to build an edit that feels like you.</p><Link className="button button--dark" to="/shop">Begin your edit</Link></div>
      )}
    </section>
  );
}
