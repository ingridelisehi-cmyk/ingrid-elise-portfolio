"use client";

import Image from "next/image";
import {useState} from "react";

export default function PortraitImage() {
  const [src, setSrc] = useState("/portrait.jpg");

  return (
    <Image
      src={src}
      alt="Portrett av Ingrid Elise"
      width={640}
      height={800}
      className="portrait"
      priority
      onError={() => setSrc("/portrait-placeholder.svg")}
    />
  );
}
