"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface VideoClip {
  readonly src: string;
  readonly poster: string;
  readonly posterAlt: string;
  readonly label: string;
}

/**
 * Video feature with click-to-play.
 *
 * The `<video>` carries `preload="none"` and stays behind a poster until the
 * visitor asks for it. Autoplaying — or even preloading — several megabytes of
 * footage would blow the page budget on exactly the mobile connections most of
 * our visitors are on, for content most of them will never press play on.
 */
export function VideoFeature({ clips }: { clips: readonly VideoClip[] }) {
  if (clips.length === 0) return null;

  return (
    <section aria-labelledby="video-heading" className="relative isolate py-section">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface-soft" />

      <div className="container-page">
        <SectionHeading
          id="video-heading"
          script="See it for yourself"
          title="A debate in motion"
          highlight="motion"
          align="center"
          lede="Footage from our tournaments — the rounds, the rebuttals, and the moment the result lands."
        />

        <Reveal className="mt-12">
          <div
            className={
              clips.length > 1
                ? "grid gap-6 lg:grid-cols-2"
                : "mx-auto max-w-4xl"
            }
          >
            {clips.map((clip) => (
              <VideoPlayer key={clip.src} clip={clip} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VideoPlayer({ clip }: { clip: VideoClip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function start() {
    setIsPlaying(true);
    // The element mounts with the poster; play once React has swapped state in.
    requestAnimationFrame(() => videoRef.current?.play());
  }

  return (
    <figure className="group relative aspect-video overflow-hidden rounded-3xl bg-deep-900 shadow-card">
      <video
        ref={videoRef}
        controls={isPlaying}
        preload="none"
        playsInline
        poster={clip.poster}
        onEnded={() => setIsPlaying(false)}
        className="size-full object-cover"
      >
        <source src={clip.src} type="video/mp4" />
        {/*
          No caption track supplied yet. Add a .vtt file and a <track> element
          here — video without captions excludes deaf and hard-of-hearing
          visitors, and it is a WCAG 1.2.2 failure for prerecorded audio.
        */}
        Your browser does not support embedded video.{" "}
        <a href={clip.src} className="underline">
          Download the clip
        </a>
        .
      </video>

      {!isPlaying ? (
        <>
          {/* Poster overlay — an Image so it is optimised like everything else. */}
          <Image
            src={clip.poster}
            alt={clip.posterAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-deep-900/45" />

          <motion.button
            type="button"
            onClick={start}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid size-20 place-items-center rounded-full bg-white/95 text-brand-600 shadow-card-lifted transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
              <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
            </span>
            <span className="sr-only">Play video: {clip.label}</span>
          </motion.button>

          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-900/85 to-transparent p-5 text-sm font-semibold text-white">
            {clip.label}
          </figcaption>
        </>
      ) : null}
    </figure>
  );
}
