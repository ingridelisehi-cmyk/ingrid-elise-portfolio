import PortraitImage from "./portrait-image";

export default function AboutPage() {
  return (
    <section>
      <p className="eyebrow">Om</p>
      <h1>Litt mer om meg</h1>

      <div className="about-grid section">
        <PortraitImage />

        <div className="grid" style={{ gap: "1rem" }}>
          <p className="lead">
            Jeg heter Ingrid Elise.
          </p>
          <p>
            Jeg har vært med på å bygge Ages by HS fra bunnen av. I en liten
            bedrift betyr det å ha mange hatter, og jeg har jobbet med alt fra
            innholdsproduksjon og kampanjer til produktutvikling, sourcing,
            kundedialog og logistikk. Underveis har vi vært opptatt av å lære
            av andre, teste nye ideer og utvikle merkevaren steg for steg.
          </p>
          <p>
            Jeg liker best arbeid der jeg kan kombinere kreativitet og struktur,
            og lære underveis.
          </p>
        </div>
      </div>
    </section>
  );
}
