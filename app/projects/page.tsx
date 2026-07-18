import Image from "next/image";
import Link from "next/link";
import {client} from "@/sanity/lib/client";
import {fallbackProjects} from "@/sanity/lib/fallbacks";
import {projectsQuery} from "@/sanity/lib/queries";
import type {ProjectItem} from "@/sanity/lib/types";
import {parseProjectsData} from "@/sanity/lib/validation";

export default async function ProjectsPage() {
  const rawProjects = await client.fetch<unknown>(projectsQuery);
  const sanityProjects = parseProjectsData(rawProjects);

  const projectsBySlug = new Map<string, ProjectItem>();

  for (const project of fallbackProjects) {
    projectsBySlug.set(project.slug, {
      title: project.title,
      slug: project.slug,
      category: project.category,
      year: project.year,
      imageUrl: project.imageUrl,
      summary: project.summary,
    });
  }

  for (const project of sanityProjects) {
    projectsBySlug.set(project.slug, {
      ...projectsBySlug.get(project.slug),
      ...project,
    });
  }

  const projects = Array.from(projectsBySlug.values()).sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;
      return yearB - yearA;
    });

  return (
    <section>
      <p className="eyebrow">Prosjekter</p>
      <h1>Prosjekter</h1>
      <p className="lead">
        Her er et utvalg arbeid jeg har gjort.
      </p>

      <div className="grid cards-3 section">
        {projects.map((project) => (
          <article className="card" key={project.title}>
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="project-card-image"
                width={1200}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            ) : null}
            <p className="eyebrow">{project.category ?? "Prosjekt"}</p>
            <h3>{project.title}</h3>
            {project.year ? <p className="eyebrow">{project.year}</p> : null}
            <p className="muted">{project.summary}</p>
            <div className="button-row" style={{ marginTop: "1.2rem" }}>
              <Link href={`/projects/${project.slug}`} className="btn btn-secondary">
                Les case
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
