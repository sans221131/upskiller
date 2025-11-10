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
    <div className="w-full rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-sm overflow-hidden">
      {/* main image - larger size */}
      <div
        className="relative w-full aspect-[3/4] bg-slate-200"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {currentImg && (
          <Image
            src={currentImg}
            alt={`${name} photo ${index + 1}`}
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, 400px"
            priority={index === 0}
          />
        )}

        {/* image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* separate text box below image */}
      <div className="p-5 space-y-3">
        <div>
          <div className="text-base font-semibold text-slate-900 leading-tight">
            {name}
          </div>
          {role && (
            <div className="mt-1 text-sm font-normal text-slate-600">
              {role}
            </div>
          )}
        </div>

        {quote && (
          <blockquote className="text-sm leading-relaxed text-slate-700 italic border-l-2 border-[var(--brand)] pl-3">
            {quote}
          </blockquote>
        )}
      </div>
    </div>
  );
}
