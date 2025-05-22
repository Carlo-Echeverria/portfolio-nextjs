"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface SkillCardProps {
  title: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SkillCard({ title, icon: Icon, children, className = "", delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {Icon && <Icon className="h-6 w-6" />}
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
} 