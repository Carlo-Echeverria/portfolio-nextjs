import { getMenuItems } from "@/services/menuService"
import { MobileMenuContent } from "./MobileMenuContent"

export async function MobileMenu() {
  const menuItems = await getMenuItems()

  return <MobileMenuContent menuItems={menuItems} />
}
