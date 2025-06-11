import { Project } from "@/types/project";

export function normalizeProject(data: any): Project {
  
  return {
    id: data.attributes?.id ?? "",
    type: "node--project",
    attributes: {
      title: data.attributes?.title ?? "",
      langcode: data.attributes?.langcode ?? "en",
      drupal_internal__nid: data.attributes?.drupal_internal__nid ?? 0,
      status: String(data.attributes?.status ?? ""),
      path: {
        alias: data.attributes?.path?.alias ?? "",
      },
      body: {
        value: data.attributes?.body?.value ?? "",
        summary: data.attributes?.body?.summary ?? "",
      },
      field_start_date: data.attributes?.field_start_date ?? "",
      field_end_date: data.attributes?.field_end_date ?? "",
      field_is_current: !!data.attributes?.field_is_current,
      field_taks: data.attributes?.field_taks ?? [],
    },
    relationships: {
      field_gallery: {
        data: data.relationships?.field_gallery?.data ?? [],
      },
      field_project_types: {
        data: data.relationships?.field_project_types?.data ?? [],
      },
      field_roles: {
        data: data.relationships?.field_roles?.data ?? [],
      },
      field_tech_stacks: {
        data: data.relationships?.field_tech_stacks?.data ?? [],
      },
      field_thumbnail: {
        data: data.relationships?.field_thumbnail?.data ?? {},
      },
    },
  };
}