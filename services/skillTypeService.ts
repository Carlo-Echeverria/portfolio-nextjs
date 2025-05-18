import { normalizeSkillType } from "@/normalizers/skillTypeNormalizer";
import { SkillType } from '@/types/skillType';

export const getSkillTypes = async (skillTypesIds: string[]): Promise<SkillType[]> => {
  if (!skillTypesIds || skillTypesIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    skillTypesIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/skill_types?${queryParams.toString()}`
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