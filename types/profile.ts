export interface Profile {
  id?: string;
  type?: 'node--profile';
  attributes: {
    title: string;
    langcode?: string,
    drupal_internal__nid: number;
    status?: string;
    body: {
      value: string;
      summary?: string;
    }
    field_email?: string;
    field_phone?: string;
    field_title?: string;
  };
  relationships: {
    field_skills: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
    field_education: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      } | {};
    };
    field_photo: {
      url: string
    };
    field_photo2: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        }
      } | {};
    };
    field_projects: {
      data: {
        meta: {
          drupal_internal__target_id: number;
        };
      }[];
    };
  };
}
