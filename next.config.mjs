/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Excluir jsdom e isomorphic-dompurify del bundle del servidor para evitar el error de default-stylesheet.css
  // jsdom (usado por isomorphic-dompurify) intenta leer un archivo CSS que no existe durante el build
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
  // Configuración de Turbopack (Next.js 16 usa Turbopack por defecto)
  // El serverExternalPackages ya maneja la externalización de isomorphic-dompurify
  turbopack: {
    // Configuración vacía para silenciar el error de webpack config
    // serverExternalPackages ya maneja la externalización necesaria
  },
}

export default nextConfig
