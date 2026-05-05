import { Link } from "@tanstack/react-router";
import { Linkedin, Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/dime-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[var(--deep)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <img src={logo} alt="Dime Consultants" className="h-10 w-auto" />
          <p className="text-sm text-muted-foreground">Driving global efficiency with AI.</p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="hover:text-cyan"><Linkedin size={18}/></a>
            <a href="https://www.facebook.com/" aria-label="Facebook" className="hover:text-cyan"><Facebook size={18}/></a>
            <a href="https://www.instagram.com/" aria-label="Instagram" className="hover:text-cyan"><Instagram size={18}/></a>
            <a href="https://x.com/" aria-label="X" className="hover:text-cyan"><Twitter size={18}/></a>
            <a href="https://www.youtube.com/" aria-label="YouTube" className="hover:text-cyan"><Youtube size={18}/></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-cyan">About</Link></li>
            <li><Link to="/services" className="hover:text-cyan">Services</Link></li>
            <li><Link to="/use-cases" className="hover:text-cyan">Use Cases</Link></li>
            <li><Link to="/insights" className="hover:text-cyan">Insights</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Programme</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/programme" className="hover:text-cyan">AI-Ready Workforce</Link></li>
            <li><Link to="/scanner" className="hover:text-cyan">AI Readiness Scanner</Link></li>
            <li><Link to="/success-stories" className="hover:text-cyan">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-cyan"/>Two Rivers Mall, Nairobi, Kenya</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-cyan"/>hello@dimeconsultants.co.ke</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-cyan"/>+254 700 000 000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dime Consultants Limited. All rights reserved.
      </div>
    </footer>
  );
}
