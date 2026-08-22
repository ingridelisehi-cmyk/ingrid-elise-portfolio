import Link from "next/link";
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {fallbackFeaturedProjects} from "@/sanity/lib/fallbacks";
import {homepageQuery} from "@/sanity/lib/queries";
import {parseHomepageData} from "@/sanity/lib/validation";

export default async function HomePage() {
  type EditorialGalleryImage = {
    key: string;
    src: string;
    alt: string;
    className: string;
    width: number;
    height: number;
    sizes: string;
    label?: string;
  };

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
  const projectMetaByTitle: Record<string, {areas: string; imageUrl?: string}> = {
    "Ages by HS": {
      areas: "Merkevarebygging, Innhold, Koordinering, Drift",
      imageUrl: "https://agesbyhs.com/cdn/shop/files/HJ2A2546_1.jpg?v=1729606579&width=1200",
    },
    Masteroppgave: {
      areas: "Analyse · Strategi · Bærekraftig mote",
    },
    "Fra start til skalering - den grønne veien til suksess": {
      areas: "Analyse · Strategi · Bærekraftig mote",
    },
    "Ringnes NoLo": {
      areas: "Forbrukerinnsikt · Strategi · Alkoholfritt",
    },
    "Fra stigmatisert substitutt til aktivt valg - Ringnes": {
      areas: "Forbrukerinnsikt · Strategi · Alkoholfritt",
    },
    "Digitale produktpass med Repass": {
      areas: "Bærekraft · Produktsporbarhet · Kommunikasjon",
      imageUrl: "/repass-qr-code.png",
    },
    Kolleksjonslansering: {
      areas: "Lanseringskoordinering, Arrangement, Visuell retning, Innholdsproduksjon",
      imageUrl: "/launch-1.jpg",
    },
  };

  const preferredSlugOrder = [
    "ages-by-hs",
    "kolleksjonslansering",
    "fra-start-til-skalering",
    "digitale-produktpass",
    "ringnes-nolo",
  ];
  const preferredIndexBySlug = new Map(
    preferredSlugOrder.map((slug, index) => [slug, index]),
  );
  const editorialGalleryImages: EditorialGalleryImage[] = [
    {
      key: "launch-overview",
      src: "/Utvalgte til portefølje/Lansering 14.jpeg",
      alt: "Utvalgt portefoljebilde 1",
      className: "gallery-hero",
      width: 1280,
      height: 853,
      sizes: "(max-width: 900px) 100vw, 92vw",
      label: "Lansering",
    },
    {
      key: "group-staircase",
      src: "/Utvalgte til portefølje/bilder til portefølje 16.jpeg",
      alt: "Utvalgt portefoljebilde 2",
      className: "gallery-left-large",
      width: 800,
      height: 1000,
      sizes: "(max-width: 900px) 100vw, 58vw",
      label: "Visuell retning",
    },
    {
      key: "product-detail",
      src: "/Utvalgte til portefølje/bilder til portefølje 22.jpeg",
      alt: "Utvalgt portefoljebilde 3",
      className: "gallery-right-detail",
      width: 800,
      height: 1000,
      sizes: "(max-width: 900px) 100vw, 30vw",
    },
    {
      key: "event-atmosphere",
      src: "/Utvalgte til portefølje/Lansering 4.png",
      alt: "Utvalgt portefoljebilde 4",
      className: "gallery-left-atmosphere",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 50vw",
      label: "Arrangement",
    },
    {
      key: "editorial-portrait",
      src: "/Utvalgte til portefølje/bilder til portefølje 29.jpeg",
      alt: "Utvalgt portefoljebilde 5",
      className: "gallery-right-portrait",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 42vw",
    },
    {
      key: "staircase-overhead",
      src: "/Utvalgte til portefølje/bilder til portefølje 30.jpeg",
      alt: "Utvalgt portefoljebilde 6",
      className: "gallery-wide-overhead",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 88vw",
      label: "Merkevareopplevelse",
    },
    {
      key: "garment-display",
      src: "/Utvalgte til portefølje/bilder til portefølje 11.jpeg",
      alt: "Utvalgt portefoljebilde 7",
      className: "gallery-left-display",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 48vw",
    },
    {
      key: "brand-tag",
      src: "/Utvalgte til portefølje/bilder til portefølje 23.png",
      alt: "Utvalgt portefoljebilde 8",
      className: "gallery-right-brand",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 38vw",
      label: "Samarbeid",
    },
    {
      key: "group-campaign",
      src: "/Utvalgte til portefølje/bilder til portefølje 31.jpeg",
      alt: "Utvalgt portefoljebilde 9",
      className: "gallery-campaign-large",
      width: 857,
      height: 916,
      sizes: "(max-width: 900px) 100vw, 82vw",
      label: "Innhold",
    },
    {
      key: "event-branding",
      src: "/Utvalgte til portefølje/bilder til portefølje 9.jpeg",
      alt: "Utvalgt portefoljebilde 10",
      className: "gallery-closing-wide",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 78vw",
    },
    {
      key: "clothing-rack",
      src: "/Utvalgte til portefølje/bilder til portefølje 18.jpeg",
      alt: "Utvalgt portefoljebilde 11",
      className: "gallery-closing-detail",
      width: 800,
      height: 1000,
      sizes: "(max-width: 900px) 100vw, 24vw",
    },
    {
      key: "portfolio-extra",
      src: "/Utvalgte til portefølje/Lansering 12.jpeg",
      alt: "Utvalgt portefoljebilde 12",
      className: "gallery-closing-detail",
      width: 640,
      height: 960,
      sizes: "(max-width: 900px) 100vw, 24vw",
    },
  ];
  const orderedFeaturedProjects = [...featuredProjects].sort((a, b) => {
    const aSlug = a.slug ?? featuredSlugByTitle[a.title];
    const bSlug = b.slug ?? featuredSlugByTitle[b.title];
    const aIndex = aSlug
      ? (preferredIndexBySlug.get(aSlug) ?? Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER;
    const bIndex = bSlug
      ? (preferredIndexBySlug.get(bSlug) ?? Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }
    return a.title.localeCompare(b.title, "nb");
  });

  return (
    <>
      <section className="home-hero editorial-home reveal">
        <p className="eyebrow">Hei, jeg er Ingrid.</p>
        <div className="hero-layout editorial-hero-layout">
          <div>
            <h1 className="hero-title">
                Jeg liker å <span className="hero-title-accent">forstå hvorfor</span> noe fungerer, og <span className="hero-title-accent">gjøre mer</span> av det.
              </h1>
            <p className="lead story-lead home-story-lead">
              Jeg kombinerer markedsføring, innhold, merkevare og koordinering
              fra strategi og idé til visuell gjennomføring, publisering og
              kundeopplevelse.
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
              Markedsføring · innhold · merkevare · koordinering
            </p>
          </aside>
        </div>
      </section>

      <section className="section reveal">
        <div className="video-gallery-header">
          <p className="eyebrow">KREATIVT ARBEID</p>
          <h2>Innhold, konsept &amp; visuell kommunikasjon.</h2>
        </div>

        <div className="creative-video-layout">
          <figure className="creative-video-item creative-video-feature">
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

          <figure className="creative-video-item creative-video-side-a">
            <video
              className="creative-video"
              playsInline
              muted
              autoPlay
              loop
              controls
              preload="metadata"
            >
              <source src="/Grand hotel .mp4" type="video/mp4" />
            </video>
          </figure>

          <figure className="creative-video-item creative-video-side-b">
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

        <p className="creative-video-footnote">
          Kreativ retning · Stiluttrykk · Innhold · Redigering
        </p>
      </section>

      <section className="section editorial-gallery-section" aria-labelledby="visualt-arbeid-heading">
        <p className="eyebrow">VISUELT ARBEID</p>
        <div className="editorial-gallery-intro">
          <h2 id="visualt-arbeid-heading">Utvalgte øyeblikk, innhold &amp; merkevarearbeid.</h2>
          <p className="muted editorial-gallery-support">
            Et visuelt utvalg fra arbeid med Ages by HS – fra kampanjeinnhold
            og stiluttrykk til lanseringer, arrangementer og merkevarebygging.
          </p>
        </div>

        <div className="editorial-gallery-grid">
          {editorialGalleryImages.map((image, index) => (
            <figure key={image.key} className={`editorial-gallery-item ${image.className}`}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={image.sizes}
                className="editorial-gallery-image"
                priority={index === 0}
              />
              {image.label ? (
                <figcaption className="editorial-gallery-label" aria-hidden="true"> </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      <section className="section section-marquee reveal" aria-label="Fagområder">
        <div className="marquee-wrap">
          <div className="marquee-track">
            <p>MARKEDSFØRING, MERKEVARE, INNHOLD, KUNDEOPPLEVELSE, MOTE, STRATEGI, KREATIVT ARBEID</p>
            <p aria-hidden="true">MARKEDSFØRING, MERKEVARE, INNHOLD, KUNDEOPPLEVELSE, MOTE, STRATEGI, KREATIVT ARBEID</p>
          </div>
        </div>
      </section>

      <section className="section editorial-section reveal">
        <p className="eyebrow">Utvalgt arbeid</p>
        <div className="perspective-grid projects-intro-grid">
          <div>
            <h2>Et utvalg prosjekter jeg har jobbet med.</h2>
          </div>
        </div>

        <div className="project-editorial-list">
          {orderedFeaturedProjects.map((project, index) => {
            const href =
              project.slug
                ? `/projects/${project.slug}`
                : featuredSlugByTitle[project.title]
                  ? `/projects/${featuredSlugByTitle[project.title]}`
                  : "/projects";
            const projectMeta = projectMetaByTitle[project.title];
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={project.title}
                className={`project-editorial-item reveal${projectMeta?.imageUrl ? " has-preview" : ""}`}
              >
                <div className="project-editorial-main">
                  <h3 className="project-editorial-title">{number}. {project.title}</h3>
                  <p className="project-editorial-areas">{projectMeta?.areas ?? project.description}</p>
                  <Link href={href} className="project-editorial-link">
                    Se prosjekt →
                  </Link>
                </div>
                {projectMeta?.imageUrl ? (
                  <div className="project-editorial-preview" aria-hidden="true">
                    <img src={projectMeta.imageUrl} alt="" loading="lazy" />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section reveal work-with-me home-closing home-closing-editorial">
        <p className="eyebrow">Om meg</p>
        <h2 className="home-closing-title">Jeg er nysgjerrig, lærevillig og liker å gjøre ideer om til noe som fungerer i praksis.</h2>
        <p className="lead">
          Jeg trives i skjæringspunktet mellom kreativitet og struktur, og
          liker å jobbe med mennesker, innhold, merkevare og koordinering. Jeg
          lærer raskt, tar initiativ og liker å få mange detaljer til å henge
          sammen.
        </p>
        <div className="button-row">
          <Link href="/about" className="btn">
            Les mer
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}

