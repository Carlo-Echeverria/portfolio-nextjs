import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import { Education } from "@/types/education";

export interface Profile {
  id: string;
  type?: 'node--profile';
  attributes?: {
    title: string;
    langcode: string,
    drupal_internal__nid: number;
    status: string;
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
      data: Skill[];
    };
    field_education: {
      data: Education;
    };
    field_photo: {
      // alt: string;
      url: string;
    };
    field_cv: {
      filename: string;
      url: string
    };
    field_projects: {
      data: Project[];
    };
  };
}
