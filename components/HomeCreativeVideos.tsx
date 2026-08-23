"use client";

import {useEffect, useRef} from "react";

function normalizeVideoAudio(video: HTMLVideoElement) {
  video.defaultMuted = false;
  video.muted = false;
  if (video.volume === 0) {
    video.volume = 1;
  }
  video.removeAttribute("muted");
}

export default function HomeCreativeVideos() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) {
      return;
    }

    const videos = Array.from(root.querySelectorAll("video"));
    const cleanups: Array<() => void> = [];

    for (const video of videos) {
      normalizeVideoAudio(video);

      const onPlay = () => normalizeVideoAudio(video);
      const onClick = () => normalizeVideoAudio(video);

      video.addEventListener("play", onPlay);
      video.addEventListener("click", onClick);

      cleanups.push(() => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("click", onClick);
      });
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section reveal">
      <div className="video-gallery-header">
        <p className="eyebrow">KREATIVT ARBEID</p>
        <h2>Innhold, konsept &amp; visuell kommunikasjon.</h2>
      </div>

      <div className="creative-video-layout">
        <figure className="creative-video-item creative-video-feature">
          <video
            className="creative-video"
            playsInline
            loop
            controls
            preload="metadata"
          >
            <source src="/videos/ages-amalie-reel.mp4" type="video/mp4" />
          </video>
        </figure>

        <figure className="creative-video-item creative-video-side-a">
          <video
            className="creative-video"
            playsInline
            loop
            controls
            preload="metadata"
          >
            <source src="/Grand hotel .mp4" type="video/mp4" />
          </video>
        </figure>

        <figure className="creative-video-item creative-video-side-b">
          <video
            className="creative-video"
            playsInline
            loop
            controls
            preload="metadata"
          >
            <source src="/videos/Ages_campain_Reel_2_mp4.mp4" type="video/mp4" />
          </video>
        </figure>

        <figure className="creative-video-item creative-video-side-c">
          <video
            className="creative-video"
            playsInline
            loop
            controls
            preload="metadata"
          >
            <source src="/videos/Videoe_fashion_Week_portefølje.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>

      <p className="creative-video-footnote">
        Kreativ retning · Stiluttrykk · Innhold · Redigering
      </p>
    </section>
  );
}