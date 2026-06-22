import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sui cookie di UltraLightHome: usiamo solo cookie tecnici necessari, nessuna profilazione.",
  alternates: { canonical: "/cookie" },
};

export default function CookiePage() {
  return (
    <LegalLayout
      eyebrow="Cookie"
      title="Informativa sui cookie."
      updated="[DA COMPILARE]"
    >
      <section>
        <p>
          I cookie sono piccoli file di testo che i siti salvano sul dispositivo
          dell&apos;utente. Possono essere <strong>tecnici</strong> (necessari al
          funzionamento) o di <strong>profilazione</strong> (per tracciare le
          abitudini di navigazione).
        </p>
      </section>

      <section>
        <h2>1. Cookie tecnici</h2>
        <p>
          Per il proprio funzionamento questo sito utilizza esclusivamente{" "}
          <strong>cookie tecnici e necessari</strong>. Non impieghiamo cookie di
          profilazione né strumenti di analisi statistica per finalità di
          marketing. I font sono ospitati direttamente sul nostro sito e non
          comportano richieste a server esterni.
        </p>
      </section>

      <section>
        <h2>2. Cookie di terze parti — Google Maps</h2>
        <p>
          Nella pagina <a href="/dove-siamo">Dove siamo</a> incorporiamo una
          mappa di <strong>Google Maps</strong>. Questo servizio, fornito da
          Google Ireland Ltd., può installare cookie di terze parti e trattare
          dati (incluso l&apos;indirizzo IP), con possibili trasferimenti verso
          gli Stati Uniti.
        </p>
        <p>
          La mappa <strong>non viene caricata automaticamente</strong>: resta
          sostituita da un&apos;anteprima e i contenuti di Google — con i
          relativi cookie — vengono attivati <strong>solo dopo il tuo consenso
          esplicito</strong>, cliccando &laquo;Mostra la mappa&raquo;.
        </p>
        <p>
          Per i dettagli sul trattamento da parte di Google consulta la{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy di Google</a>.
        </p>
      </section>

      <section>
        <h2>3. Gestione del consenso</h2>
        <p>
          Poiché i cookie di terze parti vengono attivati solo previo consenso,
          non è presente un banner generale: il consenso è richiesto in modo
          puntuale al momento del caricamento della mappa. Puoi revocare il
          consenso cancellando i cookie e i dati del sito dalle impostazioni del
          browser.
        </p>
      </section>

      <section>
        <h2>4. Come gestire i cookie nel browser</h2>
        <p>
          Puoi controllare o eliminare i cookie tramite le impostazioni del tuo
          browser. La disabilitazione dei cookie tecnici potrebbe compromettere
          alcune funzionalità del sito.
        </p>
      </section>

      <section>
        <h2>5. Aggiornamenti</h2>
        <p>
          Qualora introducessimo nuovi strumenti di terze parti che utilizzano
          cookie non tecnici, aggiorneremo questa informativa. Per domande:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
