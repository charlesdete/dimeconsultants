import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({ error, reset }) {
  const router = useRouter();
  return <div className="center-screen"><div className="message-panel"><div className="error-icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg></div><h1 className="message-title">Something went wrong</h1><p className="message-copy">An unexpected error occurred. Please try again.</p>{import.meta.env.DEV && error.message && <pre className="error-details">{error.message}</pre>}<div className="message-actions"><button onClick={() => { router.invalidate(); reset(); }} className="message-button">Try again</button><a href="/" className="message-button secondary">Go home</a></div></div></div>;
}

export const getRouter = () => createRouter({ routeTree, context: {}, scrollRestoration: true, defaultPreloadStaleTime: 0, defaultErrorComponent: DefaultErrorComponent });
