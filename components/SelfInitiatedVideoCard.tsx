"use client";

import type { MouseEvent } from "react";

type SelfInitiatedVideo = {
  src: string;
  label: string;
  title: string;
};

export function SelfInitiatedVideoCard({
  video,
}: {
  video: SelfInitiatedVideo;
}) {
  const handleClick = (event: MouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    videoElement.muted = false;
    videoElement.volume = 1;

    if (videoElement.paused) {
      void videoElement.play();
    }
  };

  return (
    <figure className="creative-video-item">
      <video
        className="creative-video"
        playsInline
        loop
        muted
        controls={false}
        preload="metadata"
        onClick={handleClick}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <figcaption className="creative-video-caption">
        <span>{video.label}</span>
        <small>{video.title}</small>
      </figcaption>
    </figure>
  );
}
