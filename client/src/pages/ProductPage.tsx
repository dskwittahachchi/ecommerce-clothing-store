import { Heart, Minus, Plus, Ruler, ShieldCheck, Star, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingState } from "../components/LoadingState";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { formatMoney } from "../utils/format";

export function ProductPage() {
  const { slug } = useParams();
  const { products, loading, wishlist, toggleWishlist, addToCart } = useStore();
  const product = products.find((candidate) => candidate.slug === slug);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = useMemo(() => product ? [...new Set(product.variants.map((variant) => variant.size))] : [], [product]);
  useEffect(() => {
    if (product) {
      setSize(product.variants.find((variant) => variant.stock > 0)?.size || "");
      setColor(product.colors[0]?.name || "");
    }
  }, [product]);

  if (loading) return <LoadingState label="Preparing the piece" />;
  if (!product) return <div className="not-found"><p className="eyebrow">404 · Lost form</p><h1>This piece has moved on.</h1><Link className="button button--dark" to="/shop">Return to the collection</Link></div>;

  const variant = product.variants.find((candidate) => candidate.size === size && candidate.color === color)
    || product.variants.find((candidate) => candidate.size === size)
    || product.variants[0];
  const saved = wishlist.includes(product.id);
  const related = products.filter((candidate) => candidate.id !== product.id && candidate.category === product.category).slice(0, 3);

  return (
    <>
      <section className="product-page">
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
        <div className="product-gallery">
          <div className="product-gallery__primary"><img src={product.image} alt={product.imageAlt} onError={(event) => { event.currentTarget.src = "/images/elan-campaign-hero.png"; }} /><span>01 / 02</span></div>
          <div className="product-gallery__detail"><img src="/images/elan-campaign-hero.png" alt="Élan Atelier campaign styling detail" /></div>
        </div>
        <div className="product-details">
          <p className="eyebrow">{product.collection} · {product.category}</p>
          <div className="product-title-row"><h1>{product.name}</h1><button type="button" className={`icon-button ${saved ? "is-active" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Save to wishlist"><Heart size={20} fill={saved ? "currentColor" : "none"} /></button></div>
          <div className="product-price-row"><strong>{formatMoney(product.basePrice)}</strong>{product.originalPrice ? <del>{formatMoney(product.originalPrice)}</del> : null}<span><Star size={13} fill="currentColor" /> {product.rating} ({product.reviewCount})</span></div>
          <p className="product-description">{product.description}</p>

          <fieldset className="option-group"><legend>Color <span>{color}</span></legend><div className="swatches">{product.colors.map((item) => <button type="button" key={item.name} className={color === item.name ? "is-active" : ""} style={{ "--swatch": item.hex } as React.CSSProperties} onClick={() => setColor(item.name)} aria-label={item.name} title={item.name} />)}</div></fieldset>
          <fieldset className="option-group"><legend>Size <button type="button" className="text-button"><Ruler size={14} /> Size guide</button></legend><div className="size-options">{sizes.map((item) => { const stock = product.variants.find((candidate) => candidate.size === item)?.stock || 0; return <button type="button" key={item} className={size === item ? "is-active" : ""} disabled={stock === 0} onClick={() => setSize(item)}>{item}</button>; })}</div></fieldset>

          {variant.stock <= 5 ? <p className="stock-note">Only {variant.stock} left in this size</p> : <p className="stock-note stock-note--available">In stock · ready to send</p>}
          <div className="add-row">
            <div className="quantity-control"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={14} /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(variant.stock, value + 1))} aria-label="Increase quantity"><Plus size={14} /></button></div>
            <button type="button" className="button button--dark" onClick={() => addToCart(product, variant, quantity)}>Add to bag · {formatMoney(product.basePrice * quantity)}</button>
          </div>
          <div className="service-notes"><div><Truck size={19} /><span><strong>Complimentary shipping</strong>On orders over $150</span></div><div><ShieldCheck size={19} /><span><strong>30-day returns</strong>Simple, considered service</span></div></div>
          <details open><summary>Composition & care</summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details>
          <details><summary>Fit notes</summary><p>Designed with an easy, true-to-size silhouette. Choose your usual size or size down for a closer fit.</p></details>
        </div>
      </section>
      {related.length ? <section className="section related-section"><div className="section-heading"><div><p className="eyebrow">Continue the composition</p><h2>Wear it with</h2></div></div><div className="product-grid product-grid--three">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section> : null}
    </>
  );
}
