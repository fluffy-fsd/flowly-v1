import Link from "next/link";

export const metadata = {
  title: "Conditions Générales d'Utilisation — Flowly",
  description: "CGU du site theflowly.fr — Flowly, agence digitale par FStudios & Volostudios.",
};

export default function ConditionsUtilisation() {
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
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">Conditions Générales d&apos;Utilisation</h1>
          <p className="mt-3 text-slate-500">Dernière mise à jour : avril 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed">

          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont pour objet de définir
            les conditions d&apos;accès et d&apos;utilisation du site theflowly.fr (ci-après « le Site »),
            édité par Flowly (FStudios & Volostudios).
            L&apos;accès au Site implique l&apos;acceptation pleine et entière des présentes CGU.
          </p>

          <h2>2. Accès au Site</h2>
          <p>
            Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet.
            L&apos;éditeur met en œuvre tous les moyens raisonnables pour assurer un accès de qualité au Site,
            mais n&apos;est tenu à aucune obligation de résultat. L&apos;accès au Site peut être interrompu à tout moment
            pour des raisons de maintenance, de mise à jour ou pour toute autre raison, sans que cela ne puisse
            donner lieu à une quelconque indemnisation.
          </p>

          <h2>3. Services proposés</h2>
          <p>
            Le Site présente les services de création digitale proposés par Flowly : conception de sites web,
            développement d&apos;applications SaaS, développement d&apos;applications mobiles et prestations connexes.
            Les tarifs affichés sur le Site sont indicatifs et exprimés en euros hors taxes (€ HT).
            Le tarif définitif est établi sur devis personnalisé en fonction des spécificités de chaque projet.
            Les prix affichés ne constituent pas une offre contractuelle au sens juridique du terme.
          </p>

          <h2>4. Demande de devis</h2>
          <p>
            L&apos;utilisateur peut soumettre une demande de devis via le formulaire prévu à cet effet sur le Site.
            Cette demande ne constitue pas un engagement contractuel. Un devis détaillé sera adressé à l&apos;utilisateur
            par email dans un délai raisonnable. Le contrat de prestation n&apos;est formé qu&apos;à la signature expresse
            du devis par les deux parties.
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments du Site (textes, images, vidéos, logos, code source, maquettes, animations)
            est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction, représentation,
            utilisation ou adaptation, sous quelque forme que ce soit, de tout ou partie de ces éléments,
            sans l&apos;accord préalable et écrit de Flowly, est strictement interdite et constitue une contrefaçon
            sanctionnée par les articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
          </p>

          <h2>6. Responsabilité de l&apos;utilisateur</h2>
          <p>
            L&apos;utilisateur s&apos;engage à utiliser le Site de manière conforme aux présentes CGU et à la législation en vigueur.
            Il s&apos;interdit notamment de tenter d&apos;accéder de manière non autorisée aux systèmes informatiques du Site,
            de transmettre des contenus illicites ou nuisibles via les formulaires, et de porter atteinte
            au bon fonctionnement du Site.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            Flowly ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation
            du Site ou de l&apos;impossibilité d&apos;y accéder, ni des dommages liés à l&apos;utilisation de sites tiers
            accessibles via des liens hypertextes présents sur le Site.
          </p>

          <h2>8. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre{" "}
            <Link href="/politique-confidentialite" className="text-flowly-600 hover:text-flowly-700">
              politique de confidentialité
            </Link>
            , conformément au RGPD et à la loi Informatique et Libertés.
          </p>

          <h2>9. Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens vers des sites tiers. Flowly n&apos;exerce aucun contrôle sur ces sites
            et décline toute responsabilité quant à leur contenu, leurs pratiques ou leur politique de confidentialité.
          </p>

          <h2>10. Modification des CGU</h2>
          <p>
            Flowly se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet
            dès leur publication sur le Site. L&apos;utilisateur est invité à consulter régulièrement cette page.
          </p>

          <h2>11. Droit applicable et juridiction compétente</h2>
          <p>
            Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation
            ou à leur exécution relève de la compétence exclusive des tribunaux de Valenciennes.
          </p>
        </div>
      </div>
    </main>
  );
}
