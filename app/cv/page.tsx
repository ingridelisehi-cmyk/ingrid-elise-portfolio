import {client} from "@/sanity/lib/client";
import {
  fallbackEducation,
  fallbackExperience,
  fallbackSiteSettings,
  fallbackSkills,
} from "@/sanity/lib/fallbacks";
import {cvQuery} from "@/sanity/lib/queries";
import {parseCVData} from "@/sanity/lib/validation";

export default async function CVPage() {
  const rawData = await client.fetch<unknown>(cvQuery);
  const data = parseCVData(rawData);

  const experience = data.experience?.length ? data.experience : fallbackExperience;
  const education = data.education?.length ? data.education : fallbackEducation;
  const skills = data.settings?.skills?.length ? data.settings.skills : fallbackSkills;
  const fullName = data.settings?.fullName ?? fallbackSiteSettings.fullName;
  const location = data.settings?.location ?? fallbackSiteSettings.location;
  const languageText = data.settings?.languages?.length
    ? data.settings.languages
        .map((language) => `${language.name ?? ""} (${language.level ?? ""})`)
        .filter((item) => item !== " ()")
        .join(", ")
    : fallbackSiteSettings.languages;
  const otherInfo =
    data.settings?.otherInfo ?? fallbackSiteSettings.otherInfo;

  return (
    <section>
      <p className="eyebrow">CV</p>
      <h1>Erfaring og utdanning</h1>
      <p className="lead">{fullName}, {location}.</p>

      <section className="section cv-timeline-grid">
        <div>
          <p className="eyebrow">Utdanning</p>
          <div className="timeline">
            {education.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.title}`}>
                <p className="eyebrow">{item.period}</p>
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Erfaring</p>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.title}`}>
                <p className="eyebrow">{item.period}</p>
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Ferdigheter</p>
        <div className="grid cards-3" style={{ marginTop: "1rem" }}>
          {skills.map((skill) => (
            <article key={skill} className="card">
              <p>{skill}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section grid" style={{ gap: "1rem" }}>
        <div className="card">
          <p className="eyebrow">Språk</p>
          <p>{languageText}</p>
        </div>
        <div className="card">
          <p className="eyebrow">Annet</p>
          <p>{otherInfo}</p>
        </div>
      </section>

      <div className="button-row">
        <a className="btn" href="/cv/download">
          Last ned CV
        </a>
      </div>
    </section>
  );
}
