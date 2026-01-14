import { AnimatedProjectsPage } from "@/components/projects/AnimatedProjectsPage"
import { getProfile } from "@/services/profileService"
import { Project } from "@/types/project"

async function getProjects(): Promise<Project[]> {
  try {
    const profile = await getProfile(3)
    return profile?.relationships?.field_projects?.data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  // Ordenar proyectos por fecha de término (los actuales primero, luego por fecha descendente)
  const sortedProjects = [...projects].sort((a, b) => {
    // Los proyectos actuales van primero
    if (a.attributes.field_is_current && !b.attributes.field_is_current) return -1
    if (!a.attributes.field_is_current && b.attributes.field_is_current) return 1
    
    // Si ambos son actuales o ambos terminaron, ordenar por fecha de término
    const dateA = a.attributes.field_end_date || a.attributes.field_start_date
    const dateB = b.attributes.field_end_date || b.attributes.field_start_date
    
    // Ordenar descendente (más recientes primero)
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return <AnimatedProjectsPage projects={sortedProjects} />
}

export const metadata = {
  title: "Proyectos | Carlo Echeverría - Desarrollador Full Stack | Portfolio",
  description: "Revisa todos los proyectos en los que he trabajado como desarrollador full stack, desde soluciones personalizadas hasta plataformas escalables y modernas.",
  keywords: [
    "proyectos web",
    "portfolio proyectos",
    "desarrollo de aplicaciones",
    "casos de estudio",
    "trabajos realizados",
    "proyectos React",
    "proyectos Next.js",
    "desarrollo frontend",
    "desarrollo backend",
    "sitios web",
    "Carlo Echeverría proyectos"
  ].join(", "),
} 