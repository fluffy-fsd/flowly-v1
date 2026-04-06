module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fstudios.fr",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }, { userAgent: "GPTBot", disallow: "/" }, { userAgent: "CCBot", disallow: "/" }],
  },
};
