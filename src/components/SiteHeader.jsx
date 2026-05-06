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
    return (<header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Dime Consultants" className="h-9 w-auto"/>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (<Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground" activeProps={{ className: "rounded-md px-3 py-2 text-sm text-cyan font-medium" }}>
              {n.label}
            </Link>))}
        </nav>
        <Link to="/contact" className="hidden rounded-full bg-cyan px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_oklch(0.78_0.16_210/0.5)] transition hover:opacity-90 lg:inline-flex">
          Book Discovery Call
        </Link>
        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (<div className="border-t border-border lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col p-2">
            {NAV.map((n) => (<Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                {n.label}
              </Link>))}
          </div>
        </div>)}
    </header>);
}
