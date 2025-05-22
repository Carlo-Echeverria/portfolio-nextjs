import { SkillType } from '@/types/skillType';
import { SkillCategory } from '@/types/skillCategory';

export interface Skill {
  id: string;
  type?: 'taxonomy_term--skills';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description: {
      value: string;
    };
    field_level: number;
    field_years: number;
  };
  relationships: {
    field_skill_types: {
      data: SkillType[];
    };
    field_skill_categories: {
      data: SkillCategory[];
    };
  };
}