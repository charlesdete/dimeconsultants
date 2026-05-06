import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/dime-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/programme", label: "AI Programme" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/insights", label: "Insights" },
  { to: "/scanner", label: "AI Scanner" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header glass">
      <div className="site-header-inner">
        <Link to="/" className="site-logo"><img src={logo} alt="Dime Consultants" className="site-logo-image" /></Link>
        <nav className="site-nav">
          {NAV.map((n) => <Link key={n.to} to={n.to} className="site-nav-link" activeProps={{ className: "site-nav-link site-nav-link-active" }}>{n.label}</Link>)}
        </nav>
        <Link to="/contact" className="site-header-cta">Book Discovery Call</Link>
        <button className="menu-button" onClick={() => setOpen((o) => !o)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            {NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="site-nav-link">{n.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
