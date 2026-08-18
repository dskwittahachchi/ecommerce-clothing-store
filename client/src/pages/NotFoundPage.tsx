import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow">404 · Between chapters</p><h1>This page has<br /><em>left the atelier.</em></h1><p>The collection is still close by.</p><Link className="button button--dark" to="/"><ArrowLeft size={15} /> Return home</Link></section>;
}
