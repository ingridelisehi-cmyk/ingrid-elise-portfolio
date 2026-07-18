import Link from "next/link";

export default function AIInPracticePage() {
  return (
    <section>
      <p className="eyebrow">AI i praksis</p>
      <h1>AI i praksis</h1>

      <div className="thinking-intro section" style={{marginTop: "1.5rem"}}>
        <p className="lead">
          Jeg bruker AI som et praktisk verktøy i arbeidshverdagen.
        </p>
        <div className="thinking-question">
          <p>For å tenke klarere og jobbe raskere.</p>
        </div>
        <p className="muted">
          Målet er ikke å automatisere alt, men å bruke tiden bedre.
        </p>
      </div>

      <section className="section">
        <p className="eyebrow">Arbeidsflyt</p>
        <h2>Slik ser prosessen min ut</h2>

        <div className="grid cards-3" style={{marginTop: "1.5rem"}}>
          <article className="card">
            <p className="eyebrow">01</p>
            <h3>Utforske</h3>
            <p className="muted">
              Jeg bruker AI til å utforske flere retninger tidlig.
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">02</p>
            <h3>Strukturere</h3>
            <p className="muted">
              Så sorterer jeg, prioriterer og lager en enkel plan.
            </p>
          </article>

          <article className="card">
            <p className="eyebrow">03</p>
            <h3>Forbedre</h3>
            <p className="muted">
              Til slutt tester og justerer jeg før levering.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Bruksområder</p>
        <h2>Hva jeg bruker AI til i praksis</h2>

        <div className="grid cards-3" style={{marginTop: "1.5rem"}}>
          <article className="card">
            <h3>Strategi</h3>
            <ul className="thinking-list muted" style={{marginTop: "0.8rem"}}>
              <li>idéutvikling</li>
              <li>innsiktsarbeid</li>
              <li>innholdsstrategi</li>
              <li>kundereiser</li>
            </ul>
          </article>

          <article className="card">
            <h3>Innhold</h3>
            <ul className="thinking-list muted" style={{marginTop: "0.8rem"}}>
              <li>tekstforbedring</li>
              <li>wireframes</li>
              <li>kode</li>
              <li>utkast</li>
            </ul>
          </article>

          <article className="card">
            <h3>Effektivisering</h3>
            <ul className="thinking-list muted" style={{marginTop: "0.8rem"}}>
              <li>automatisering</li>
              <li>testing av konsepter</li>
              <li>struktur i arbeidsflyt</li>
            </ul>
          </article>
        </div>

        <div className="contribution-card" style={{marginTop: "1.5rem"}}>
          <p>
            Kort fortalt: AI hjelper meg å komme raskere fram til gode utkast.
          </p>
        </div>
      </section>

      <div className="button-row section" style={{marginTop: "2rem"}}>
        <Link href="/projects" className="btn">
          Se prosjekter
        </Link>
        <Link href="/contact" className="btn btn-secondary">
          Ta kontakt
        </Link>
      </div>
    </section>
  );
}
