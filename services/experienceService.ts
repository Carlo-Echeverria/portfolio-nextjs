import { Experience } from '@/types/experience';
import { getTechStacks } from '@/services/techStackService';
import { getRoles } from '@/services/roleService';
import { getAuthenticatedHeaders } from '@/services/authService';
import { getImages } from '@/services/fileService';
import { getOrganizations } from '@/services/organizationService';
import { Image as ImageType } from '@/types/file';
import { Organization } from '@/types/organization';

export const getExperiences = async (experienceIds: string[]): Promise<Experience[]>  => {
  if (!experienceIds || experienceIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    experienceIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/experience?sort=field_end_date&${queryParams.toString()}`, {
        headers,
        next: {
          revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_APP || '0'),
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching experiences');
    }

    const data = await response.json();

    const experiences: Experience[] = await Promise.all(
      data.data.map(async (experience: Experience) => {
        // Tech Satcks
        const techStacksIds = experience?.relationships.field_tech_stacks.data.map(
          (stack: { id: string }) => stack.id
        );

        // Roles
        const rolesIds = experience?.relationships.field_roles.data.map(
          (stack: { id: string }) => stack.id
        );

        // Gallery
        const galleryIds = experience?.relationships.field_gallery.data.map(
          (stack: { id: string }) => stack.id
        );
        
        // Thumbnail
        const thumbnailsId = (experience?.relationships.field_thumbnail.data as ImageType)?.id || "";

        // Organization
        const organizationId = (experience?.relationships.field_organization.data as Organization)?.id || "";

        const dataExperience: Experience = {
          id: experience.id,
          attributes: {
            title: experience.attributes.title,
            drupal_internal__nid: experience.attributes.drupal_internal__nid,
            langcode: experience.attributes.langcode,
            status: experience.attributes.status,
            path: {
              alias: experience.attributes.path.alias,
            },
            body: {
              value: experience.attributes.body?.value,
              summary: experience.attributes.body?.summary,
            },
            field_start_date: experience.attributes.field_start_date,
            field_end_date: experience.attributes.field_end_date,
            field_is_current: experience.attributes.field_is_current,
            field_tasks: experience.attributes.field_tasks,
          },
          relationships: {
            field_tech_stacks: {
              data: await getTechStacks(techStacksIds)
            },
            field_roles: {
              data: await getRoles(rolesIds)
            },
            field_gallery: {
              data: await getImages(galleryIds),
            },
            field_thumbnail: {
              data: await getImages([thumbnailsId]),
            },
            field_organization: {
              data: await getOrganizations([organizationId]),
            },
          },
        };

        return dataExperience;
      })
    );

    return experiences;
  } catch (error) {
    console.error('Error in fetching experiences:', error);
    return [];
  }
};