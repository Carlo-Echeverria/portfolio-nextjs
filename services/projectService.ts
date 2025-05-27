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

        // Tech Satcks
        const techStacksIds = project?.relationships.field_tech_stacks.data.map(
          (stack: { id: string }) => stack.id
        );

        // Roles
        const rolesIds = project?.relationships.field_roles.data.map(
          (stack: { id: string }) => stack.id
        );

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
            body: {
              value: project.attributes.body?.value,
              summary: project.attributes.body?.summary,
            },
            field_start_date: project.attributes.field_start_date,
            field_end_date: project.attributes.field_end_date,
            field_is_current: project.attributes.field_is_current,
            field_taks: project.attributes.field_taks,
          },
          relationships: {
            field_gallery: {
              data: await getImages(galleryIds),
            },
            field_thumbnail: {
              data: await getImages([thumbnailsId]),
            },
            field_tech_stacks: {
              data: await getTechStacks(techStacksIds)
            },
            field_roles: {
              data: await getRoles(rolesIds)
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