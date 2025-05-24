import { normalizeSkillCategory } from "@/normalizers/skillCategoryNormalizer";
import { SkillCategory } from '@/types/skillCategory';

export const getSkillCategories = async (skillCategoriesIds: string[]): Promise<SkillCategory[]> => {
  if (!skillCategoriesIds || skillCategoriesIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    skillCategoriesIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/skill_categories?${queryParams.toString()}`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error fetching skill categories');
    }

    const data = await response.json();
    
    const skillCategories : SkillCategory[] = []

    data.data.map((category: SkillCategory)=> {
      const dataSkillCategory : SkillCategory = {
        id: category.id,
        attributes: {
          name: category.attributes.name,
          drupal_internal__tid: category.attributes.drupal_internal__tid,
          langcode: category.attributes.langcode,
          status: category.attributes.status,
          description: category.attributes.description,
        }
      };
      skillCategories.push(normalizeSkillCategory(dataSkillCategory));
    })

    return skillCategories;
  } catch (error) {
    console.error('Error in fetching skill categories:', error);
    return [];
  }
};