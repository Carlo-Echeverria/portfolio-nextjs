export interface Education {
  id: string;
  type: 'node--education';
  attributes: {
    title: string;
    langcode: string,
    drupal_internal__nid: number;
    status: string;
    body: {
      value?: string;
      summary?: string;
    }
    field_address?: string;
    field_degree: string;
    field_start_date: string;
    field_end_date?: string;
    field_is_current: boolean;
  };
}
