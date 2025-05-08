export interface ProjectType {
  id: string;
  type: 'taxonomy_term--project_types';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
  };
}