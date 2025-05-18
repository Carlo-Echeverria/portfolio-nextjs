import { File, Image } from "@/types/file";

export function normalizeFile(data: any): File {
  return {
    id: data.id ?? "",
    filename: data.filename ?? "",
    attributes: {
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
      uri: {
        url: data.attributes?.uri?.url ?? "",
      }
    }
  };
}
 