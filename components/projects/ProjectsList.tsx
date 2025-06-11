"use client"

import { Project } from "@/types/project"
import { ProjectCard } from "@/components/projects/ProjectCard"

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  )
} 