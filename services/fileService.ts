import { normalizeFile, normalizeImage } from "@/normalizers/fileNormalizer";
import { File, Image } from '@/types/file';

export const getFiles = async (filesId: string[]): Promise<File[]> => {
  if (!filesId || filesId.length === 0) {
    return [];
  }
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    filesId.forEach(id => queryParams.append('filter[id][value][]', id));
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/file/file?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    })
    if (!response.ok) throw new Error(`Error fetching file`);
    let data = await response.json();

    const files : File[] = []

    data.data.map((file: File) => {
      let dataFile: File = {
        id: file.id,
        filename: file.filename,
        attributes: {
          uri: {
            url: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${file.attributes.uri.url}`,
          }
        }
      }
      files.push(normalizeFile(dataFile));
    });

    return files;

  } catch (error) {
    console.error(`Error fetching file:`, error);
    return [];
  }
}

export const getImages = async (imagesId: string[]) : Promise<Image[]> => {
  if (!imagesId || imagesId.length === 0) {
    return [];
  }

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    imagesId.forEach(id => queryParams.append('filter[id][value][]', id));
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/file/file?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    })
    if (!response.ok) throw new Error(`Error fetching images`);
    
    let data = await response.json();

    const images : Image[] = []

    data.data.map((image: Image)=> {
      const dataImage : Image = {
        id: image.id,
        alt: image.alt,
        attributes: {
          uri: {
            url: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${image.attributes.uri.url}`,
          }
        }
      };
      images.push(normalizeImage(dataImage));
    })

    return images;

  } catch (error) {
    console.error(`Error fetching images:`, error);
    return [];
  }
}