import { Outlet, ScrollRestoration } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const { toast } = useStore();
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
      <CartDrawer />
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">{toast?.message}</div>
      <ScrollRestoration />
    </>
  );
}
