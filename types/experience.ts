import { TechStack } from '@/types/tech_stack';
import { Role } from '@/types/role';
import { Image } from '@/types/file';
import { Organization } from '@/types/organization';

export interface Experience {
  id: string;
  type?: 'node--experience';
  attributes: {
    title: string;
    langcode: string,
    drupal_internal__nid: number;
    status: string;
    path: {
      alias: string;
    },
    body: {
      value?: string;
      summary?: string;
    }
    field_start_date: string;
    field_end_date?: string;
    field_is_current: boolean;
    field_tasks: string[] | [];
  };
  relationships: {
    field_roles: {
      data: Role[];
    };
    field_tech_stacks: {
      data: TechStack[];
    };
    field_gallery: {
      data: Image[];
    };
    field_thumbnail: {
      data: Image | {};
    };
    field_organization: {
      data: Organization | {};
    };
  };
}