import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return <div className="center-screen"><div className="message-panel"><h1 className="message-title-large">404</h1><h2 className="message-title">Page not found</h2><p className="message-copy">The page you're looking for doesn't exist or has been moved.</p><div className="message-actions"><Link to="/" className="message-button">Go home</Link></div></div></div>;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dime Consultants — Driving Global Efficiency with AI" },
      { name: "description", content: "Dime Consultants Limited — AI & Business Process Reengineering consultancy based in Nairobi, serving clients across all industries." },
      { name: "author", content: "Dime Consultants Limited" },
      { property: "og:title", content: "Dime Consultants — Driving Global Efficiency with AI" },
      { property: "og:description", content: "Dime Consultants Limited — AI & Business Process Reengineering consultancy based in Nairobi, serving clients across all industries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Dime Consultants — Driving Global Efficiency with AI" },
      { name: "twitter:description", content: "Dime Consultants Limited — AI & Business Process Reengineering consultancy based in Nairobi, serving clients across all industries." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }) {
  return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() { return <Outlet />; }
