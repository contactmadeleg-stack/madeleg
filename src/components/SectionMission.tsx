import Reveal from "./Reveal";

export default function SectionMission() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24 text-center">
      <Reveal>
        <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-[var(--color-sauge-clair)] text-[var(--color-marque)] mb-5">
          Pourquoi Madeleg
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Comprendre ce que vous payez, <span className="text-[var(--color-ambre)]">pas juste le payer</span>
        </h2>
        <p className="text-lg text-[var(--color-texte-doux)] mt-6 leading-relaxed">
          Madeleg est né d&apos;un constat simple : trop d&apos;emprunteurs ne savent même pas pourquoi ils sont
          assurés, ni ce qui se passerait réellement en cas de coup dur.
        </p>
        <p className="text-lg text-[var(--color-texte-doux)] mt-4 leading-relaxed">
          Notre objectif, c&apos;est de simplifier l&apos;assurance emprunteur pour que tout le monde comprenne ce
          qu&apos;il paie. Même quand c&apos;est la banque qui l&apos;impose, ça ne veut pas dire qu&apos;il ne faut
          pas comprendre pourquoi.
        </p>
      </Reveal>
    </section>
  );
}
