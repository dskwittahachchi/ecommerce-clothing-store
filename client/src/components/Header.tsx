import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const navItems = [
  { label: "New arrivals", to: "/shop?sort=featured" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/shop?collection=Terra" },
  { label: "Our story", to: "/#story" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist, user, setCartOpen } = useStore();

  return (
    <>
      <div className="announcement">
        <p>Complimentary shipping over $150</p>
        <span>Made in considered quantities</span>
      </div>
      <header className="site-header">
        <button type="button" className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => <NavLink key={item.label} to={item.to}>{item.label}</NavLink>)}
        </nav>
        <Link className="wordmark" to="/" aria-label="Élan Atelier home">
          <span>ÉLAN</span>
          <small>ATELIER</small>
        </Link>
        <nav className="utility-nav" aria-label="Utility navigation">
          <Link to="/shop" aria-label="Search"><Search size={20} /></Link>
          <Link to="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`} className="count-link"><Heart size={20} /><span>{wishlist.length}</span></Link>
          <Link to={user ? "/account" : "/auth"} aria-label="Account"><UserRound size={20} /></Link>
          {user?.role === "admin" ? <Link className="admin-pill" to="/admin">Admin</Link> : null}
          <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open bag with ${cartCount} items`} className="count-link"><ShoppingBag size={20} /><span>{cartCount}</span></button>
        </nav>
      </header>
      <aside className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" className="icon-button mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22} /></button>
        <p className="eyebrow">Navigate</p>
        {navItems.map((item) => <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        <div className="mobile-menu__footer">
          <Link to={user ? "/account" : "/auth"} onClick={() => setMenuOpen(false)}>{user ? `Hello, ${user.name.split(" ")[0]}` : "Sign in"}</Link>
          <span>Colombo · USD</span>
        </div>
      </aside>
    </>
  );
}
