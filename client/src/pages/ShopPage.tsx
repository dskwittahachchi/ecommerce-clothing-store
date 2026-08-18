import { SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoadingState } from "../components/LoadingState";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

const categories = ["All", "Outerwear", "Knitwear", "Bottoms", "Dresses"];

export function ShopPage() {
  const { products, loading, error } = useStore();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState(params.get("search") || "");
  const deferredSearch = useDeferredValue(search.toLowerCase());
  const category = params.get("category") || "All";
  const sort = params.get("sort") || "featured";

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = !deferredSearch || `${product.name} ${product.collection} ${product.description}`.toLowerCase().includes(deferredSearch);
      return matchesCategory && matchesSearch;
    });
    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.basePrice - b.basePrice;
      if (sort === "price-desc") return b.basePrice - a.basePrice;
      if (sort === "rating") return b.rating - a.rating;
      return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
    });
  }, [products, category, deferredSearch, sort]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "All" || value === "featured") next.delete(key); else next.set(key, value);
    setParams(next);
  };

  return (
    <section className="shop-page">
      <header className="shop-hero">
        <p className="eyebrow">The complete wardrobe</p>
        <h1>Shop the collection</h1>
        <p>Considered pieces with a clear point of view — made for repetition, movement and a longer life.</p>
      </header>

      <div className="catalog-toolbar">
        <div className="category-tabs" role="tablist" aria-label="Product categories">
          {categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => setParam("category", item)}>{item}</button>)}
        </div>
        <button type="button" className="filter-toggle" onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal size={16} /> Filters</button>
        <select value={sort} onChange={(event) => setParam("sort", event.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className={`catalog-search ${filtersOpen ? "is-open" : ""}`}>
        <label htmlFor="catalog-search">Search the collection</label>
        <div><input id="catalog-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try linen, Terra, knitwear…" />{search ? <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={17} /></button> : null}</div>
      </div>

      <div className="catalog-meta"><span>{filtered.length} pieces</span>{category !== "All" || search ? <button type="button" className="text-button" onClick={() => { setSearch(""); setParams({}); }}>Clear all</button> : null}</div>

      {loading ? <LoadingState /> : error ? <div className="error-panel"><h2>We couldn’t load the edit.</h2><p>{error}</p></div> : filtered.length === 0 ? (
        <div className="empty-results"><h2>No pieces found</h2><p>Try a different search or return to the full collection.</p><button type="button" className="button button--dark" onClick={() => { setSearch(""); setParams({}); }}>View everything</button></div>
      ) : <div className="product-grid catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
    </section>
  );
}
