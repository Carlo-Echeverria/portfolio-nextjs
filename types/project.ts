import { Image } from "@/types/file";
import { TechStack } from '@/types/tech_stack';
import { Role } from '@/types/role';
import { ProjectType } from '@/types/project_type';

export interface Project {
  id: string;
  type?: 'node--project';
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
      data: Image[];
    };
    field_project_types: {
      data: ProjectType[];
    };
    field_roles: {
      data: Role[];
    };
    field_tech_stacks: {
      data: TechStack[];
    };
    field_thumbnail: {
      data: Image;
    };
  };
}