import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — Flowly",
  description: "Politique de confidentialité et traitement des données personnelles — Flowly.",
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-24 pb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-flowly-600 hover:text-flowly-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l&apos;accueil
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Politique de confidentialité</h1>
          <p className="mt-3 text-slate-500">Dernière mise à jour : avril 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed">

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles collectées sur le site theflowly.fr est :<br />
            <strong>Flowly</strong> (FStudios — Dorian Gosselin, SIREN 952 303 832)<br />
            Email : contact@theflowly.fr<br />
            Adresse : Valenciennes (59), France
          </p>

          <h2>2. Données collectées</h2>
          <p>
            Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de devis ou de contact :
            nom, prénom, adresse email, nom d&apos;entreprise (optionnel), description du projet et budget indicatif.
            Aucune donnée n&apos;est collectée automatiquement en dehors des cookies techniques strictement nécessaires.
          </p>

          <h2>3. Finalités du traitement</h2>
          <p>
            Les données collectées sont traitées pour les finalités suivantes :
          </p>
          <p>
            — Répondre à vos demandes de devis et de renseignements<br />
            — Assurer le suivi commercial de votre projet<br />
            — Vous envoyer des communications relatives à votre demande<br />
            — Améliorer nos services et l&apos;expérience utilisateur du Site
          </p>

          <h2>4. Base juridique</h2>
          <p>
            Le traitement de vos données repose sur votre consentement (article 6.1.a du RGPD) lors de la soumission
            du formulaire de devis, ainsi que sur l&apos;intérêt légitime de Flowly à répondre aux demandes reçues
            (article 6.1.f du RGPD).
          </p>

          <h2>5. Destinataires des données</h2>
          <p>
            Vos données personnelles sont strictement réservées à l&apos;usage interne de Flowly (FStudios & Volostudios).
            Elles ne sont jamais vendues, louées ou cédées à des tiers, sauf obligation légale.
          </p>

          <h2>6. Durée de conservation</h2>
          <p>
            Les données collectées via le formulaire de devis sont conservées pendant une durée maximale de 36 mois
            à compter de votre dernier contact avec nous, sauf obligation légale contraire ou demande de suppression
            de votre part.
          </p>

          <h2>7. Vos droits</h2>
          <p>
            Conformément au RGPD (Règlement UE 2016/679, articles 15 à 21) et à la loi Informatique et Libertés,
            vous disposez des droits suivants :
          </p>
          <p>
            — <strong>Droit d&apos;accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie<br />
            — <strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes<br />
            — <strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données<br />
            — <strong>Droit de limitation</strong> : limiter le traitement dans certains cas<br />
            — <strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré<br />
            — <strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à : <strong>contact@theflowly.fr</strong><br />
            Nous répondons à toute demande dans un délai de 30 jours.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Le Site utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement
            (cookies de session, préférences d&apos;affichage). Aucun cookie publicitaire, analytique ou de suivi
            tiers n&apos;est déposé sans votre consentement explicite préalable.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Flowly met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger
            vos données personnelles contre tout accès non autorisé, perte, altération ou divulgation.
            Le Site est protégé par un certificat SSL garantissant le chiffrement des échanges.
          </p>

          <h2>10. Réclamation</h2>
          <p>
            Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD,
            vous avez le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique
            et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-flowly-600 hover:text-flowly-700">www.cnil.fr</a>
          </p>

          <h2>11. Modifications</h2>
          <p>
            Flowly se réserve le droit de modifier la présente politique de confidentialité à tout moment.
            Toute modification sera publiée sur cette page avec la date de mise à jour.
          </p>
        </div>
      </div>
    </main>
  );
}
