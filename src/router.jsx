import { createContext, useContext, useState, useEffect, useCallback } from "react";

const RouterContext = createContext(null);

export function Router({ children }) {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    window.history.pushState(null, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useNavigate() {
  return useContext(RouterContext).navigate;
}

export function Link({ to, className, children, onClick, ...props }) {
  const { navigate } = useContext(RouterContext);
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.();
    navigate(to);
  };
  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function ActiveLink({ to, className, activeClassName, children, onClick, ...props }) {
  const { path, navigate } = useContext(RouterContext);
  const isActive = path === to;
  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.();
    navigate(to);
  };
  return (
    <a
      href={to}
      className={isActive ? `${className} ${activeClassName}` : className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
