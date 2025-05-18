import { normalizeTechSatck } from "@/normalizers/techStackNormalizer";
import { TechStack } from '@/types/tech_stack';

export const getTechStacks = async (techStackIds: string[]): Promise<TechStack[]> => {
  if (!techStackIds || techStackIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    techStackIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/taxonomy_term/tech_stacks?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error('Error fetching tech stacks');
    }

    const data = await response.json();
    
    const techStacks : TechStack[] = []

    data.data.map((techStack: TechStack)=> {
      const dataTechStack : TechStack = {
        id: techStack.id,
        attributes: {
          name: techStack.attributes.name,
          drupal_internal__tid: techStack.attributes.drupal_internal__tid,
          langcode: techStack.attributes.langcode,
          status: techStack.attributes.status,
          description: techStack.attributes.description,
          field_level: techStack.attributes.field_level
        }
      };
      techStacks.push(normalizeTechSatck(dataTechStack));
    })

    return techStacks;
  } catch (error) {
    console.error('Error in fetching tech stacks:', error);
    return [];
  }
};