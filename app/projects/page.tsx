import Image from "next/image";
import Link from "next/link";
import InteractiveVideo from "@/components/InteractiveVideo";
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

  const featuredProjects = ["ages-by-hs"];
  const secondaryProjects = projects.filter((project) => !featuredProjects.includes(project.slug));

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

  const personalStudies = [
    {
      src: "/Portef%C3%B8lje%20video%203.mp4",
      label: "THE MORNING EDIT",
    },
    {
      src: "/Portef%C3%B8lje%20video%201.mp4",
      label: "OUT OF OFFICE",
    },
    {
      src: "/Portef%C3%B8lje%20video%202.mp4",
      label: "ESSENTIALS ONLY",
    },
  ];

  const agesByHs = projects.find((project) => project.slug === "ages-by-hs");

  return (
    <section className="projects-page">
      <header className="projects-page-header">
        <p className="eyebrow">WORK</p>
        <h1>WORK</h1>
      </header>

      <section className="projects-featured" aria-label="Selected work">
        <div className="projects-featured-header">
          <p className="eyebrow">SELECTED WORK</p>
        </div>

        <article className="featured-case feature-ages">
          <Link href={`/projects/${agesByHs?.slug ?? "ages-by-hs"}`} className="featured-case-visual">
            <Image
              src="/Utvalgte til portefølje/Lansering 14.jpeg"
              alt="Ages by HS campaign visual"
              width={1400}
              height={900}
              className="featured-case-image"
              sizes="(max-width: 760px) 100vw, 68vw"
            />
          </Link>

          <div className="featured-case-copy">
            <p className="project-label">Ages by HS</p>
            <h2>AGES BY HS</h2>
            <p className="project-subtitle">Independent fashion brand</p>
            <p className="project-meta">Brand Direction · Content · Campaign · E-commerce</p>
          </div>
        </article>
      </section>

      <section className="projects-motion" aria-label="Selected motion">
        <header className="projects-featured-header">
          <p className="eyebrow">SELECTED MOTION</p>
        </header>

        <div className="featured-video-grid">
          {originalPortfolioVideos.map((video, index) => (
            <InteractiveVideo
              key={video.src}
              src={video.src}
              label={video.label}
              title={video.title}
              className={`creative-video-item item-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="projects-series" aria-label="Personal studies">
        <header className="series-header">
          <p className="eyebrow">SELVINITIERTE VISUELLE STUDIER</p>
          <p className="projects-series-intro">
            Utforsker mote, bevegelse og hverdagsøyeblikk gjennom mobilbasert innhold.
          </p>
        </header>

        <div className="series-grid">
          {personalStudies.map((video, index) => (
            <InteractiveVideo
              key={video.src}
              src={video.src}
              label={video.label}
              className={`study-card ${index === 0 ? "study-card-feature" : "study-card-support"}`}
            />
          ))}
        </div>
      </section>

      <section className="secondary-projects" aria-label="Andre prosjekter">
        <header className="secondary-header">
          <p className="eyebrow">ANDRE PROSJEKTER</p>
        </header>

        <ul className="secondary-project-list">
          {secondaryProjects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="secondary-project-item">
                <span className="secondary-project-title">{project.title}</span>
                <span className="secondary-project-meta">{project.category ?? "Prosjekt"}</span>
                {project.year ? <span className="secondary-project-year">{project.year}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
