import Link from "next/link";
import Image from "next/image";
import InteractiveVideo from "@/components/InteractiveVideo";
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
    maxDisplayWidth?: number;
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
      maxDisplayWidth: 1080,
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
      maxDisplayWidth: 520,
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
      maxDisplayWidth: 700,
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
      maxDisplayWidth: 520,
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

  const originalPortfolioVideos = [
    {
      src: "/videos/ages-amalie-reel.mp4",
      label: "01 — Campaign edit",
      title: "Ages by HS reel",
    },
    {
      src: "/videos/Ages_campain_Reel_2_mp4.mp4",
      label: "02 — Brand motion",
      title: "Campaign reel 2",
    },
    {
      src: "/videos/Grand hotel .mp4",
      label: "03 — Fashion film",
      title: "Grand Hotel",
    },
    {
      src: "/videos/Videoe_fashion_Week_portef%C3%B8lje.mp4",
      label: "04 — Fashion week",
      title: "Portfolio motion",
    },
  ];

  const selfInitiatedVideos = [
    {
      src: "/Portef%C3%B8lje%20video%203.mp4",
      label: "01 — THE MORNING EDIT",
      title: "En morgen fortalt gjennom styling & bevegelse",
    },
    {
      src: "/Portef%C3%B8lje%20video%201.mp4",
      label: "02 — OUT OF OFFICE",
      title: "En arbeidsdag flyttet ut av kontoret",
    },
    {
      src: "/Portef%C3%B8lje%20video%202.mp4",
      label: "03 — ESSENTIALS ONLY",
      title: "Hverdagsdetaljer fortalt i bevegelse",
    },
  ];

  return (
    <>
      <section className="home-hero editorial-home reveal" aria-label="Forsidehero">
        <div className="hero-feature">
          <Image
            src="/Utvalgte til portefølje/Lansering 14.jpeg"
            alt="Ingrid Elise portfolio hero visual"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 92vw"
            className="hero-image"
          />

          <div className="hero-overlay">
            <p className="hero-kicker">Brand · Content · Visual Storytelling</p>
            <h1>Ingrid Elise</h1>
            <p className="hero-meta">Oslo / Available internationally</p>
          </div>
        </div>
      </section>

      <section id="work" className="section editorial-work reveal" aria-label="Selected work">
        <div className="selected-work-header">
          <p className="eyebrow">SELECTED WORK</p>
        </div>

        <div className="selected-work-grid">
          {originalPortfolioVideos.map((video, index) => (
            <InteractiveVideo
              key={video.src}
              src={video.src}
              label={video.label}
              title={video.title}
              className={`selected-work-item item-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="section editorial-work reveal" aria-label="Ages by HS">
        <div className="editorial-projects">
          <article className="editorial-project">
            <header className="editorial-project-header">
              <span className="project-number">01</span>
              <div className="project-heading-wrap">
                <h2 className="project-heading">AGES BY HS</h2>
                <div className="project-meta-row">
                  <span>Brand Direction</span>
                  <span>Campaign</span>
                  <span>Content</span>
                  <span>E-commerce</span>
                </div>
              </div>
            </header>

            <p className="case-intro">
              Independent fashion brand shaped by brand direction, campaign storytelling and product-led content.
            </p>

            <div className="editorial-visual-grid ages-grid">
              <figure className="editorial-visual visual-feature">
                <Image
                  src="/Utvalgte til portefølje/Lansering 14.jpeg"
                  alt="Ages by HS campaign edit"
                  width={1400}
                  height={900}
                  className="editorial-image"
                  priority
                  sizes="(max-width: 760px) 100vw, 68vw"
                />
              </figure>

              <div className="editorial-side-stack">
                <figure className="editorial-visual visual-portrait">
                  <Image
                    src="/Utvalgte til portefølje/bilder til portefølje 29.jpeg"
                    alt="Ages by HS portrait detail"
                    width={900}
                    height={1200}
                    className="editorial-image"
                    sizes="(max-width: 760px) 100vw, 32vw"
                  />
                </figure>

                <figure className="editorial-visual visual-video">
                  <video
                    className="editorial-video"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                  >
                    <source src="/videos/ages-amalie-reel.mp4" type="video/mp4" />
                  </video>
                  <span className="play-indicator" aria-hidden="true" />
                </figure>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section editorial-work reveal" aria-label="Personal studies">
        <div className="editorial-projects">
          <article className="editorial-project personal-studies">
            <header className="editorial-project-header">
              <span className="project-number">02</span>
              <div className="project-heading-wrap">
                <h2 className="project-heading">PERSONAL STUDIES</h2>
                <div className="project-meta-row">
                  <span>Fashion</span>
                  <span>Lifestyle</span>
                  <span>Social-first Content</span>
                </div>
              </div>
            </header>

            <div className="study-grid">
              {selfInitiatedVideos.map((video, index) => (
                <InteractiveVideo
                  key={video.src}
                  src={video.src}
                  label={video.label}
                  className={`study-piece piece-${index + 1}`}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section about-home reveal" aria-labelledby="about-home-heading">
        <div className="about-home-grid">
          <div className="about-home-image">
            <Image
              src="/portrait.jpg"
              alt="Portrait of Ingrid Elise"
              width={640}
              height={800}
              className="portrait"
              priority
            />
          </div>

          <div className="about-home-copy">
            <p className="eyebrow">About</p>
            <h2 id="about-home-heading">ABOUT</h2>
            <p>
              I combine a background in Fashion &amp; Textiles, building my own fashion brand, with a master&apos;s degree in Marketing Management.
            </p>
            <Link href="/about" className="about-home-link">Read more</Link>
          </div>
        </div>
      </section>

      <section className="section contact-home reveal" aria-labelledby="contact-home-heading">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-home-heading">LET&apos;S CREATE SOMETHING.</h2>
        <div className="contact-home-meta">
          <a href="mailto:ingridelisehi@hotmail.com">ingridelisehi@hotmail.com</a>
          <a href="https://www.linkedin.com/in/ingrid-elise-endal-hildre-2b57271b5" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}

