// Petites icônes SVG maison — pas de librairie externe, cohérentes avec la charte.
type Props = { className?: string };

export function IconeEuro({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M15.5 8.5c-.8-.9-1.9-1.5-3.2-1.5-2.4 0-4.4 2-4.4 5s2 5 4.4 5c1.3 0 2.4-.6 3.2-1.5M6.5 10.5h6M6.5 13.5h5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconeCalendrier({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <rect x="6.5" y="7" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 10h11M9 5.5v3M15 5.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconePersonne({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="9.5" r="2.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 18c1-2.5 3-3.8 5.5-3.8s4.5 1.3 5.5 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconeCoche({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconeChrono({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="13" r="8" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9v4l2.5 2M10 3h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
