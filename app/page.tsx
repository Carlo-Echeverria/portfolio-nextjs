import { Skill } from "@/types/skill"
import { Experience } from "@/types/experience"
import { Project } from "@/types/project"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { BlogSection } from "@/components/sections/BlogSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { getProfile } from "@/services/profileService"

export default async function Home() {
  // Obtener datos del perfil
  const profile = await getProfile(3)
  const skills : Skill[] = profile?.relationships?.field_skills?.data
  const experiences: Experience[] = profile?.relationships?.field_experiences?.data || []
  const projects: Project[] = profile?.relationships?.field_projects?.data || []

  // Ordenar experiencias por fecha de término (las actuales primero, luego por fecha descendente)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Las experiencias actuales van primero
    if (a.attributes.field_is_current && !b.attributes.field_is_current) return -1
    if (!a.attributes.field_is_current && b.attributes.field_is_current) return 1
    
    // Si ambas son actuales o ambas terminaron, ordenar por fecha de término
    const dateA = a.attributes.field_end_date || a.attributes.field_start_date
    const dateB = b.attributes.field_end_date || b.attributes.field_start_date
    
    // Ordenar descendente (más recientes primero)
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

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

  return (
    <main className="overflow-x-hidden md:overflow-x-auto">
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={sortedExperiences} />
      <ProjectsSection projectsProps={sortedProjects} />
      <SkillsSection skills={skills} />
      <BlogSection />
      <ContactSection profile={profile} />
    </main>
  )
}
