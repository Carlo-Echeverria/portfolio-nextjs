import { normalizeProjectType } from "@/normalizers/projectTypeNormalizer";
import { ProjectType } from '@/types/project_type';
import { getAuthenticatedHeaders } from '@/services/authService';

export const getProjectTypes = async (projectTypeIds: string[]): Promise<ProjectType[]> => {
  if (!projectTypeIds || projectTypeIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    projectTypeIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/project_types?${queryParams.toString()}`, {
        headers,
        next: {
          revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_APP || '0'),
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching project types');
    }

    const data = await response.json();
    
    const roles : ProjectType[] = []

    data.data.map((type: ProjectType)=> {
      const dataProjectType : ProjectType = {
        id: type.id,
        attributes: {
          name: type.attributes.name,
          drupal_internal__tid: type.attributes.drupal_internal__tid,
          langcode: type.attributes.langcode,
          status: type.attributes.status,
          description: type.attributes.description,
        }
      };
      roles.push(normalizeProjectType(dataProjectType));
    })

    return roles;
  } catch (error) {
    console.error('Error in fetching project types:', error);
    return [];
  }
};