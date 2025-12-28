import { createRequire } from 'module'
const require = createRequire(import.meta.url)

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
  // Excluir jsdom e isomorphic-dompurify del bundle del servidor para evitar el error de default-stylesheet.css
  // jsdom (usado por isomorphic-dompurify) intenta leer un archivo CSS que no existe durante el build
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
  // Configuración de webpack para reemplazar isomorphic-dompurify con un stub en el servidor
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // Reemplazar isomorphic-dompurify con un stub en el servidor
      // Esto evita que jsdom se inicialice y busque default-stylesheet.css
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^isomorphic-dompurify$/,
          (resource) => {
            resource.request = require.resolve('./lib/dompurify-stub.js')
          }
        )
      )
    }
    return config
  },
}

export default nextConfig
