import { Organization } from '@/types/organization';
import { getAuthenticatedHeaders } from '@/services/authService';

export const getOrganizations = async (organizationIds: string[]): Promise<Organization[]>  => {
  if (!organizationIds || organizationIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    organizationIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/organization?${queryParams.toString()}`, {
        headers,
        next: {
          revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_APP || '0'),
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching organizations');
    }

    const data = await response.json();

    const organizations: Organization[] = await Promise.all(
      data.data.map(async (organization: Organization) => {
        const dataOrganization: Organization = {
          id: organization.id,
          attributes: {
            title: organization.attributes.title,
            langcode: organization.attributes.langcode,
            drupal_internal__nid: organization.attributes.drupal_internal__nid,
            status: organization.attributes.status,
            path: {
              alias: organization.attributes.path.alias,
            },
            body: {
              value: organization.attributes.body?.value,
              summary: organization.attributes.body?.summary,
            },
            field_website: organization.attributes.field_website,
          }
        };

        return dataOrganization;
      })
    );

    return organizations;
  } catch (error) {
    console.error('Error in fetching organizations:', error);
    return [];
  }
};