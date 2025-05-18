import { Project } from '@/types/project';
import { Image as ImageType } from '@/types/file';
import { getImages } from '@/services/fileService';
import { getTechStacks } from '@/services/techStackService';
import { getRoles } from '@/services/roleService';
import { getProjectTypes } from '@/services/projectTypeService';

export const getProjects = async (projectIds: string[]): Promise<Project[]>  => {
  if (!projectIds || projectIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    projectIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/project?${queryParams.toString()}`
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
        const gallery = await getImages(galleryIds);
        
        // Thumbnail
        const thumbnailsId = (project?.relationships.field_thumbnail?.data as ImageType)?.id || "";
        const thumbnail = await getImages([thumbnailsId]);

        // Tech Satcks
        const techStacksIds = project?.relationships.field_tech_stacks.data.map(
          (stack: { id: string }) => stack.id
        );
        const techStacks = await getTechStacks(techStacksIds);

        // Roles
        const rolesIds = project?.relationships.field_roles.data.map(
          (stack: { id: string }) => stack.id
        );
        const roles = await getRoles(rolesIds);

        // Project Types
        const projectTypesIds = project?.relationships.field_project_types.data.map(
          (type: { id: string }) => type.id
        );
        const projectTypes = await getProjectTypes(projectTypesIds);

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
              data: gallery,
            },
            field_thumbnail: {
              data: thumbnail,
            },
            field_tech_stacks: {
              data: techStacks
            },
            field_roles: {
              data: roles
            },
            field_project_types: {
              data: projectTypes
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