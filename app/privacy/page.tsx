import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di UltraLightHome ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy"
      title="Informativa sulla privacy."
      updated="[DA COMPILARE]"
    >
      <section>
        <p>
          La presente informativa descrive come trattiamo i dati personali
          raccolti tramite questo sito, ai sensi del Regolamento UE 2016/679
          (&laquo;GDPR&raquo;) e della normativa italiana applicabile.
        </p>
      </section>

      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Titolare del trattamento è <strong>[DA COMPILARE — ragione sociale]</strong>,
          P.IVA <strong>[DA COMPILARE]</strong>, con sede in{" "}
          <strong>[DA COMPILARE — indirizzo]</strong>.
        </p>
        <p>
          Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>

      <section>
        <h2>2. Dati che raccogliamo</h2>
        <ul>
          <li>
            <strong>Dati del modulo contatti:</strong> nome e cognome, email e
            il contenuto del messaggio che ci invii.
          </li>
          <li>
            <strong>Dati di navigazione:</strong> dati tecnici raccolti
            automaticamente dai server (es. indirizzo IP, log di accesso) per il
            funzionamento e la sicurezza del sito.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalità e base giuridica</h2>
        <ul>
          <li>
            Rispondere alle tue richieste e gestire i contatti — base giuridica:
            esecuzione di misure precontrattuali e legittimo interesse (art. 6.1
            lett. b e f GDPR).
          </li>
          <li>
            Garantire sicurezza e corretto funzionamento del sito — legittimo
            interesse (art. 6.1 lett. f GDPR).
          </li>
          <li>
            Adempiere a obblighi di legge — art. 6.1 lett. c GDPR.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Conservazione dei dati</h2>
        <p>
          Conserviamo i dati per il tempo necessario alle finalità indicate e
          comunque non oltre <strong>[DA COMPILARE — es. 24 mesi]</strong> dalla
          tua ultima richiesta, salvo diversi obblighi di legge.
        </p>
      </section>

      <section>
        <h2>5. Destinatari dei dati</h2>
        <p>
          I dati possono essere trattati da fornitori che ci supportano
          nell&apos;erogazione del servizio (es. hosting e gestione del sito),
          nominati responsabili del trattamento. Non vendiamo i tuoi dati a
          terzi.
        </p>
        <p>
          La pagina <a href="/dove-siamo">Dove siamo</a> integra una mappa di{" "}
          <strong>Google Maps</strong> (Google Ireland Ltd.), caricata solo
          previo tuo consenso: in tal caso Google può trattare dati, anche con
          trasferimento verso gli Stati Uniti, nel rispetto delle garanzie
          previste dal GDPR. Maggiori informazioni nella{" "}
          <a href="/cookie">Cookie Policy</a>.
        </p>
      </section>

      <section>
        <h2>6. I tuoi diritti</h2>
        <p>
          Hai diritto di accedere ai tuoi dati, chiederne la rettifica o la
          cancellazione, limitarne o opporti al trattamento, e alla portabilità
          dei dati (artt. 15-22 GDPR). Puoi esercitare questi diritti scrivendo a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          Hai inoltre diritto di proporre reclamo al Garante per la protezione
          dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
        </p>
      </section>

      <section>
        <h2>7. Cookie</h2>
        <p>
          L&apos;uso dei cookie è descritto nella nostra{" "}
          <a href="/cookie">Cookie Policy</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
