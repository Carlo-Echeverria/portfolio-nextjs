export interface TechStack {
  id: string;
  type?: 'taxonomy_term--tech_stacks';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
    field_level?: number;
  };
}