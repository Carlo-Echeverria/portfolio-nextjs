import { normalizeProfile } from "@/normalizers/profileNormalizer";
import { Profile } from '@/types/profile';
import { getFiles, getImages } from '@/services/fileService';
import { getProjects } from '@/services/projectService';
import { getEducation } from '@/services/educationService';
import { getSkills } from '@/services/skillService';

export const getProfile = async (id: number): Promise<Profile> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/profile?filter[nid]=${id}`,
      { next: { revalidate: 120 } }
    );

    if (!response.ok) throw new Error(`Error fetching profile`);
    let data = await response.json();
    data = data.data[0];

    const nodeId = data.attributes.drupal_internal__nid;
    const photoID = data.relationships.field_photo.data.id;
    const cvID = data.relationships.field_cv.data.id;
    const educationID = data.relationships.field_education.data.meta.drupal_internal__target_id;

    // Projects
    const projectIds = data.relationships.field_projects.data.map(
      (item: { id: string }) => item.id
    );

    // Skills
    const skillIds = data.relationships.field_skills.data.map(
      (item: { id: string }) => item.id
    );

    const dataProfile : Profile = {
      id: data.id,
      attributes: {
        title: data.attributes.title,
        langcode: data.attributes.langcode,
        status: data.attributes.status,
        drupal_internal__nid: nodeId,
        body: {
          value: data.attributes.body?.value,
          summary: data.attributes.body?.summary,
        },
        field_email: data.attributes.field_email,
        field_phone: data.attributes.field_phone,
        field_title: data.attributes.field_title,
      },
      relationships: {
        field_skills: {
          data: await getSkills(skillIds),
        },
        field_education: {
          data: await getEducation(educationID),
        }, 
        field_photo: {
          data: await getImages([photoID])
        },
        field_cv: {
          data: await getFiles([cvID])
        },
        field_projects: {
          data: await getProjects(projectIds), // ahora es el detalle de cada proyecto
        },
      },
    };
    
    return normalizeProfile(dataProfile);
  } catch (error) {
    console.error(`Error fetching profile:`, error);
    return normalizeProfile({});
  }
};