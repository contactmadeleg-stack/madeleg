import Simulateur from "@/components/Simulateur";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-texte)] tracking-tight">
          Vous avez déjà un prêt immobilier ? Vous pouvez changer d&apos;assurance emprunteur, gratuitement.
        </h1>
        <p className="text-lg text-[var(--color-texte-doux)]">
          La loi Lemoine vous permet de résilier votre assurance de prêt à tout moment, sans quitter votre banque.
          Estimez votre économie en 30 secondes.
        </p>
      </div>

      <Simulateur />
    </div>
  );
}
