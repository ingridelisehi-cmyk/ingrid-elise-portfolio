import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {fallbackProjectDetails} from "@/sanity/lib/fallbacks";
import {projectBySlugQuery, projectSlugsQuery} from "@/sanity/lib/queries";
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

  if (!project) {
    notFound();
  }

  return (
    <article>
      <header className={isMasterThesis ? "thesis-header" : undefined}>
        <p className="eyebrow">{project.category ?? "Prosjekt"}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>

        {isMasterThesis ? (
          <div className="thesis-meta section" style={{marginTop: "1.5rem"}}>
            <span className="thesis-pill">Master i markedsføringsledelse</span>
            <span className="thesis-pill">Høyskolen Kristiania</span>
            <span className="thesis-pill">Kvalitativ studie</span>
            <span className="thesis-pill">2024</span>
          </div>
        ) : null}
      </header>

      {project.imageUrls?.length ? (
        <section className="section grid cards-2">
          {project.imageUrls.slice(0, 4).map((imageUrl) => (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={`Bilde fra ${project.title}`}
              className="project-detail-image"
              width={1200}
              height={1500}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          ))}
        </section>
      ) : null}


      <section className="section project-detail-grid">
        <div className="card">
          <p className="eyebrow">Utfordring</p>
          <p>{project.challenge ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Prosess</p>
          <p>{project.process ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Resultat</p>
          <p>{project.outcome ?? "Ikke spesifisert enda."}</p>
        </div>

        <div className="card">
          <p className="eyebrow">Lenker</p>
          {project.links?.length ? (
            <div>
              {project.links.map((link) => (
                <p key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </p>
              ))}
            </div>
          ) : project.projectUrl ? (
            <a href={project.projectUrl} target="_blank" rel="noreferrer">
              {project.projectUrl}
            </a>
          ) : (
            <p>Ingen lenke lagt til ennå.</p>
          )}
        </div>
      </section>

      {project.learnings?.length ? (
        <section className="section">
          <p className="eyebrow">Læringer</p>
          <div className="grid cards-2" style={{marginTop: "1rem"}}>
            {project.learnings.map((learning) => (
              <article key={learning} className="card">
                <p>{learning}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {project.skills?.length ? (
        <section className="section">
          <p className="eyebrow">Ferdigheter</p>
          <div className="skill-tags" style={{marginTop: "1rem"}}>
            {project.skills.map((skill) => (
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
