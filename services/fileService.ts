import { File, Image } from '@/types/file';

export const getFile = async (fileId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/file/file?filter[fid]=${fileId}`)
    if (!response.ok) throw new Error(`Error fetching file`);
    let data = await response.json();

    data = data.data[0];

    let dataFile: File = {
      filename: data.attributes.filename,
      url: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${data.attributes.uri.url}`,
    }

    return dataFile;

  } catch (error) {
    console.error(`Error fetching file:`, error);
    return {};
  }
}

export const getImage = async (imageId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/file/file?filter[fid]=${imageId}`)
    if (!response.ok) throw new Error(`Error fetching image`);
    let data = await response.json();

    data = data.data[0];

    let dataImage: Image = {
      alt: data.attributes.alt,
      url: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${data.attributes.uri.url}`,
    }

    return dataImage;

  } catch (error) {
    console.error(`Error fetching image:`, error);
    return {};
  }
}