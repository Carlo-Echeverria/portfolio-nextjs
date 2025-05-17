export interface Skill {
  id: string;
  type?: 'taxonomy_term--skills';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
  };
}