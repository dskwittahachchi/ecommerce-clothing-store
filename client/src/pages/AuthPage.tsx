import { ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const { login, register } = useStore();
  const navigate = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const user = mode === "login"
        ? await login(fields.email, fields.password)
        : await register(fields.name, fields.email, fields.password);
      navigate(user.role === "admin" ? "/admin" : "/account");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We couldn’t complete that request.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-visual"><img src="/images/elan-campaign-hero.png" alt="Élan Atelier Terra campaign" /><div><p className="eyebrow">The Élan circle</p><blockquote>“A closer look at the pieces, people and processes behind each chapter.”</blockquote></div></div>
      <div className="auth-panel">
        <div className="auth-panel__inner">
          <p className="eyebrow">Private client access</p>
          <h1>{mode === "login" ? "Welcome back." : "Begin your story."}</h1>
          <p>{mode === "login" ? "Sign in to view your orders, saved pieces and private atelier notes." : "Create an account for a more considered shopping experience."}</p>
          <div className="auth-tabs"><button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>Sign in</button><button type="button" className={mode === "register" ? "is-active" : ""} onClick={() => setMode("register")}>Create account</button></div>
          <form className="stack-form" onSubmit={submit}>
            {mode === "register" ? <label>Full name<input name="name" autoComplete="name" minLength={2} required placeholder="Your name" value={fields.name} onChange={(event) => setFields((current) => ({ ...current, name: event.target.value }))} /></label> : null}
            <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" value={fields.email} onChange={(event) => setFields((current) => ({ ...current, email: event.target.value }))} /></label>
            <label>Password<span className="password-field"><input name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required placeholder="At least 8 characters" value={fields.password} onChange={(event) => setFields((current) => ({ ...current, password: event.target.value }))} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            {error ? <div className="form-error" role="alert">{error}</div> : null}
            <button className="button button--dark button--full" disabled={busy}>{busy ? "One moment…" : mode === "login" ? "Enter your account" : "Create your account"}<ArrowRight size={16} /></button>
          </form>
          <div className="demo-access"><span>Portfolio demo access</span><button type="button" onClick={() => { setMode("login"); setFields({ name: "", email: "shopper@elan.demo", password: "ShopElan2026!" }); }}>Use shopper</button><button type="button" onClick={() => { setMode("login"); setFields({ name: "", email: "admin@elan.demo", password: "AdminElan2026!" }); }}>Use admin</button></div>
          <div className="auth-benefits"><span><Check size={14} /> Order tracking</span><span><Check size={14} /> Saved edit</span><span><Check size={14} /> Faster checkout</span></div>
        </div>
      </div>
    </section>
  );
}
