"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "word" | "line";
  delay?: number;
  stagger?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AnimatedText({
  text,
  className,
  as = "h2",
  splitBy = "word",
  delay = 0,
  stagger = 0.06,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const parts = splitBy === "word" ? text.split(" ") : text.split("\n");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const Tag = as;

  return (
    <Tag className={clsx(className)}>
      <motion.span
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="inline-block"
        style={{ display: splitBy === "line" ? "block" : undefined }}
      >
        {parts.map((p, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
            style={{ display: splitBy === "line" ? "block" : "inline-block" }}
          >
            {p}
            {splitBy === "word" && i < parts.length - 1 ? " " : null}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
