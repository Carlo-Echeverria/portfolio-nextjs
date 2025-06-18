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

  return <AnimatedProjectsPage projects={projects} />
}

export const metadata = {
  title: "Proyectos | Carlo Echeverría - Desarrollador Full Stack",
  description: "Todos los proyectos en los que he trabajado como desarrollador",
} 