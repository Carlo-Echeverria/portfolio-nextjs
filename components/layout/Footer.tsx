import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Profile } from "@/types/profile"

export function Footer({ profile }: { profile?: Profile }) {
  const email = profile?.attributes?.field_email || "contacto@ejemplo.com"
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Desarrollando experiencias digitales excepcionales</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
            <Link href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-foreground">
              {email}
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Portfolio Personal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
