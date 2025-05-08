export interface Project {
  id: string;
  type: 'node--project';
  attributes: {
    title: string;
    langcode: string,
    drupal_internal__nid: number;
    status: string;
    body: {
      value?: string;
      summary?: string;
    }
    field_start_date: string;
    field_end_date?: string;
    field_is_current: boolean;
    field_taks: string[] | [];
  };
  relationships: {
    field_gallery: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
    field_project_types: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
    field_roles: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
    field_tech_stacks: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
    field_thumbnail: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        }
      } | {};
    };
  };
}