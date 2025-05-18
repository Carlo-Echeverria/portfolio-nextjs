export interface SkillCategory {
  id: string;
  type?: 'taxonomy_term--skill-categories';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
  };
}