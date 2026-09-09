import Reveal from "./Reveal";

export default function SectionCTAFinale() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
      <Reveal>
        <div
          className="rounded-2xl px-6 py-12 sm:py-16 text-center"
          style={{ background: "var(--color-marque)" }}
        >
          <h2 className="font-titres text-3xl sm:text-4xl font-bold text-white max-w-xl mx-auto">
            Prêt à savoir combien vous pouvez économiser ?
          </h2>
          <p className="text-white/75 mt-3 max-w-md mx-auto">
            30 secondes, gratuit, sans engagement.
          </p>
          <a
            href="#simulateur"
            className="btn-madeleg inline-block mt-6 px-8 py-3 bg-[var(--color-ambre)] text-white hover:opacity-90"
          >
            Estimer mon économie
          </a>
        </div>
      </Reveal>
    </section>
  );
}
