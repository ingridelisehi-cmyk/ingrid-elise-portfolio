"use client";

import {useEffect} from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type InstagramEmbedProps = {
  url: string;
};

export default function InstagramEmbed({url}: InstagramEmbedProps) {
  useEffect(() => {
    const processEmbeds = () => {
      window.instgrm?.Embeds?.process();
    };

    const existingScript = document.getElementById("instagram-embed-script") as HTMLScriptElement | null;
    if (existingScript) {
      if (window.instgrm?.Embeds) {
        processEmbeds();
      } else {
        existingScript.addEventListener("load", processEmbeds, {once: true});
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = processEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
    />
  );
}