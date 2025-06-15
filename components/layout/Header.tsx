import Link from "next/link"
import { HeaderClient, HeaderControls } from "./HeaderClient"
import { ServerMenu } from "./ServerMenu"
import Image from "next/image"

export async function Header() {
  return (
    <HeaderClient>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>

        {/* Navegación de escritorio */}
        <ServerMenu className="hidden md:flex" />

        <HeaderControls />
      </div>
    </HeaderClient>
  )
}
