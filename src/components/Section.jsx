export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" /> {children}
    </div>
  );
}
