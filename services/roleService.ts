import { normalizeRole } from "@/normalizers/roleNormalizer";
import { Role } from '@/types/role';

export const getRoles = async (roleIds: string[]): Promise<Role[]> => {
  if (!roleIds || roleIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    roleIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/roles?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching roles');
    }

    const data = await response.json();
    
    const roles : Role[] = []

    data.data.map((role: Role)=> {
      const dataRole : Role = {
        id: role.id,
        attributes: {
          name: role.attributes.name,
          drupal_internal__tid: role.attributes.drupal_internal__tid,
          langcode: role.attributes.langcode,
          status: role.attributes.status,
          description: role.attributes.description,
        }
      };
      roles.push(normalizeRole(dataRole));
    })

    return roles;
  } catch (error) {
    console.error('Error in fetching roles:', error);
    return [];
  }
};