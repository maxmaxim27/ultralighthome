import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-cream pt-32 md:pt-40 pb-24 md:pb-32">
      <SectionWrap>
        <Reveal>
          <p className="text-xs tracking-[0.2em] uppercase text-stone">
            <span className="font-display text-clay mr-2">—</span> {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-4xl md:text-6xl font-light leading-[1] tracking-[-0.02em] max-w-4xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-xs tracking-[0.12em] uppercase text-stone">
            Ultimo aggiornamento: {updated}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 max-w-2xl space-y-10 leading-relaxed text-stone [&_h2]:font-display [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-light [&_h2]:tracking-[-0.01em] [&_h2]:text-ink [&_h2]:mb-3 [&_p]:mb-3 [&_a]:text-ink [&_a]:link-underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-ink">
            {children}
          </div>
        </Reveal>
      </SectionWrap>
    </div>
  );
}
