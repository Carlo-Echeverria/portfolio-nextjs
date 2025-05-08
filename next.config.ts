import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}`, // Reemplaza con tu dominio
        pathname: "/sites/default/files/**",
      },
    ],
  },
};

export default nextConfig;