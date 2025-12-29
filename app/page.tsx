import { Skill } from "@/types/skill"
import { Experience } from "@/types/experience"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { BlogSection } from "@/components/sections/BlogSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { getProfile } from "@/services/profileService"

export default async function Home() {
  // Obtener datos del perfil
  const profile = await getProfile(3)
  const skills : Skill[] = profile?.relationships?.field_skills?.data
  const experiences: Experience[] = profile?.relationships?.field_experiences?.data || []

  return (
    <main className="overflow-x-hidden md:overflow-x-auto">
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skills={skills} />
      {/* <BlogSection /> */}
      <ContactSection profile={profile} />
    </main>
  )
}
