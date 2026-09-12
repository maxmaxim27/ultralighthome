import { readFile } from "node:fs/promises";
import path from "node:path";

/** Satori non risolve URL relative né scarica risorse: un'immagine dentro
 *  `ImageResponse` deve arrivare già come bytes, quindi il PNG va letto dal
 *  disco e inlinato come data URI.
 *
 *  La lettura da filesystem è sicura perché ogni rotta opengraph-image ha il
 *  suo `generateStaticParams`: i PNG nascono in fase di build, dove `public/`
 *  esiste. Sul Worker queste funzioni non vengono mai eseguite. */
export async function logoDataUri(file: "logo.png" | "logo_icon.png") {
  const bytes = await readFile(path.join(process.cwd(), "public", file));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}
