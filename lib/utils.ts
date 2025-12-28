import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Función para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Importar DOMPurify - será reemplazado por un stub en el servidor mediante webpack
// En el servidor, el stub retornará HTML sin sanitizar
// En el cliente, se usará DOMPurify real
import DOMPurify from 'isomorphic-dompurify'

// Función para sanitizar HTML
export function sanitizeHtml(html = ""): string {
  if (!html) return ""
  
  try {
    // En el servidor, DOMPurify será el stub que retorna HTML sin sanitizar
    // En el cliente, DOMPurify será el real que sanitiza el HTML
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        "p",
        "b",
        "i",
        "em",
        "strong",
        "a",
        "ul",
        "ol",
        "li",
        "br",
        "span",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
    })
  } catch (error) {
    console.error("Error sanitizing HTML:", error)
    return html
  }
}
