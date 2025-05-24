import { normalizeEducation } from "@/normalizers/educationNormalizer";
import { Education } from '@/types/education';

export const getEducation = async (id: number): Promise<Education> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/education?filter[nid]=${id}`,
      {
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      }
    );

    if (!response.ok) throw new Error(`Error fetching education`);
    let data = await response.json();

    data = data.data[0];

    const dataEducation: Education = {
      id: data.id,
      attributes: {
        title: data.attributes.title,
        langcode: data.attributes.langcode,
        drupal_internal__nid: data.attributes.drupal_internal__nid,
        status: data.attributes.status,
        body: {
          value: data.attributes.body?.value,
          summary: data.attributes.body?.summary,
        },
        field_address: data.attributes.field_address,
        field_degree: data.attributes.field_degree,
        field_start_date: data.attributes.field_start_date,
        field_end_date: data.attributes.field_end_date,
        field_is_current: data.attributes.field_is_current,
      }
    };

    return normalizeEducation(dataEducation);
  } catch (error) {
    console.error(`Error fetching education:`, error);
    return normalizeEducation({});
  }
};