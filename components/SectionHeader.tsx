import clsx from "clsx";
import Reveal from "./Reveal";

type Props = {
  eyebrowNumber?: string;
  eyebrowText: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrowNumber,
  eyebrowText,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-stone">
          {eyebrowNumber && (
            <span className="font-display text-clay">{eyebrowNumber}</span>
          )}
          <span>{eyebrowText}</span>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.01em] text-ink">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-base md:text-lg text-stone leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
