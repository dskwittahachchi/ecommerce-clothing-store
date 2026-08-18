import { ArrowDown, ArrowRight, Feather, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { LoadingState } from "../components/LoadingState";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

const categoryCards = [
  { label: "For her", detail: "Fluid form", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" },
  { label: "For him", detail: "Quiet structure", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=85" },
  { label: "Objects", detail: "Finishing gestures", image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1000&q=85" }
];

export function HomePage() {
  const { products, loading, error } = useStore();

  return (
    <>
      <section className="hero">
        <img src="/images/elan-campaign-hero.png" alt="Élan Atelier Terra campaign with two models in sculptural neutral tailoring" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="eyebrow">Chapter 01 · Terra</p>
          <h1>Form, softened<br />by <em>light.</em></h1>
          <p>A study in quiet structure, natural movement and the colors that remain after sunset.</p>
          <div className="hero__actions">
            <Link className="button button--dark" to="/shop">Explore the collection <ArrowRight size={16} /></Link>
            <a className="button button--ghost" href="#new">View the lookbook</a>
          </div>
        </div>
        <a className="hero__scroll" href="#new"><span>Scroll to discover</span><ArrowDown size={15} /></a>
        <div className="hero__counter"><span>01</span><i /><small>04</small></div>
      </section>

      <section className="trust-strip" aria-label="Store benefits">
        <div><Feather size={20} /><span><strong>Natural materials</strong>Traceable fibers, selected with care</span></div>
        <div><Sparkles size={20} /><span><strong>Made in small runs</strong>Less excess, more intention</span></div>
        <div><RotateCcw size={20} /><span><strong>Considered service</strong>Complimentary returns within 30 days</span></div>
      </section>

      <section className="section collection-section" id="new">
        <div className="section-heading">
          <div><p className="eyebrow">New composition</p><h2>The Terra edit</h2></div>
          <p>Grounded tones and easy silhouettes, designed to find rhythm with the way you already live.</p>
          <Link className="underlined-link" to="/shop">Shop all pieces <ArrowRight size={15} /></Link>
        </div>
        {loading ? <LoadingState /> : error ? <div className="error-panel"><h3>The collection is resting.</h3><p>{error}</p></div> : (
          <div className="product-grid product-grid--featured">
            {products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} priority={index < 2} />)}
          </div>
        )}
      </section>

      <section className="editorial-banner" id="story">
        <div className="editorial-banner__image"><img src="/images/elan-campaign-hero.png" alt="Warm studio shadows from the Terra campaign" /></div>
        <div className="editorial-banner__copy">
          <p className="eyebrow">The Élan approach</p>
          <h2>Clothing with<br /><em>room to live.</em></h2>
          <p>We begin with the body in motion. Every seam, weight and proportion is considered to offer ease without losing its point of view.</p>
          <Link className="underlined-link" to="/#story">Discover our process <ArrowRight size={15} /></Link>
          <span className="editorial-number">E / 01</span>
        </div>
      </section>

      <section className="section category-section">
        <div className="center-heading"><p className="eyebrow">Find your form</p><h2>Curated for your rhythm</h2></div>
        <div className="category-grid">
          {categoryCards.map((category) => (
            <Link to="/shop" key={category.label} className="category-card">
              <img src={category.image} alt="" onError={(event) => { event.currentTarget.src = "/images/elan-campaign-hero.png"; }} />
              <div><p>{category.detail}</p><h3>{category.label}</h3><span>Explore <ArrowRight size={14} /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <p className="eyebrow">Élan notes · No. 01</p>
        <blockquote>“The most enduring pieces are the ones that let <em>you</em> remain the focus.”</blockquote>
        <span>— Our design studio, Colombo</span>
      </section>
    </>
  );
}
