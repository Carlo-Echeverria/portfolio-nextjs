import Link from "next/link"
import { HeaderClient, HeaderControls } from "./HeaderClient"
import { ServerMenu } from "./ServerMenu"

export async function Header() {
  return (
    <HeaderClient>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Navegación de escritorio */}
        <ServerMenu className="hidden md:flex" />

        <HeaderControls />
      </div>
    </HeaderClient>
  )
}
