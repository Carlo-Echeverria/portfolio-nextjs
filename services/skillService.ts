import { normalizeSkill } from "@/normalizers/skillNormalizer";
import { Skill } from '@/types/skill';
import { getSkillTypes } from "@/services/skillTypeService";
import { getSkillCategories } from "./skillCategoryService";

export const getSkills = async (skillIds: string[]): Promise<Skill[]> => {
  if (!skillIds || skillIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    skillIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/skills?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching skills');
    }

    const data = await response.json();
    
    const skills: Skill[] = await Promise.all(
      data.data.map( async (skill: Skill)=> {
        // Skill Types
        const skillTypesIds = skill?.relationships.field_skill_types.data.map(
          (type: { id: string }) => type.id
        );

        // Skill Categories
        const skillCategoriesIds = skill?.relationships.field_skill_categories.data.map(
          (category: { id: string }) => category.id
        );

        const dataSkill : Skill = {
          id: skill.id,
          attributes: {
            name: skill.attributes.name,
            drupal_internal__tid: skill.attributes.drupal_internal__tid,
            langcode: skill.attributes.langcode,
            status: skill.attributes.status,
            description: skill.attributes.description,
            field_level: skill.attributes.field_level,
            field_years: skill.attributes.field_years,
          },
          relationships: {
            field_skill_types: {
              data: await getSkillTypes(skillTypesIds)
            },
            field_skill_categories: {
              data: await getSkillCategories(skillCategoriesIds)
            }
          }
        };

        return dataSkill;
      })
    )

    return skills;
  } catch (error) {
    console.error('Error in fetching skills:', error);
    return [];
  }
};