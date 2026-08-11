import Link from "next/link";
import {client} from "@/sanity/lib/client";
import {fallbackFeaturedProjects} from "@/sanity/lib/fallbacks";
import {homepageQuery} from "@/sanity/lib/queries";
import {parseHomepageData} from "@/sanity/lib/validation";

export default async function HomePage() {
  const rawData = await client.fetch<unknown>(homepageQuery);
  const data = parseHomepageData(rawData);

  const featuredProjects = Array.from(
    new Map(
      [
        ...(data.featuredProjects ?? []),
        ...fallbackFeaturedProjects,
      ].map((project) => [project.slug ?? project.title, project]),
    ).values(),
  );
  const featuredSlugByTitle: Record<string, string> = {
    "Ages by HS": "ages-by-hs",
    Masteroppgave: "fra-start-til-skalering",
    "Ringnes NoLo": "ringnes-nolo",
    "Fra start til skalering - den grønne veien til suksess": "fra-start-til-skalering",
    "Fra stigmatisert substitutt til aktivt valg - Ringnes": "ringnes-nolo",
    "Digitale produktpass med Repass": "digitale-produktpass",
    Kolleksjonslansering: "kolleksjonslansering",
  };

  return (
    <>
      <section className="home-hero editorial-home reveal">
        <p className="eyebrow">Hei, jeg er Ingrid.</p>
        <div className="hero-layout editorial-hero-layout">
          <div>
            <h1 className="hero-title">
              Jeg liker å forstå hvorfor noe fungerer – og gjøre mer av det.
            </h1>
            <p className="lead story-lead home-story-lead">
              Jeg kombinerer markedsføring, design og kundeinnsikt – fra idé
              og innhold til gjennomføring og kundereise.
            </p>
            <div className="button-row home-cta-row">
              <Link href="/projects" className="btn">
                Se case
              </Link>
              <Link href="/how-i-think" className="btn btn-secondary">
                Hvordan jeg tenker
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Kontakt
              </Link>
            </div>
          </div>

          <aside className="hero-note editorial-aside">
            <p className="eyebrow">Kort fortalt</p>
            <p className="editorial-quote">
              Markedsføring · innhold · design · kundeopplevelse
            </p>
          </aside>
        </div>
      </section>

      <section className="section reveal">
        <div className="video-gallery-header">
          <p className="eyebrow">Kreativt arbeid</p>
          <h2>Innhold og video for Ages</h2>
        </div>

        <div className="grid cards-3 creative-video-grid">
          <figure className="creative-video-item">
            <video
              className="creative-video"
              playsInline
              muted
              autoPlay
              loop
              controls
              preload="metadata"
            >
              <source src="/videos/ages-amalie-reel.mp4" type="video/mp4" />
            </video>
          </figure>

          <figure className="creative-video-item">
            <video
              className="creative-video"
              playsInline
              muted
              autoPlay
              loop
              controls
              preload="metadata"
            >
              <source src="/Grand_Hotel_Runway_Final.mp4" type="video/mp4" />
            </video>
          </figure>

          <figure className="creative-video-item">
            <video
              className="creative-video"
              playsInline
              muted
              autoPlay
              loop
              controls
              preload="metadata"
            >
              <source src="/videos/Ages_campain_Reel_2_mp4.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </section>

      <section className="section editorial-section reveal">
        <p className="eyebrow">Utvalgt arbeid</p>
        <div className="perspective-grid projects-intro-grid">
          <div>
            <h2>Et utvalg prosjekter jeg har jobbet med.</h2>
          </div>
        </div>

        <div className="grid cards-3" style={{marginTop: "1.75rem"}}>
          {featuredProjects.map((project) => (
            <article key={project.title} className="card project-story-card">
              <p className="eyebrow">Case</p>
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
              <div className="button-row" style={{marginTop: "1rem"}}>
                <Link
                  href={
                    project.slug
                      ? `/projects/${project.slug}`
                      : featuredSlugByTitle[project.title]
                        ? `/projects/${featuredSlugByTitle[project.title]}`
                        : "/projects"
                  }
                  className="btn btn-secondary"
                >
                  Les case
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal work-with-me home-closing">
        <div className="closing-panel">
          <p className="eyebrow">Om meg</p>
          <h2>Jeg er nysgjerrig, lærevillig og liker å gjøre ideer om til noe som fungerer i praksis.</h2>
          <p className="lead">
            Jeg lærer raskt, spør mye, og trives best når jeg får jobbe tett
            på både mennesker og oppgaver.
          </p>
          <div className="button-row">
            <Link href="/about" className="btn">
              Les mer
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

