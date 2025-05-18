export interface SkillType {
  id: string;
  type?: 'taxonomy_term--skill-types';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
  };
}