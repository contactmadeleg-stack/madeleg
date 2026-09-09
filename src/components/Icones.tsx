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

export function IconeBouclier({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M12 5.5l5.5 2v4c0 4-2.3 6.3-5.5 7.5-3.2-1.2-5.5-3.5-5.5-7.5v-4l5.5-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.3 12l1.8 1.8 3.6-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconeDossier({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M5 8.5A1.5 1.5 0 016.5 7h3l1.5 1.8h6.5A1.5 1.5 0 0119 10.3v6.2A1.5 1.5 0 0117.5 18h-11A1.5 1.5 0 015 16.5v-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconePoignee({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M4.5 12.5l3-2.8a1.6 1.6 0 012.3.1l1 1.1M19.5 12.5l-3-2.8a1.6 1.6 0 00-2.3.1l-3.6 3.8a1.2 1.2 0 001.7 1.7l2.3-2.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 14.5l1.8 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconeTelephone({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M8.5 6.5c.3 1.3.8 2.5 1.5 3.6l-1.4 1.6c.8 1.7 2.1 3 3.8 3.8l1.6-1.4c1.1.7 2.3 1.2 3.6 1.5v2.1c0 .6-.5 1-1 1-6 0-10.8-4.8-10.8-10.8 0-.5.4-1 1-1h1.7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconeBanque({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
      <path
        d="M5 10.5L12 6l7 4.5M6 10.5v6.5M9.5 10.5v6.5M14.5 10.5v6.5M18 10.5v6.5M4.5 18.5h15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeEclair({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M13 3L5 13.5h5.5L10.5 21l8-11.5H13L13 3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeChevronBas({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
