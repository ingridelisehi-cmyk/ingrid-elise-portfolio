"use client";

import {useRef, useState} from "react";

type InteractiveVideoProps = {
  src: string;
  title?: string;
  label?: string;
  className?: string;
};

export default function InteractiveVideo({src, title, label, className = ""}: InteractiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async (event?: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();

    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch {
          // Ignore autoplay restrictions and keep the UI in a paused state.
        }
      }
    } else {
      video.pause();
    }
  };

  return (
    <figure className={className}>
      <div className="interactive-video-shell">
        <video
          ref={videoRef}
          className="interactive-video"
          src={src}
          controls={false}
          playsInline
          preload="metadata"
          muted={false}
          onClick={togglePlayback}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <button
            type="button"
            className="video-play-button"
            aria-label={`Play ${title ?? label ?? "video"}`}
            onClick={(event) => {
              event.stopPropagation();
              void togglePlayback();
            }}
          >
            <span aria-hidden="true">▶</span>
          </button>
        )}
      </div>

      {(label || title) && (
        <figcaption>
          {label ? <span>{label}</span> : null}
          {title ? <strong>{title}</strong> : null}
        </figcaption>
      )}
    </figure>
  );
}
