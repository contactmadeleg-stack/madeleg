import Reveal from "./Reveal";

export default function SectionExplication() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <Reveal>
          <div>
            <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-4">
              Madeleg, concrètement
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Un expert qui négocie <span style={{ color: "var(--color-ambre)" }}>pour vous</span> et vous conseille,
              pas une simulation qui vous laisse seul
            </h2>
          </div>
        </Reveal>

        <Reveal delai={0.1}>
          <div className="space-y-4 text-[var(--color-texte-doux)] leading-relaxed">
            <p>
              La loi Lemoine vous permet de résilier votre assurance de prêt immobilier à tout moment, sans frais ni
              justification, pour la remplacer par un contrat aux garanties équivalentes, sans changer de banque ni
              de prêt.
            </p>
            <p>
              Madeleg est un courtier en assurance, certifié ORIAS. Une fois votre simulation validée, un conseiller
              humain constitue votre dossier de substitution, sélectionne l&apos;assureur adapté à votre profil, et
              suit l&apos;ensemble des échanges avec votre banque jusqu&apos;à validation, vous n&apos;avez rien à
              gérer.
            </p>
            <p className="font-semibold text-[var(--color-texte)]">Simulation gratuite, sans engagement.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
