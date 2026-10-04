export default function Eyebrow({ index, children, dot = false, className = "" }) {
  return (
    <p className={`label flex items-center gap-2.5 ${className}`}>
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
      {index && <span className="opacity-60">{index} /</span>}
      {children}
    </p>
  );
}
