import Link from "next/link";

export default function HowIThinkPage() {
  return (
    <>
      <section className="editorial-intro thinking-editorial-intro reveal">
        <p className="eyebrow">Hvordan jeg tenker</p>
        <h1>Fire ting jeg prøver å gjøre i alle prosjekter.</h1>
        <p className="lead editorial-lead-intro" style={{marginTop: "1.5rem"}}>
          Dette er enkelt forklart hvordan jeg liker å jobbe.
        </p>
      </section>

      <section className="section principle-section principle-section-editorial reveal">
        <article className="principle-hero principle-hero-editorial">
          <p className="eyebrow">01</p>
          <h2>Start med mennesker</h2>
          <p className="lead editorial-principle-lead">
            Jeg vil forstå behovet før vi hopper til løsning.
          </p>
          <p className="muted" style={{marginTop: "0.9rem"}}>
            Ofte holder det å stille et par gode spørsmål for å finne riktig retning.
          </p>
        </article>
      </section>

      <section className="section principle-section principle-section-editorial reveal">
        <article className="principle-hero principle-hero-editorial">
          <p className="eyebrow">02</p>
          <h2>Tenk i opplevelser</h2>
          <p className="lead editorial-principle-lead">
            Jeg ser på hele opplevelsen, ikke bare ett punkt.
          </p>

          <div className="principle-details">
            <p>
              Nettside, innhold, kundedialog og detaljer må henge sammen.
            </p>
          </div>
        </article>
      </section>

      <section className="section principle-section principle-section-editorial reveal">
        <article className="principle-hero principle-hero-editorial">
          <p className="eyebrow">03</p>
          <h2>Nysgjerrighet før antakelser</h2>
          <p className="lead editorial-principle-lead">
            Jeg prøver å ikke ta ting for gitt.
          </p>
          <p className="muted" style={{marginTop: "0.9rem"}}>
            Det er ofte der de beste forbedringene ligger.
          </p>
        </article>
      </section>

      <section className="section principle-section reveal">
        <article className="principle-hero">
          <p className="eyebrow">04</p>
          <h2>Lag noe folk faktisk vil bruke</h2>
          <p className="lead editorial-principle-lead">
            For meg er det et godt tegn når noe blir brukt igjen og igjen.
          </p>

          <div className="principle-details">
            <p>
              Da vet jeg at arbeidet treffer noe ekte i hverdagen.
            </p>
          </div>
        </article>
      </section>

      <section className="section thinking-principles reveal">
        <p className="eyebrow">I praksis</p>
        <h2>Slik ser det ofte ut i arbeid.</h2>
        <div className="grid cards-2" style={{marginTop: "1.75rem"}}>
          <article className="card">
            <h3>Forstå først, så løse</h3>
            <p className="muted">
              Jeg starter med å finne årsaken, ikke bare symptomet.
            </p>
          </article>
          <article className="card">
            <h3>Små grep som merkes</h3>
            <p className="muted">
              Jeg forbedrer litt og litt, og justerer underveis.
            </p>
          </article>
          <article className="card">
            <h3>Prøve, justere, forbedre</h3>
            <p className="muted">
              Jeg tester ideer i praksis og beholder det som virker.
            </p>
          </article>
          <article className="card">
            <h3>Få hverdagen til å flyte</h3>
            <p className="muted">
              Jeg liker når ting blir enklere å bruke for alle.
            </p>
          </article>
        </div>
      </section>

      <section className="section reveal closing-cta">
        <div className="closing-panel">
          <p className="eyebrow">Videre</p>
          <h2>Vil du se hvordan dette ser ut i prosjektene mine?</h2>
          <p className="lead">
            Der viser jeg hva jeg gjorde, hva som fungerte og hva jeg lærte.
          </p>
          <div className="button-row">
            <Link href="/projects" className="btn">
              Se prosjekter
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
