import Reveal from "./Reveal";

export default function SectionCTAFinale() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-12 sm:py-16 text-center"
          style={{ background: "var(--color-marque)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg className="absolute -top-16 -left-20 w-80 h-80 opacity-[0.12] blur-2xl" viewBox="0 0 400 400">
              <path
                fill="var(--color-ambre-clair)"
                d="M280,90Q330,140,320,200Q310,260,260,300Q210,340,150,310Q90,280,80,210Q70,140,120,100Q170,60,220,60Q270,60,280,90Z"
              />
            </svg>
            <svg className="absolute -bottom-20 -right-16 w-96 h-96 opacity-[0.1] blur-2xl" viewBox="0 0 400 400">
              <path
                fill="var(--color-sauge-clair)"
                d="M320,120Q360,180,330,240Q300,300,230,320Q160,340,110,290Q60,240,80,170Q100,100,170,70Q240,40,280,60Q320,80,320,120Z"
              />
            </svg>
          </div>

          <div className="relative">
            <h2 className="font-titres text-3xl sm:text-4xl font-bold text-white max-w-xl mx-auto">
              Prêt à savoir combien vous pouvez économiser ?
            </h2>
            <p className="text-white/75 mt-3 max-w-md mx-auto">30 secondes, gratuit, sans engagement.</p>
            <a
              href="#simulateur"
              className="btn-madeleg inline-block mt-6 px-8 py-3 bg-[var(--color-ambre)] text-white hover:opacity-90 hover:scale-[1.03] transition-transform"
            >
              Estimer mon économie
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
