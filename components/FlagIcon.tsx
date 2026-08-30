"use client";

import { useId } from "react";
import type { Locale } from "@/i18n/routing";

type Props = { locale: Locale; className?: string };

export default function FlagIcon({ locale, className = "h-3.5 w-5" }: Props) {
  const clipId = useId();
  const common = {
    viewBox: "0 0 60 30",
    className: `${className} rounded-[2px] shrink-0`,
    role: "presentation" as const,
    "aria-hidden": true,
  };

  if (locale === "it") {
    return (
      <svg {...common}>
        <rect width="20" height="30" fill="#008C45" />
        <rect x="20" width="20" height="30" fill="#F4F5F0" />
        <rect x="40" width="20" height="30" fill="#CD212A" />
      </svg>
    );
  }

  if (locale === "de") {
    return (
      <svg {...common}>
        <rect width="60" height="10" fill="#000000" />
        <rect y="10" width="60" height="10" fill="#DD0000" />
        <rect y="20" width="60" height="10" fill="#FFCE00" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <clipPath id={clipId}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath={`url(#${clipId})`}
        stroke="#C8102A"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102A" strokeWidth="6" />
    </svg>
  );
}
