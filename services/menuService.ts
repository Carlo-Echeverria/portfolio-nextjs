import { MenuApiResponse, ProcessedMenuItem } from '@/types/menu';
import { getAuthenticatedHeaders } from '@/services/authService';

export const getMenuItems = async (): Promise<ProcessedMenuItem[]> => {
  try {
    const headers = await getAuthenticatedHeaders();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/menu_items/portfolio`,
      {
        headers,
        next: {
          revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_APP || '3600'),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching menu items: ${response.status}`);
    }

    const data: MenuApiResponse = await response.json();

    // Procesar y ordenar los items del menú por weight
    const processedItems: ProcessedMenuItem[] = data.data
      .map(item => ({
        id: item.id,
        title: item.attributes.title,
        url: item.attributes.url,
        weight: item.attributes.weight,
        langcode: item.attributes.langcode,
      }))
      .sort((a, b) => a.weight - b.weight); // Ordenar por weight ascendente

    return processedItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}; 