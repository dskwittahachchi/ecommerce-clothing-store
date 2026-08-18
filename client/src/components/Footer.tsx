import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <p className="eyebrow">Private notes from the atelier</p>
        <h2>Wear the story first.</h2>
        <p>New forms, material notes and limited releases — sent with intention.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="footer-email">Email address</label>
          <input id="footer-email" type="email" placeholder="Email address" required />
          <button type="submit" aria-label="Join newsletter"><ArrowUpRight size={19} /></button>
        </form>
      </div>
      <div className="footer-links">
        <div><h3>Explore</h3><Link to="/shop">The collection</Link><Link to="/shop?sort=featured">New arrivals</Link><Link to="/wishlist">Your edit</Link></div>
        <div><h3>Service</h3><Link to="/account">Order tracking</Link><a href="mailto:care@elan.demo">Contact</a><a href="#shipping">Shipping & returns</a></div>
        <div><h3>Atelier</h3><a href="/#story">Our approach</a><a href="#materials">Materials</a><a href="#journal">Journal</a></div>
      </div>
      <div className="footer-bottom">
        <div className="footer-mark"><span>ÉLAN</span><small>ATELIER</small></div>
        <div><span>© 2026 Élan Atelier</span><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#instagram" aria-label="Instagram"><Instagram size={17} /></a></div>
      </div>
    </footer>
  );
}
