// Icônes de navigation de la console admin — traits simples sans fond, pour
// une sidebar compacte (différent du style "badge rond" d'Icones.tsx,
// pensé pour illustrer des points du site public).
type Props = { className?: string };

export function IconeTableauDeBord({ className = "w-5 h-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="10" width="7.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconeClients({ className = "w-5 h-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 19c.7-3 2.8-4.8 5.5-4.8s4.8 1.8 5.5 4.8M15.5 8.2a2.6 2.6 0 110-5.2M15.8 14.3c2.2.3 3.7 1.9 4.2 4.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconeReglages({ className = "w-5 h-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7.5" cy="16.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function IconeBanqueSidebar({ className = "w-5 h-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 10L12 5l8 5M5.5 10v7.5M9.5 10v7.5M14.5 10v7.5M18.5 10v7.5M3.5 18.5h17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeDeconnexion({ className = "w-5 h-5" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 4.5H6.5A1.5 1.5 0 005 6v12a1.5 1.5 0 001.5 1.5H9M15 15.5l4-3.5-4-3.5M19 12H9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeRecherche({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconePlus({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconePoints({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

export function IconeReplier({ className = "w-4 h-4" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M14 6l-6 6 6 6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
