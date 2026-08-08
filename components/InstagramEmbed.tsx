export default function InstagramEmbed({url}: {url: string}) {
  const normalizedUrl = url.endsWith('/') ? url : `${url}/`;
  const embedUrl = `${normalizedUrl}embed`;

  return (
    <div className="instagram-embed-frame instagram-embed-frame--clean">
      <iframe
        src={embedUrl}
        title="Instagram video"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-same-origin allow-scripts allow-presentation"
      />
    </div>
  );
}
