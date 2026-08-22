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

  return (
    <section className="contact-page">
      <p className="eyebrow">Kontakt</p>
      <h1 className="contact-title">Kontakt</h1>
      <p className="lead">
        Ta gjerne kontakt hvis du vil prate om prosjekter eller muligheter.
      </p>

      <dl className="contact-list section">
        <div className="contact-item">
          <dt>E-post</dt>
          <dd>
            <a href={`mailto:${email}`}>{email}</a>
          </dd>
        </div>

        <div className="contact-item">
          <dt>Sted</dt>
          <dd>{location}</dd>
        </div>

        <div className="contact-item">
          <dt>LinkedIn</dt>
          <dd>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
            >
              Se profilen min på LinkedIn ↗
            </a>
          </dd>
        </div>

        <div className="contact-item">
          <dt>CV</dt>
          <dd>
            <a href="/cv/download" download>
              Last ned CV
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
