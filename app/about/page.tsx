import PortraitImage from "./portrait-image";

export default function AboutPage() {
  return (
    <section>
      <p className="eyebrow">Om</p>
      <h1 className="about-title">
        Litt mer <span className="about-title-accent">om meg</span>
      </h1>

      <div className="about-grid section">
        <PortraitImage />

        <div className="grid about-copy" style={{ gap: "1rem" }}>
          <p className="lead">
            Jeg liker å jobbe der kreativitet og struktur møtes, og trives best
            når jeg får være tett på både mennesker, ideer og gjennomføring.
          </p>
          <p>
            Jeg har alltid vært opptatt av hvordan ting ser ut, føles og
            kommuniseres, men også av hva som faktisk fungerer. Derfor liker jeg
            å bevege meg mellom det kreative og det praktiske, fra idé og
            visuell retning til planlegging, koordinering og ferdig resultat.
          </p>
          <p>
            Jeg lærer fort, liker ansvar og får mye energi av å jobbe sammen med
            andre som vil skape noe bra.
          </p>
        </div>
      </div>
    </section>
  );
}
