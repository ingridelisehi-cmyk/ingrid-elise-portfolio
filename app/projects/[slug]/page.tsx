import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {fallbackProjectDetails} from "@/sanity/lib/fallbacks";
import {projectBySlugQuery, projectSlugsQuery} from "@/sanity/lib/queries";
import type {ProjectDetail} from "@/sanity/lib/types";
import {parseProjectDetail} from "@/sanity/lib/validation";

type ProjectPageProps = {
  params: Promise<{slug: string}>;
};

export async function generateStaticParams() {
  const rawSlugs = await client.fetch<unknown>(projectSlugsQuery);
  const slugsFromSanity = Array.isArray(rawSlugs)
    ? rawSlugs.filter((item): item is string => typeof item === "string")
    : [];

  const fallbackSlugs = Object.keys(fallbackProjectDetails);
  const slugs = Array.from(new Set([...slugsFromSanity, ...fallbackSlugs]));

  return slugs.map((slug) => ({slug}));
}

export default async function ProjectDetailPage({params}: ProjectPageProps) {
  const {slug} = await params;
  const rawData = await client.fetch<unknown>(projectBySlugQuery, {slug});
  const project = parseProjectDetail(rawData) ?? fallbackProjectDetails[slug as keyof typeof fallbackProjectDetails] ?? null;
  const isMasterThesis = slug === "fra-start-til-skalering";
  const isDigitalPassport = slug === "digitale-produktpass";
  const isAgesByHs = slug === "ages-by-hs";

  if (!project) {
    notFound();
  }

  const projectDetail: ProjectDetail = {
    ...project,
    learnings: project.learnings ? [...project.learnings] : undefined,
    skills: project.skills ? [...project.skills] : undefined,
    links: "links" in project && project.links ? project.links.map((link) => ({...link})) : undefined,
    imageUrls: project.imageUrls ? [...project.imageUrls] : undefined,
  };

  return (
    <article>
      <header className={isMasterThesis ? "thesis-header" : undefined}>
        <p className="eyebrow">{projectDetail.category ?? "Prosjekt"}</p>
        <h1>{projectDetail.title}</h1>
        <p className="lead">{projectDetail.summary}</p>

        {isMasterThesis ? (
          <div className="thesis-meta section" style={{marginTop: "1.5rem"}}>
            <span className="thesis-pill">Master i markedsføringsledelse</span>
            <span className="thesis-pill">Høyskolen Kristiania</span>
            <span className="thesis-pill">Kvalitativ studie</span>
            <span className="thesis-pill">2024</span>
          </div>
        ) : null}
      </header>

      {projectDetail.imageUrls?.length ? (
        <section className={isDigitalPassport ? "section project-detail-image-section" : "section grid cards-2"}>
          {projectDetail.imageUrls.slice(0, isDigitalPassport ? 1 : 4).map((imageUrl) => (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={"Bilde fra " + projectDetail.title}
              className={isDigitalPassport ? "project-detail-image project-detail-image-hero" : "project-detail-image"}
              width={isDigitalPassport ? 1600 : 1200}
              height={isDigitalPassport ? 900 : 1500}
              sizes={isDigitalPassport ? "(max-width: 900px) 100vw, 1120px" : "(max-width: 900px) 100vw, 50vw"}
            />
          ))}
        </section>
      ) : null}

      {isAgesByHs ? (
        <section className="section press-feature reveal">
          <div className="card press-feature-card">
            <p className="eyebrow">Omtalt i presse</p>
            <h2>Kjenner du til det norske klesmerket AGES by HS?</h2>
            <p className="press-source">Melk &amp; Honning</p>
            <p className="press-copy">
              AGES by HS fikk redaksjonell omtale i Melk &amp; Honning, der Ingrid og medgründer Filippa Sekkelsten ble intervjuet om merkevaren, designfilosofien og bærekraftsarbeidet.
            </p>
            <a
              href="https://melkoghonning.no/kjenner-du-til-det-norske-klesmerket-ages-by-hs"
              target="_blank"
              rel="noreferrer"
              className="press-link"
            >
              Les artikkelen ↗
            </a>
          </div>
        </section>
      ) : null}

      <section className="section project-detail-grid">
        <div className="card">
          <p className="eyebrow">Utfordring</p>
          <p>{projectDetail.challenge ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Prosess</p>
          <p>{projectDetail.process ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Resultat</p>
          <p>{projectDetail.outcome ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Lenker</p>
          {projectDetail.links?.length ? (
            <div>
              {projectDetail.links.map((link) => (
                <p key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          ) : projectDetail.projectUrl ? (
            <a href={projectDetail.projectUrl} target="_blank" rel="noreferrer">
              {projectDetail.projectUrl}
            </a>
          ) : (
            <p>Ingen lenke lagt til ennå.</p>
          )}
        </div>
      </section>

      {projectDetail.learnings?.length ? (
        <section className="section">
          <p className="eyebrow">Læringer</p>
          <div className="grid cards-2" style={{marginTop: "1rem"}}>
            {projectDetail.learnings.map((learning) => (
              <article key={learning} className="card">
                <p>{learning}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {projectDetail.skills?.length ? (
        <section className="section">
          <p className="eyebrow">Ferdigheter</p>
          <div className="skill-tags" style={{marginTop: "1rem"}}>
            {projectDetail.skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <div className="button-row section">
        <Link href="/projects" className="btn">
          Tilbake til prosjekter
        </Link>
      </div>
    </article>
  );
}
