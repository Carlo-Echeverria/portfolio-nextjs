import { Profile } from '@/app/types/profile';
import { getFile } from '@/app/services/fileService';

export const getProfile = async () => {
  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/profile?filter[nid]=3`);
    if (!response.ok) throw new Error(`Error fetching profile`);
    let data = await response.json();

    data = data.data[0];

    console.log(data);
    
    const nodeId = data.attributes.drupal_internal__nid
    const photo = await getFile(5);
    
    let dataProfile: Profile = {
      attributes: {
        title: data.attributes.title,
        drupal_internal__nid: nodeId,
        body: {
          value: data.attributes.body.value,
          summary: data.attributes.body.summary,
        },
        field_email: data.attributes.field_email,
        field_phone: data.attributes.field_phone,
        field_title: data.attributes.field_title,
      },
      relationships: {
        field_skills: {
          data: data.relationships.field_skills.data
        },
        field_education: {
          data: data.relationships.field_education.data
        },
        field_photo: {
          url: ("url" in photo) ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${photo.url}` : ''
        },
        field_photo2: {
          data: data.relationships.field_photo.data
        },
        field_projects: {
          data: data.relationships.field_projects.data
        },
      }
    }

    
    return dataProfile;
  } catch (error) {
    console.error(`Error fetching profile:`, error);
    return {};
  }
};