import { Project } from '@/types/project';
import { Image as ImageType } from '@/types/file';
import { getImages } from '@/services/fileService';
import { getTechStacks } from '@/services/techStackService';
import { getRoles } from '@/services/roleService';
import { getProjectTypes } from '@/services/projectTypeService';
import { getAuthenticatedHeaders } from '@/services/authService';

export const getProjects = async (projectIds: string[]): Promise<Project[]>  => {
  if (!projectIds || projectIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    projectIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/project?${queryParams.toString()}`, {
        headers,
        next: {
          revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_APP || '0'),
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching projects');
    }

    const data = await response.json();

    const projects: Project[] = await Promise.all(
      data.data.map(async (project: Project) => {
        // Gallery
        const galleryIds = project?.relationships.field_gallery.data.map(
          (image: { id: string }) => image.id
        );
        
        // Thumbnail
        const thumbnailsId = (project?.relationships.field_thumbnail?.data as ImageType)?.id || "";

        // Hero Image
        const heroImageId = (project?.relationships.field_project_hero?.data as ImageType)?.id || "";

        // Diagrams
        const diagramsIds = project?.relationships.field_diagrams?.data?.map(
          (image: { id: string }) => image.id
        ) || [];

        // Tech Stacks
        const techStacksIds = project?.relationships.field_tech_stacks.data.map(
          (stack: { id: string }) => stack.id
        );

        // Backend Stack
        const backendStackIds = project?.relationships.field_backend_stack?.data?.map(
          (stack: { id: string }) => stack.id
        ) || [];

        // Frontend Stack
        const frontendStackIds = project?.relationships.field_frontend_stack?.data?.map(
          (stack: { id: string }) => stack.id
        ) || [];

        // Tools and Platforms
        const toolsPlatformsIds = project?.relationships.field_tools_platforms?.data?.map(
          (stack: { id: string }) => stack.id
        ) || [];

        // Roles
        const rolesIds = project?.relationships.field_roles.data.map(
          (stack: { id: string }) => stack.id
        );

        // Main Role
        const mainRoleId = (project?.relationships.field_main_role?.data as { id: string })?.id || "";

        // Project Types
        const projectTypesIds = project?.relationships.field_project_types.data.map(
          (type: { id: string }) => type.id
        );

        const dataProject: Project = {
          id: project.id,
          attributes: {
            title: project.attributes.title,
            drupal_internal__nid: project.attributes.drupal_internal__nid,
            langcode: project.attributes.langcode,
            status: project.attributes.status,
            path: {
              alias: project.attributes.path.alias,
            },
            body: {
              value: project.attributes.body?.value,
              summary: project.attributes.body?.summary,
            },
            // Información Básica
            field_summary: project.attributes.field_summary,
            field_objective: project.attributes.field_objective,
            field_sector: project.attributes.field_sector,
            field_project_status: project.attributes.field_project_status,
            // Fechas y Período
            field_start_date: project.attributes.field_start_date,
            field_end_date: project.attributes.field_end_date,
            field_is_current: project.attributes.field_is_current,
            // Equipo y Metodología
            field_team_composition: Array.isArray(project.attributes.field_team_composition)
              ? project.attributes.field_team_composition
              : project.attributes.field_team_composition
                ? [project.attributes.field_team_composition]
                : undefined,
            field_methodology: Array.isArray(project.attributes.field_methodology)
              ? project.attributes.field_methodology
              : project.attributes.field_methodology
                ? [project.attributes.field_methodology]
                : undefined,
            // Tareas y Responsabilidades
            field_taks: project.attributes.field_taks || [],
            field_responsibilities: Array.isArray(project.attributes.field_responsibilities)
              ? project.attributes.field_responsibilities
              : project.attributes.field_responsibilities
                ? [project.attributes.field_responsibilities]
                : undefined,
            // Contenido Detallado
            field_project_context: project.attributes.field_project_context,
            field_challenges: Array.isArray(project.attributes.field_challenges)
              ? project.attributes.field_challenges
              : project.attributes.field_challenges
                ? [project.attributes.field_challenges]
                : undefined,
            field_solutions: Array.isArray(project.attributes.field_solutions)
              ? project.attributes.field_solutions
              : project.attributes.field_solutions
                ? [project.attributes.field_solutions]
                : undefined,
            field_features: Array.isArray(project.attributes.field_features)
              ? project.attributes.field_features
              : project.attributes.field_features
                ? [project.attributes.field_features]
                : undefined,
            field_architecture: project.attributes.field_architecture,
            // Resultados e Impacto
            field_results: project.attributes.field_results,
            field_success_metrics: project.attributes.field_success_metrics,
            field_technical_impact: project.attributes.field_technical_impact,
            field_lessons_learned: project.attributes.field_lessons_learned,
            // Integraciones
            field_integrations: Array.isArray(project.attributes.field_integrations)
              ? project.attributes.field_integrations
              : project.attributes.field_integrations
                ? [project.attributes.field_integrations]
                : undefined,
            // Enlaces y Recursos
            field_project_url: (project.attributes.field_project_url as any)?.uri || 
              (typeof project.attributes.field_project_url === 'string' ? project.attributes.field_project_url : undefined),
            field_repository_url: (project.attributes.field_repository_url as any)?.uri || 
              (typeof project.attributes.field_repository_url === 'string' ? project.attributes.field_repository_url : undefined),
            field_case_study_url: (project.attributes.field_case_study_url as any)?.uri || 
              (typeof project.attributes.field_case_study_url === 'string' ? project.attributes.field_case_study_url : undefined),
            field_technical_docs_url: (project.attributes.field_technical_docs_url as any)?.uri || 
              (typeof project.attributes.field_technical_docs_url === 'string' ? project.attributes.field_technical_docs_url : undefined),
            // SEO y Metadata
            field_meta_description: project.attributes.field_meta_description,
            field_keywords: project.attributes.field_keywords,
            field_featured: project.attributes.field_featured,
            field_weight: project.attributes.field_weight,
            field_display_priority: project.attributes.field_display_priority,
          },
          relationships: {
            field_gallery: {
              data: await getImages(galleryIds),
            },
            field_thumbnail: {
              data: thumbnailsId ? (await getImages([thumbnailsId]))[0] || {} : {},
            },
            field_project_hero: {
              data: heroImageId ? (await getImages([heroImageId]))[0] || {} : {},
            },
            field_diagrams: {
              data: await getImages(diagramsIds),
            },
            field_tech_stacks: {
              data: await getTechStacks(techStacksIds)
            },
            field_backend_stack: {
              data: await getTechStacks(backendStackIds)
            },
            field_frontend_stack: {
              data: await getTechStacks(frontendStackIds)
            },
            field_tools_platforms: {
              data: await getTechStacks(toolsPlatformsIds)
            },
            field_roles: {
              data: await getRoles(rolesIds)
            },
            field_main_role: {
              data: mainRoleId ? (await getRoles([mainRoleId]))[0] || {} : {}
            },
            field_project_types: {
              data: await getProjectTypes(projectTypesIds)
            }
          },
        };

        return dataProject;
      })
    );

    return projects;
  } catch (error) {
    console.error('Error in fetching projects:', error);
    return [];
  }
};