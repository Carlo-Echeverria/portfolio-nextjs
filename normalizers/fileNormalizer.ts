import { File, Image } from "@/types/file";

export function normalizeFile(data: any): File {
  return {
    id: data.id ?? "",
    filename: data.filename ?? "",
    attributes: {
      langcode: data.attributes?.langcode ?? "",
      uri: {
        url: data.attributes?.uri?.url ?? "",
      }
    }
  };
}
 

export function normalizeImage(data: any): Image {
  return {
    id: data.id ?? "",
    alt: data.alt ?? "",
    attributes: {
      langcode: data.attributes?.langcode ?? "",
      uri: {
        url: data.attributes?.uri?.url ?? "",
      }
    }
  };
}
 