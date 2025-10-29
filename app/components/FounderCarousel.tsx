"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  name: string;
  role?: string;
  quote?: string;
  interval?: number; // ms
};

export default function FounderCarousel({
  images,
  name,
  role,
  quote,
  interval = 3000,
}: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);

  // autoplay logic
  useEffect(() => {
    function start() {
      stop();
      // @ts-ignore
      timer.current = window.setInterval(() => {
        if (!paused.current) {
          setIndex((i) => (i + 1) % images.length);
        }
      }, interval);
    }
    function stop() {
      if (timer.current) {
        clearInterval(timer.current as number);
        timer.current = null;
      }
    }

    if (images.length > 1) start();
    return () => stop();
  }, [images.length, interval]);

  // safety
  const currentImg = images[index] ?? images[0] ?? "";

  return (
    <div className="w-full rounded-2xl bg-slate-50 ring-1 ring-slate-200/70 shadow-sm overflow-hidden">
      {/* main image / banner */}
      <div
        className="relative w-full aspect-[4/3] bg-slate-200"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {currentImg && (
          <Image
            src={currentImg}
            alt={`${name} photo ${index + 1}`}
            fill
            className="object-cover object-top"
            sizes="320px"
          />
        )}

        {/* gradient + text overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white p-4">
          <div className="text-sm font-semibold leading-tight">
            {name}
            {role ? (
              <span className="block text-[11px] font-normal text-white/80">
                {role}
              </span>
            ) : null}
          </div>

          {quote && (
            <blockquote className="mt-2 text-[12px] leading-relaxed text-white/90">
              {quote}
            </blockquote>
          )}
        </div>

        {/* no indicators shown - autoplay only per request */}
      </div>

      {/* thumbnails removed — images autoplay silently */}
    </div>
  );
}
