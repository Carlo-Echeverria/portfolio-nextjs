/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuración para generación estática
  experimental: {
    // Optimizar la generación estática
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Configurar compresión para archivos estáticos
  compress: true,
}

export default nextConfig
