import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const saved = wishlist.includes(product.id);
  const defaultVariant = product.variants.find((variant) => variant.stock > 0);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            onError={(event) => { event.currentTarget.src = "/images/elan-campaign-hero.png"; }}
          />
        </Link>
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
        <button
          type="button"
          className={`icon-button product-card__heart ${saved ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        {defaultVariant ? (
          <button type="button" className="quick-add" onClick={() => addToCart(product, defaultVariant)}>
            <Plus size={16} /> Quick add
          </button>
        ) : null}
      </div>
      <div className="product-card__info">
        <div>
          <p className="eyebrow">{product.collection}</p>
          <Link to={`/product/${product.slug}`} className="product-card__name">{product.name}</Link>
        </div>
        <p className="product-card__price">
          {formatMoney(product.basePrice)}
          {product.originalPrice ? <span>{formatMoney(product.originalPrice)}</span> : null}
        </p>
      </div>
      <div className="color-dots" aria-label={`${product.colors.length} available colors`}>
        {product.colors.map((color) => <span key={color.name} title={color.name} style={{ background: color.hex }} />)}
      </div>
    </article>
  );
}
