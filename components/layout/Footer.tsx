import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Profile } from "@/types/profile"
import Image from "next/image"

export function Footer({ profile }: { profile?: Profile }) {
  const email = profile?.attributes?.field_email || "contacto@ejemplo.com"
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <Link href="/" className="text-xl font-bold">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mx-auto md:mx-0" />
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4">
              <Link
                href="https://github.com/beriliox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/carloecheverriafuentes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/carloalbert92"
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
          <p>&copy; {currentYear} Carlo Echeverría | Desarrollador Web Full Stack. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
