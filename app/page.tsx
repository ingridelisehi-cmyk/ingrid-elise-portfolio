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
  type SelectedWorkItem = {
    key: string;
    category: string;
    title: string;
    description: string;
    href: string;
    mediaType: "image" | "video";
    src: string;
    alt: string;
    className: string;
    width: number;
    height: number;
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
  const featuredBySlug = new Map(
    featuredProjects
      .map((project) => {
        const slug = project.slug ?? featuredSlugByTitle[project.title];
        return slug ? [slug, project] : null;
      })
      .filter((entry): entry is [string, (typeof featuredProjects)[number]] => Boolean(entry)),
  );
  const selectedWorkItems: SelectedWorkItem[] = [
    {
      key: "launch-event-film",
      category: "LANSERING / ARRANGEMENT",
      title: "From collection to launch",
      description: "Planlegging · koordinering · visuell retning · innholdsproduksjon",
      href: "/projects/kolleksjonslansering",
      mediaType: "video",
      src: "/Grand hotel .mp4",
      alt: "Lanseringsvideo fra arrangement",
      className: "selected-work-large",
      width: 1280,
      height: 960,
    },
    {
      key: "campaign-brand-content",
      category: "KAMPANJE / VISUELL RETNING",
      title: "Campaign & brand content",
      description: "Konsept · styling · produksjon · redigering",
      href: "/projects/ages-by-hs",
      mediaType: "video",
      src: "/videos/Ages_campain_Reel_2_mp4.mp4",
      alt: "Kampanjeinnhold for Ages by HS",
      className: "selected-work-tall",
      width: 1080,
      height: 1920,
    },
    {
      key: "creative-direction",
      category: "KREATIV RETNING",
      title: "Editorial styling & visual mood",
      description: "Kreativ retning · styling · merkevaretone",
      href: "/projects/ages-by-hs",
      mediaType: "image",
      src: "/gallery/ages-editorial-portrait.jpg",
      alt: "Editorial portrett fra Ages by HS",
      className: "selected-work-medium",
      width: 1200,
      height: 1600,
    },
    {
      key: "brand-experience",
      category: "BRAND EXPERIENCE",
      title: "Detailing that builds identity",
      description: "Detaljarbeid · produktpresentasjon · visuell konsistens",
      href: "/projects/ages-by-hs",
      mediaType: "image",
      src: "/gallery/ages-product-detail.png",
      alt: "Detaljbilde av produkt og branding",
      className: "selected-work-small",
      width: 1200,
      height: 900,
    },
    {
      key: "event-atmosphere",
      category: "EVENT / ATMOSFÆRE",
      title: "Social moments with brand coherence",
      description: "Opplevelsesdesign · koordinering · innhold i kontekst",
      href: "/projects/kolleksjonslansering",
      mediaType: "image",
      src: "/gallery/ages-event-atmosphere.png",
      alt: "Atmosfære fra arrangement",
      className: "selected-work-wide",
      width: 1600,
      height: 1100,
    },
    {
      key: "amalie-reel",
      category: "VIDEO / INNHOLD",
      title: "Editorial social reel",
      description: "Videoidé · innhold · redigering · publisering",
      href: "/projects/ages-by-hs",
      mediaType: "video",
      src: "/videos/ages-amalie-reel.mp4",
      alt: "Vertical reel for Ages by HS",
      className: "selected-work-medium",
      width: 1080,
      height: 1920,
    },
  ];
  const projectStatementBySlug: Record<string, string> = {
    "ages-by-hs": "Fra idé til merkevareopplevelse gjennom innhold, drift og koordinering.",
    kolleksjonslansering: "Fra kolleksjon til lansering med tydelig vertskap, produksjon og gjennomføring.",
    "fra-start-til-skalering": "Forskningsbasert innsikt om hvordan bærekraftige motemerker kan vokse strategisk.",
  };
  const projectMediaBySlug: Record<string, {type: "image" | "video"; src: string; alt: string}> = {
    "ages-by-hs": {
      type: "image",
      src: "https://agesbyhs.com/cdn/shop/files/HJ2A2546_1.jpg?v=1729606579&width=1200",
      alt: "Ages by HS på runway",
    },
    kolleksjonslansering: {
      type: "image",
      src: "/launch-1.jpg",
      alt: "Bilde fra kolleksjonslansering",
    },
    "fra-start-til-skalering": {
      type: "image",
      src: "/repass-landing.png",
      alt: "Visuell for strategisk og bærekraftsrelatert prosjektarbeid",
    },
  };
  const showcaseSlugs = ["ages-by-hs", "kolleksjonslansering", "fra-start-til-skalering"];
  const projectShowcase = showcaseSlugs
    .map((slug) => featuredBySlug.get(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const editorialGalleryImages: EditorialGalleryImage[] = [
    {
      key: "launch-overview",
      src: "/gallery/ages-launch-overview.png",
      alt: "Gjester under et Ages by HS lanseringsarrangement",
      className: "gallery-hero",
      width: 1937,
      height: 1292,
      sizes: "(max-width: 900px) 100vw, 92vw",
      label: "Lansering",
    },
    {
      key: "group-staircase",
      src: "/gallery/ages-group-staircase.jpg",
      alt: "Modeller i Ages by HS antrekk i en trapp",
      className: "gallery-left-large",
      width: 1200,
      height: 1600,
      sizes: "(max-width: 900px) 100vw, 58vw",
      label: "Visuell retning",
    },
    {
      key: "product-detail",
      src: "/gallery/ages-product-detail.png",
      alt: "Produktdetalj med Ages by HS branding under lansering",
      className: "gallery-right-detail",
      width: 1200,
      height: 900,
      sizes: "(max-width: 900px) 100vw, 30vw",
    },
    {
      key: "event-atmosphere",
      src: "/gallery/ages-event-atmosphere.png",
      alt: "Mennesker samlet under et Ages by HS arrangement",
      className: "gallery-left-atmosphere",
      width: 1600,
      height: 1100,
      sizes: "(max-width: 900px) 100vw, 50vw",
      label: "Arrangement",
    },
    {
      key: "editorial-portrait",
      src: "/gallery/ages-editorial-portrait.jpg",
      alt: "Redaksjonelt portrett fra kampanjeinnhold for Ages by HS",
      className: "gallery-right-portrait",
      width: 1200,
      height: 1600,
      sizes: "(max-width: 900px) 100vw, 42vw",
    },
    {
      key: "staircase-overhead",
      src: "/gallery/ages-staircase-overhead.jpg",
      alt: "Overblikk av stiluttrykk og stemning under en Ages by HS lansering",
      className: "gallery-wide-overhead",
      width: 1800,
      height: 1100,
      sizes: "(max-width: 900px) 100vw, 88vw",
      label: "Merkevareopplevelse",
    },
    {
      key: "garment-display",
      src: "/gallery/ages-garment-display.png",
      alt: "Ages by HS plagg stilt ut under lansering",
      className: "gallery-left-display",
      width: 1200,
      height: 1500,
      sizes: "(max-width: 900px) 100vw, 48vw",
    },
    {
      key: "brand-tag",
      src: "/gallery/ages-brand-tag.jpg",
      alt: "Nærbilde av Ages by HS merkelapp",
      className: "gallery-right-brand",
      width: 1100,
      height: 1450,
      sizes: "(max-width: 900px) 100vw, 38vw",
      label: "Samarbeid",
    },
    {
      key: "group-campaign",
      src: "/gallery/ages-group-campaign.jpg",
      alt: "Gruppebilde fra kampanje og lansering for Ages by HS",
      className: "gallery-campaign-large",
      width: 1700,
      height: 1200,
      sizes: "(max-width: 900px) 100vw, 82vw",
      label: "Innhold",
    },
    {
      key: "event-branding",
      src: "/gallery/ages-event-branding.jpg",
      alt: "Ages by HS logo vist under en arrangementspresentasjon",
      className: "gallery-closing-wide",
      width: 1900,
      height: 1150,
      sizes: "(max-width: 900px) 100vw, 78vw",
    },
    {
      key: "clothing-rack",
      src: "/gallery/ages-clothing-rack.jpg",
      alt: "Kurativt stativ med plagg fra Ages by HS",
      className: "gallery-closing-detail",
      width: 1200,
      height: 900,
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
              Jeg liker å forstå hvorfor noe fungerer, og gjøre mer av det.
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
          <h2 className="editorial-display">Innhold, konsept &amp; visuell kommunikasjon.</h2>
        </div>

        <article className="featured-editorial-block">
          <Image
            src="/gallery/ages-launch-overview.png"
            alt="Ages by HS lanseringsøyeblikk"
            width={1937}
            height={1292}
            className="featured-editorial-media"
            sizes="(max-width: 900px) 100vw, 92vw"
            priority
          />
          <div className="featured-editorial-overlay">
            <p className="featured-editorial-category">FASHION / BRAND CONTENT</p>
            <h3 className="featured-editorial-title editorial-display">
              Ages by HS - fra ide til merkevareopplevelse
            </h3>
            <p className="featured-editorial-copy">
              Kreativ retning · innhold · merkevare · lanseringer
            </p>
            <Link href="/projects/ages-by-hs" className="editorial-arrow-link">
              Se prosjekt <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        <div className="selected-work-header">
          <p className="eyebrow">SELECTED WORK</p>
          <h3 className="editorial-display">Kuratert innhold fra prosjekter, kampanjer og lanseringer.</h3>
        </div>

        <div className="selected-work-grid">
          {selectedWorkItems.map((item) => (
            <article key={item.key} className={`selected-work-card ${item.className}`}>
              <Link href={item.href} className="selected-work-media-link" aria-label={`Se prosjekt: ${item.title}`}>
                {item.mediaType === "video" ? (
                  <video
                    className="selected-work-media"
                    playsInline
                    muted
                    autoPlay
                    loop
                    controls
                    preload="metadata"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="selected-work-media"
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                )}
              </Link>
              <div className="selected-work-body">
                <p className="selected-work-category">{item.category}</p>
                <h4 className="selected-work-title editorial-display">{item.title}</h4>
                <p className="selected-work-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section editorial-gallery-section reveal" aria-labelledby="visualt-arbeid-heading">
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
                <figcaption className="editorial-gallery-label">{image.label}</figcaption>
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
            <h2 className="editorial-display">Et utvalg prosjekter jeg har jobbet med.</h2>
          </div>
        </div>

        <div className="project-showcase-list">
          {projectShowcase.map((project, index) => {
            const href =
              project.slug
                ? `/projects/${project.slug}`
                : featuredSlugByTitle[project.title]
                  ? `/projects/${featuredSlugByTitle[project.title]}`
                  : "/projects";
            const projectSlug = project.slug ?? featuredSlugByTitle[project.title];
            const projectMeta = projectMetaByTitle[project.title];
            const number = String(index + 1).padStart(2, "0");
            const media = projectSlug ? projectMediaBySlug[projectSlug] : null;
            const statement = projectSlug
              ? projectStatementBySlug[projectSlug] ?? project.description
              : project.description;

            return (
              <article
                key={project.title}
                className={`project-showcase-item ${index % 2 === 1 ? "is-reversed" : ""}`}
              >
                <div className="project-showcase-content">
                  <p className="project-showcase-number">Prosjekt {number}</p>
                  <h3 className="project-showcase-title editorial-display">{project.title}</h3>
                  <p className="project-showcase-areas">{projectMeta?.areas ?? project.description}</p>
                  <p className="project-showcase-statement">{statement}</p>
                  <Link href={href} className="editorial-arrow-link project-showcase-link">
                    Se prosjekt <span aria-hidden="true">→</span>
                  </Link>
                </div>
                {media ? (
                  <div className="project-showcase-media-wrap">
                    {media.type === "video" ? (
                      <video
                        className="project-showcase-media"
                        playsInline
                        muted
                        autoPlay
                        loop
                        controls
                        preload="metadata"
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={1200}
                        height={900}
                        className="project-showcase-media"
                        sizes="(max-width: 900px) 100vw, 48vw"
                      />
                    )}
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

