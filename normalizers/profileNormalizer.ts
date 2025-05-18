import { Profile } from "@/types/profile";
export function normalizeProfile(data: any): Profile {
  return {
    id: data.id ?? "",
    type: data.type ?? "node--profile",
    attributes: {
      title: data.attributes?.title ?? "",
      langcode: data.attributes?.langcode ?? "en",
      drupal_internal__nid: data.attributes?.drupal_internal__nid ?? 0,
      status: String(data.attributes?.status ?? ""),
      body: {
        value: data.attributes?.body?.value ?? "",
        summary: data.attributes?.body?.summary ?? "",
      },
      field_email: data.attributes?.field_email ?? "",
      field_phone: data.attributes?.field_phone ?? "",
      field_title: data.attributes?.field_title ?? "",
    },
    relationships: {
      field_skills: {
        data: data.relationships?.field_skills?.data,
      },
      field_education: {
        data: data.relationships?.field_education?.data,
      },
      field_photo: {
        data: data.relationships?.field_photo?.data,
      },
      field_cv: {
        data: data.relationships?.field_cv?.data,
      },
      field_projects: {
        data: data.relationships?.field_projects?.data,
      },
    },
  };
}
