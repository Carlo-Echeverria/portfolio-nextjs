import { Experience } from "@/types/experience"
import { TimelineExperience } from "./TimelineExperience"

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section id="experience" className="relative py-16 scroll-mt-[100px]">
      <div className="container px-4 md:px-6">
        <TimelineExperience experiences={experiences} />
      </div>
    </section>
  )
}