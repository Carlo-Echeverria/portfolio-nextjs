import { Project } from '@/types/project';

export const getProjects = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/project`);
    if (!response.ok) throw new Error(`Error fetching projects`);
    const data = await response.json();

    // return await Promise.all(
    //   data.data.map(async (item) => {
    //     const imageId = item.relationships.field_image.data?.id;
    //     const imageUrl = imageId ? await getImageUrl(imageId) : null;

    //     return {
    //       id: item.id,
    //       drupal_internal__nid:item.attributes.drupal_internal__nid,
    //       title: item.attributes.title,
    //       body: item.attributes.body.value,
    //       summary: item.attributes.body.summary,
    //       imageUrl: imageUrl ? `https://${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${imageUrl}` : null,
    //       imageAlt: item.relationships.field_image.meta?.alt || "",
    //       categories : await getCategoriesByArticle(item),
    //     };
    //   })
    // );
    return data;
  } catch (error) {
    console.error(`Error fetching projects:`, error);
    return [];
  }
};