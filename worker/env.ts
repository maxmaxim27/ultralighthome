// Declared by hand rather than generated with `wrangler types`: `next build`
// type-checks the worker too, and the generated file is git-ignored.
export type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Local testing only, set in .dev.vars: run every check, send no email. */
  CONTACT_DRY_RUN?: string;
};
