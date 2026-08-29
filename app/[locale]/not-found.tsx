import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/Button";
import SectionWrap from "@/components/SectionWrap";
import Reveal from "@/components/Reveal";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tCommon = useTranslations("common");

  return (
    <section className="bg-white min-h-[80vh] flex items-center pt-32 pb-24">
      <SectionWrap>
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-stone">
              <span className="font-display text-clay mr-2">404</span>{" "}
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-6 text-5xl md:text-7xl lg:text-8xl font-light leading-[1.2] tracking-[-0.01em]">
              {t.rich("title", { br: () => <br /> })}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base md:text-lg text-stone leading-relaxed">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/" variant="primary" className="rounded-full">
                {tCommon("backHome")}
              </ButtonLink>
              <ButtonLink
                href="/immobili"
                variant="primary"
                className="rounded-full"
              >
                {tCommon("seeProperties")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </SectionWrap>
    </section>
  );
}
