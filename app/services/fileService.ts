import { File } from '@/app/types/file';

export const getFile = async (fileId: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/file/file?filter[fid]=${fileId}`)
    if (!response.ok) throw new Error(`Error fetching file`);
    let data = await response.json();

    console.log(data);
    
    data = data.data[0];

    let dataFile: File = {
      url: data.attributes.uri.url,
    }
    return dataFile;

  } catch (error) {
    console.error(`Error fetching file:`, error);
    return {};
  }
}