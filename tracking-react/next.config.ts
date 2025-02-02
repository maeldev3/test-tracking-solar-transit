// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export", // Permet d'exporter un site statique
//   trailingSlash: true, // Ajoute un slash à la fin des URLs (optionnel)
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Active l'export statique
  trailingSlash: true, // Ajoute un slash aux URLs (optionnel)
  images: { unoptimized: true }, // Désactive l'optimisation d'images
};

module.exports = nextConfig;
