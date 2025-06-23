import { Metadata } from 'next'

// Keywords base para el sitio
export const BASE_KEYWORDS = [
  "desarrollador full stack",
  "desarrollo web",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "portfolio",
  "desarrollador web",
  "programador",
  "frontend",
  "backend",
  "aplicaciones web",
  "tecnología",
  "software development",
  "web development",
  "Carlo Echeverría"
]

// Keywords específicos por página
export const PAGE_KEYWORDS = {
  home: [
    ...BASE_KEYWORDS,
    "inicio",
    "portfolio personal",
    "desarrollador profesional"
  ],
  projects: [
    ...BASE_KEYWORDS,
    "proyectos web",
    "portfolio proyectos",
    "desarrollo de aplicaciones web",
    "casos de estudio",
    "trabajos realizados",
    "proyectos React",
    "proyectos Next.js",
    "desarrollo frontend",
    "desarrollo backend",
    "sitios web"
  ],
  blog: [
    ...BASE_KEYWORDS,
    "blog desarrollo web",
    "artículos tecnología",
    "desarrollo software",
    "programación",
    "React tutoriales",
    "Next.js tutoriales",
    "buenas prácticas",
    "dev.to",
    "comunidad desarrolladores"
  ],
  about: [
    ...BASE_KEYWORDS,
    "sobre mí",
    "experiencia",
    "habilidades",
    "formación",
  ],
  contact: [
    ...BASE_KEYWORDS,
    "contacto",
    "contratar desarrollador",
    "freelance",
    "trabajo remoto",
    "colaboración"
  ]
}

// Función para generar metadata base
export function generateBaseMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: "Carlo Echeverría - Desarrollador Full Stack | Portfolio",
    description: "Portafolio de Carlo Echeverría, desarrollador full stack con más de 7 años de experiencia creando aplicaciones web modernas, eficientes y escalables.",
    keywords: BASE_KEYWORDS.join(", "),
    authors: [{ name: "Carlo Echeverría" }],
    creator: "Carlo Echeverría",
    publisher: "Carlo Echeverría",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...overrides,
  }
}

// Función para generar metadata de página específica
export function generatePageMetadata(
  page: keyof typeof PAGE_KEYWORDS,
  overrides: Partial<Metadata> = {}
): Metadata {
  const pageKeywords = PAGE_KEYWORDS[page]
  
  return generateBaseMetadata({
    keywords: pageKeywords.join(", "),
    ...overrides,
  })
}

// Función para generar metadata de artículo
export function generateArticleMetadata(
  title: string,
  description: string,
  tags: string[],
  publishedAt: string,
  overrides: Partial<Metadata> = {}
): Metadata {
  const articleKeywords = [
    ...tags,
    "artículo desarrollo",
    "blog tecnología",
    "Carlo Echeverría",
    "desarrollo web"
  ]

  return {
    title: `${title} | Carlo Echeverría - Desarrollador Full Stack | Portfolio`,
    description,
    keywords: articleKeywords.join(", "),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      authors: ["Carlo Echeverría"],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...overrides,
  }
}