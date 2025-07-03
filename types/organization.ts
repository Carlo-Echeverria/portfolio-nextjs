export interface Organization {
  id: string;
  type?: 'node--organization';
  attributes: {
    title: string;
    langcode: string;
    drupal_internal__nid: number;
    status: string;
    path: {
      alias: string;
    },
    body: {
      value?: string;
      summary?: string;
    }
    field_website: string,
  };
}