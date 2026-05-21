import clsx from "clsx";
import type { ReactNode } from "react";

export default function SectionWrap({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx("mx-auto max-w-[1400px] px-6 md:px-10", className)}
    >
      {children}
    </section>
  );
}
