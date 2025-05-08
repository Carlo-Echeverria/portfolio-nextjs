export interface Role {
  id: string;
  type: 'taxonomy_term--roles';
  attributes: {
    name: string;
    langcode: string,
    drupal_internal__tid: number;
    status: string;
    description?: string;
  };
}
