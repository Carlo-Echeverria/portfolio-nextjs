import { Education } from "@/types/education";

export function normalizeEducation(data: any): Education {
  return {
    id: data.id ?? "",
    type: data.type ?? "node--education",
    attributes: {
      title: data.attributes?.title ?? "",
      langcode: data.attributes?.langcode ?? "en",
      drupal_internal__nid: data.attributes?.drupal_internal__nid ?? 0,
      status: data.attributes?.status ?? "",
      body: {
        value: data.attributes?.body?.value ?? "",
        summary: data.attributes?.body?.summary ?? "",
      },
      field_address: data.attributes?.field_address ?? "",
      field_degree: data.attributes?.field_degree ?? "",
      field_start_date: data.attributes?.field_start_date ?? "",
      field_end_date: data.attributes?.field_end_date ?? "",
      field_is_current: !!data.attributes?.field_is_current,
    },
  };
}