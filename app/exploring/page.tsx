import Link from "next/link";

export default function ExploringPage() {
  return (
    <>
      <section className="editorial-intro exploring-editorial-intro reveal">
        <p className="eyebrow">Utforsker nå</p>
        <h1>Tanker jeg arbeider med.</h1>
        <p className="lead editorial-lead-intro" style={{ marginTop: "1.5rem" }}>
          Ting jeg er nysgjerrig på akkurat nå.
        </p>
      </section>

      <section className="section exploring-grid exploring-grid-editorial reveal">
        <article className="exploring-card exploring-card-editorial">
          <p className="eyebrow">AI og kreativitet</p>
          <h3>Når menneske og teknologi jobber sammen.</h3>
          <p>
            Jeg bruker AI for å utforske ideer raskere, ikke for å tenke mindre.
          </p>
        </article>

        <article className="exploring-card exploring-card-editorial">
          <p className="eyebrow">Tilhørighet</p>
          <h3>Hva får folk til å komme tilbake?</h3>
          <p>
            Ofte handler det om små ting som føles ekte og gjennomtenkte.
          </p>
        </article>

        <article className="exploring-card exploring-card-editorial">
          <p className="eyebrow">Menneskesentrert design</p>
          <h3>Godt design starter med behov.</h3>
          <p>
            Jeg liker løsninger som er enkle å forstå og enkle å bruke.
          </p>
        </article>

        <article className="exploring-card exploring-card-editorial">
          <p className="eyebrow">Produkters levetid</p>
          <h3>Hvorfor varer noen produkter lenger enn andre?</h3>
          <p>
            Jeg er opptatt av kvalitet, bruk og hva som faktisk fungerer over tid.
          </p>
        </article>
      </section>

      <section className="section reveal closing-cta exploring-closing-cta">
        <div className="closing-panel exploring-closing-panel">
          <p className="eyebrow">Videre</p>
          <h2>Vil du prate?</h2>
          <p className="lead">
            Jeg hører gjerne fra deg.
          </p>
          <div className="button-row">
            <Link href="/how-i-think" className="btn">
              Hvordan jeg tenker
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
