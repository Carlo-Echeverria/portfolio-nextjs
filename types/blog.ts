export interface Article {
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  url: string;
  published_timestamp: string;
  cover_image: string | null;
  social_image: string;
  created_at: string;
  edited_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  body_html?: string;
};