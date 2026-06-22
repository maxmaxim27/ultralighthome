import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  description:
    "Termini e condizioni d'uso del sito UltraLightHome.",
  alternates: { canonical: "/termini" },
};

export default function TerminiPage() {
  return (
    <LegalLayout
      eyebrow="Termini"
      title="Termini e condizioni."
      updated="[DA COMPILARE]"
    >
      <section>
        <h2>1. Oggetto</h2>
        <p>
          Questo sito è la vetrina di <strong>[DA COMPILARE — ragione sociale]</strong>{" "}
          e presenta gli immobili gestiti per soggiorni brevi. La consultazione
          del sito implica l&apos;accettazione dei presenti termini.
        </p>
      </section>

      <section>
        <h2>2. Prenotazioni</h2>
        <p>
          Le prenotazioni degli immobili avvengono tramite le piattaforme di
          terze parti collegate (es. Airbnb). Si applicano i termini, le
          condizioni e le politiche di cancellazione della relativa piattaforma.
          Le informazioni pubblicate qui (disponibilità, prezzi, caratteristiche)
          hanno scopo illustrativo e possono variare.
        </p>
      </section>

      <section>
        <h2>3. Proprietà intellettuale</h2>
        <p>
          Testi, immagini, marchi e logo presenti sul sito sono di proprietà del
          titolare o dei rispettivi aventi diritto e non possono essere
          riprodotti senza autorizzazione.
        </p>
      </section>

      <section>
        <h2>4. Limitazione di responsabilità</h2>
        <p>
          Ci impegniamo a mantenere i contenuti aggiornati e accurati, ma non
          garantiamo l&apos;assenza di errori o l&apos;ininterrotta
          disponibilità del sito. Non rispondiamo di eventuali danni derivanti
          dall&apos;uso o dall&apos;impossibilità di uso del sito o dei siti di
          terze parti collegati.
        </p>
      </section>

      <section>
        <h2>5. Legge applicabile e foro competente</h2>
        <p>
          I presenti termini sono regolati dalla legge italiana. Per ogni
          controversia è competente il foro di <strong>[DA COMPILARE]</strong>,
          fatte salve le norme inderogabili a tutela del consumatore.
        </p>
      </section>

      <section>
        <h2>6. Contatti</h2>
        <p>
          Per qualsiasi domanda sui presenti termini:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
