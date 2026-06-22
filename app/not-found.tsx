import { ButtonLink } from "@/components/Button";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

export default function NotFound() {
  return (
    <section className="bg-cream min-h-[80vh] flex items-center pt-32 pb-24">
      <SectionWrap>
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-stone">
              <span className="font-display text-clay mr-2">404</span> Pagina
              non trovata
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[-0.02em]">
              Questa porta
              <br />
              non si apre.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base md:text-lg text-stone leading-relaxed">
              L&apos;immobile o la pagina che cerchi non esiste, o è stata
              spostata. Torna alla home o sfoglia gli immobili che curiamo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/" variant="primary" className="rounded-full">
                Torna alla home
              </ButtonLink>
              <ButtonLink
                href="/immobili"
                variant="primary"
                className="rounded-full"
              >
                Vedi gli immobili
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </SectionWrap>
    </section>
  );
}
