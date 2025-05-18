import { ProjectType } from '@/types/project_type';

export function normalizeProjectType(data: any): ProjectType {
  return {
    id: data.id ?? "",
    type: data.type ?? "taxonomy_term--skills",
    attributes: {
      name: data.attributes?.name ?? "",
      langcode:  data.attributes?.langcode ?? "en",
      drupal_internal__tid: data.attributes?.drupal_internal__tid ?? 0,
      status: String(data.attributes?.status ?? ""),
      description: String(data.attributes?.description ?? ""),
    }
  };
}
