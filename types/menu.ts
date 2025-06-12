export interface MenuItemAttributes {
  title: string;
  url: string;
  weight: number;
  langcode: string;
}

export interface MenuItem {
  type: string;
  id: string;
  attributes: MenuItemAttributes;
}

export interface MenuApiResponse {
  data: MenuItem[];
}

export interface ProcessedMenuItem {
  id: string;
  title: string;
  url: string;
  weight: number;
  langcode: string;
} 