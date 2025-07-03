import { Organization } from "@/types/organization";

export function normalizeOrganization(data: any): Organization {
  
  return {
    id: data.attributes?.id ?? "",
    type: "node--organization",
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
      field_website: data.attributes?.field_website ?? "",
    },
  };
}