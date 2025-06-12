import { getMenuItems } from "@/services/menuService"
import { NavLink } from "./NavLink"

interface ServerMenuProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export async function ServerMenu({ 
  className = "",
  orientation = 'horizontal'
}: ServerMenuProps) {
  const menuItems = await getMenuItems()
  
  const isHorizontal = orientation === 'horizontal'
  const containerClasses = isHorizontal 
    ? "flex items-center gap-6" 
    : "flex flex-col items-center gap-8"

  return (
    <nav className={`${containerClasses} ${className}`}>
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          href={item.url}
          label={item.title}
        />
      ))}
    </nav>
  )
} 