"use client";

import Link from "next/link";

export function ApplyNowButton() {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link
      href="/lead-form"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center bg-white text-[var(--brand)] border border-[var(--brand)] px-2 sm:px-3 md:px-4 py-2 rounded-full font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap shrink-0 hover:bg-[var(--brand)]/5 transition-colors"
    >
      Apply Now
    </Link>
  );
}

