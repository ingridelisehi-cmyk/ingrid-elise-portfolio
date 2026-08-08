export default function InstagramEmbed({url}: {url: string}) {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;
  const embedUrl = `${normalizedUrl}embed/?autoplay=1&muted=1`;

  return (
    <div className="instagram-embed-frame">
      <iframe
        src={embedUrl}
        title="Instagram video"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-same-origin allow-scripts allow-presentation"
      />
      <div className="instagram-embed-shield instagram-embed-shield--top" aria-hidden="true" />
      <div className="instagram-embed-shield instagram-embed-shield--bottom" aria-hidden="true" />
      <div className="instagram-embed-shield instagram-embed-shield--left" aria-hidden="true" />
      <div className="instagram-embed-shield instagram-embed-shield--right" aria-hidden="true" />
    </div>
  );
}
