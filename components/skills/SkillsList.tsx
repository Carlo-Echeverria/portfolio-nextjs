"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skill } from "@/types/skill"
import { TechnicalSkills } from "./TechnicalSkills"
import { SoftSkills } from "./SoftSkills"
import { MethodologySkills } from "./MethodologySkills"

interface SkillsListProps {
  skills: Skill[]
}

export function SkillsList({ skills }: SkillsListProps) {
  return (
    <Tabs defaultValue="technical" className="w-full">
      <TabsList className="w-full flex flex-wrap justify-center mb-8 h-auto p-1 bg-muted/50">
        <TabsTrigger value="technical" className="flex-grow">
          Habilidades Técnicas
        </TabsTrigger>
        <TabsTrigger value="soft" className="flex-grow">
          Habilidades Blandas
        </TabsTrigger>
        <TabsTrigger value="methodologies" className="flex-grow">
          Metodologías
        </TabsTrigger>
      </TabsList>

      <TabsContent value="technical" className="mt-0">
        <TechnicalSkills skills={skills} />
      </TabsContent>

      <TabsContent value="soft" className="mt-0">
        <SoftSkills skills={skills} />
      </TabsContent>

      <TabsContent value="methodologies" className="mt-0">
        <MethodologySkills skills={skills} />
      </TabsContent>
    </Tabs>
  )
} 