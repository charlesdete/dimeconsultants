import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

function NotFoundComponent() {
  return <div className="center-screen"><div className="message-panel"><h1 className="message-title-large">404</h1><h2 className="message-title">Page not found</h2><p className="message-copy">The page you're looking for doesn't exist or has been moved.</p><div className="message-actions"><Link to="/" className="message-button">Go home</Link></div></div></div>;
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() { 
  return <Outlet />; 
}
