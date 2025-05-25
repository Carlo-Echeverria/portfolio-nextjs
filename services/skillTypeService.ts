import { normalizeSkillType } from "@/normalizers/skillTypeNormalizer";
import { SkillType } from '@/types/skillType';
import { getAuthenticatedHeaders } from '@/services/authService';

export const getSkillTypes = async (skillTypeIds: string[]): Promise<SkillType[]> => {
  if (!skillTypeIds || skillTypeIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    skillTypeIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/skill_types?${queryParams.toString()}`, {
        headers,
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching skill types');
    }

    const data = await response.json();
    
    const skillTypes : SkillType[] = []

    data.data.map((type: SkillType)=> {
      const dataSkillType : SkillType = {
        id: type.id,
        attributes: {
          name: type.attributes.name,
          drupal_internal__tid: type.attributes.drupal_internal__tid,
          langcode: type.attributes.langcode,
          status: type.attributes.status,
          description: type.attributes.description,
        }
      };
      skillTypes.push(normalizeSkillType(dataSkillType));
    })

    return skillTypes;
  } catch (error) {
    console.error('Error in fetching skill types:', error);
    return [];
  }
};