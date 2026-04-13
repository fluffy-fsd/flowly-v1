"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white bg-[#020617] border-t border-white/10">

      {/* ===================== */}
      {/* MAIN LEGAL FOOTER */}
      {/* ===================== */}

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND / INFO */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="font-bold">F</span>
              </div>
              <span className="font-semibold text-lg">Flowly</span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Flowly est une agence digitale spécialisée dans la conception de solutions web et SaaS.
              Nous respectons les réglementations en vigueur concernant la protection des données.
            </p>

            <p className="text-xs text-slate-500 mt-4">
              © {year} Flowly. Tous droits réservés.
            </p>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-5">
              Légal
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="/mentions-legales" className="hover:text-white transition">
                  Mentions légales
                </a>
              </li>

              <li>
                <a href="/politique-confidentialite" className="hover:text-white transition">
                  Politique de confidentialité (RGPD)
                </a>
              </li>

              <li>
                <a href="/cgu" className="hover:text-white transition">
                  Conditions générales d’utilisation
                </a>
              </li>

              <li>
                <a href="/cookies" className="hover:text-white transition">
                  Gestion des cookies
                </a>
              </li>
            </ul>
          </div>

          {/* DATA / COMPLIANCE */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-5">
              Données & sécurité
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>✔ Conformité RGPD (UE)</li>
              <li>✔ Protection des données utilisateurs</li>
              <li>✔ Hébergement sécurisé</li>
              <li>✔ Aucune revente de données</li>
              <li>✔ Chiffrement des communications</li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-5">
              Informations
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>Entreprise : Flowly</li>
              <li>Activité : Agence digitale</li>
              <li>Zone : International</li>
              <li>Support : contact@flowly.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* COMPLIANCE BAR */}
      {/* ===================== */}

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-slate-500">
            Ce site respecte le Règlement Général sur la Protection des Données (RGPD - UE 2016/679)
          </p>

          <p className="text-xs text-slate-600">
            Dernière mise à jour : {year}
          </p>
        </div>
      </div>
    </footer>
  );
}