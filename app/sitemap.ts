import { MetadataRoute } from 'next'
import { getProfile } from '@/services/profileService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Páginas de proyectos dinámicas
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const profile = await getProfile(3)
    const projects = profile?.relationships?.field_projects?.data || []
    
    projectPages = projects
      .filter(project => project.attributes.path?.alias)
      .map((project) => ({
        url: `${baseUrl}${project.attributes.path.alias}`,
        lastModified: new Date(project.attributes.field_start_date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  // Páginas de artículos del blog (si tienes artículos locales)
  // Nota: Como los artículos vienen de dev.to, podrías querer incluirlos
  // solo si los tienes almacenados localmente
  const blogPages: MetadataRoute.Sitemap = []

  return [...staticPages, ...projectPages, ...blogPages]
} 