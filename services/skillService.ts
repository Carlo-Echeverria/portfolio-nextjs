import { Skill } from '@/types/skill';

export const getSkills = async (skillIds: string[]) => {
  if (!skillIds || skillIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    skillIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/skills?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error('Error fetching skills');
    }

    const data = await response.json();
    
    const skills : Skill[] = []

    data.data.map((skill: Skill)=> {
      const dataSkill = {
        id: skill.id,
        attributes: {
          name: skill.attributes.name,
          drupal_internal__tid: skill.attributes.drupal_internal__tid,
          langcode: skill.attributes.langcode,
          status: skill.attributes.status,
          description: skill.attributes.description,
        }
      };
      skills.push(dataSkill);
    })

    return skills;
  } catch (error) {
    console.error('Error in fetching skills:', error);
    return [];
  }
};