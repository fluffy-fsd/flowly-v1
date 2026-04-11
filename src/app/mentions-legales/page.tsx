import Link from "next/link";

export const metadata = {
  title: "Mentions légales — Flowly",
  description: "Mentions légales du site theflowly.fr — Flowly, agence digitale par FStudios & Volostudios.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 pt-24 pb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-flowly-600 hover:text-flowly-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à l&apos;accueil
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Mentions légales</h1>
          <p className="mt-3 text-slate-500">Dernière mise à jour : avril 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed">

          <h2>1. Éditeur du site</h2>
          <p>
            Le site <strong>theflowly.fr</strong> (ci-après « le Site ») est un projet collaboratif édité sous la marque commerciale <strong>Flowly</strong>, portée par les structures suivantes :
          </p>
          <p>
            <strong>FStudios</strong> — Micro-entreprise (EI)<br />
            Dirigeant : Dorian Gosselin<br />
            SIREN : 952 303 832<br />
            Code APE : 6201Z — Programmation informatique<br />
            Siège social : Valenciennes (59), France<br />
            Email : contact@theflowly.fr
          </p>
          <p>
            <strong>Volostudios</strong> — [Structure juridique à compléter]<br />
            Dirigeant : [Nom du dirigeant à compléter]<br />
            SIREN : [À compléter]<br />
            Email : contact@theflowly.fr
          </p>
          <p>
            La direction de la publication est assurée par <strong>Dorian Gosselin</strong>.
          </p>

          <h2>2. Hébergement</h2>
          <p>
            Le Site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>

          <h2>3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur le Site (textes, images, graphismes, logos, icônes, code source, etc.)
            est la propriété exclusive de Flowly (FStudios & Volostudios), sauf mention contraire.
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du Site,
            quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l&apos;autorisation écrite préalable de l&apos;éditeur.
          </p>

          <h2>4. Responsabilité</h2>
          <p>
            L&apos;éditeur s&apos;efforce de fournir des informations aussi précises que possible sur le Site.
            Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes et carences dans la mise à jour,
            qu&apos;elles soient de son fait ou du fait de tiers partenaires qui lui fournissent ces informations.
          </p>
          <p>
            Le Site peut contenir des liens hypertextes vers d&apos;autres sites. L&apos;éditeur ne dispose d&apos;aucun contrôle
            sur le contenu de ces sites et décline toute responsabilité quant à leur contenu.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées sur le Site est détaillé dans notre{" "}
            <Link href="/politique-confidentialite" className="text-flowly-600 hover:text-flowly-700">
              politique de confidentialité
            </Link>.
            Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679)
            et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits d&apos;accès,
            de rectification, d&apos;effacement, de limitation, de portabilité et d&apos;opposition sur vos données personnelles.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous : <strong>contact@theflowly.fr</strong>
          </p>

          <h2>6. Cookies</h2>
          <p>
            Le Site peut utiliser des cookies techniques strictement nécessaires à son bon fonctionnement.
            Aucun cookie publicitaire ou de suivi n&apos;est utilisé sans votre consentement préalable.
            Pour plus d&apos;informations, consultez notre politique de confidentialité.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français.
            En cas de litige, les tribunaux compétents seront ceux de Valenciennes.
          </p>
        </div>
      </div>
    </main>
  );
}
