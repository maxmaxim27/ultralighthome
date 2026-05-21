import Link from "next/link";
import clsx from "clsx";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "ghost";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 text-sm tracking-[0.08em] uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] font-sans";

const variants: Record<Variant, string> = {
  primary:
    "bg-clay text-cream px-7 py-3.5 hover:bg-terracotta",
  outline:
    "border border-ink text-ink px-7 py-3.5 hover:bg-ink hover:text-cream",
  ghost: "text-ink link-underline px-0 py-1",
};

type LinkBtnProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

type BtnProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...rest
}: LinkBtnProps) {
  return (
    <Link className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: BtnProps) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
