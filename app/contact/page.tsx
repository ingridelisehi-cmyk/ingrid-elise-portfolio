import {client} from "@/sanity/lib/client";
import {fallbackSiteSettings} from "@/sanity/lib/fallbacks";
import {contactQuery} from "@/sanity/lib/queries";
import {parseContactData} from "@/sanity/lib/validation";

export default async function ContactPage() {
  const rawData = await client.fetch<unknown>(contactQuery);
  const data = parseContactData(rawData);

  const email = data?.email ?? fallbackSiteSettings.email;
  const location = data?.location ?? fallbackSiteSettings.location;
  const linkedinUrl = data?.linkedinUrl ?? fallbackSiteSettings.linkedinUrl;
  const linkedinLabel = linkedinUrl
    .replace("https://", "")
    .replace("http://", "")
    .replace(/\/$/, "");

  return (
    <section>
      <p className="eyebrow">Kontakt</p>
      <h1>Kontakt</h1>
      <p className="lead">
        Ta gjerne kontakt hvis du vil prate om prosjekter eller muligheter.
      </p>

      <div className="grid section" style={{ gap: "1.5rem" }}>
        <div className="card">
          <h3>E-post</h3>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>

        <div className="card">
          <h3>Sted</h3>
          <p>{location}</p>
        </div>

        <div className="card">
          <h3>LinkedIn</h3>
          <p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              {linkedinLabel}
            </a>
          </p>
        </div>

        <div className="card">
          <h3>CV</h3>
          <p>
            <a href="/cv/download" download>
              Last ned CV
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
