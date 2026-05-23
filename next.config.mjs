/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statico per servire da nginx su VPS Aruba.
  // L'output finisce in ./out/ ed e' un sito statico puro.
  output: "export",
  // Trailing slash per compatibilita' con nginx try_files
  trailingSlash: false,
  // Niente image optimization (richiede server Node) — usiamo img tag.
  images: { unoptimized: true },
};

export default nextConfig;
