import { supabase } from '../supabase';
import fetch from 'node-fetch';
import { Article } from "@/types/blog"

// Obtener artículos de DEV.to
export async function fetchDevToArticles(username : string): Promise<Article[]> {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${username}`);
    const data = await response.json() as Article[];
    return data;
  } catch (error) {
    console.error('Error fetching articles from DEV.to:', error);
    return [];
  }
}

// Guardar artículos de DEV.to en Supabase
export async function syncArticlesFromDev(username : string): Promise<number> {
  try {
    const devToArticles = await fetchDevToArticles(username);
    let savedCount = 0;

    for (const article of devToArticles) {
      // Buscar si el artículo ya existe
      const { data: existingArticle, error: findError } = await supabase
        .from('articles')
        .select('id')
        .eq('id', article.id.toString())
        .single();
      if (findError && findError.code !== 'PGRST116') throw findError;

      // Preparar los datos del artículox
      const articleData: Article = {
        id: article.id,
        title: article.title,
        description: article.description,
        readable_publish_date: article.readable_publish_date,
        slug: article.slug,
        url: article.url,
        published_timestamp: article.published_timestamp,
        cover_image: article.cover_image,
        social_image: article.social_image,
        created_at: article.created_at,
        edited_at: article.edited_at,
        published_at: article.published_at,
        last_comment_at: article.last_comment_at,
        reading_time_minutes: article.reading_time_minutes,
        tag_list: article.tag_list
      };
      
      let savedArticle;
      if (existingArticle) {
        // Actualizar artículo existente
        const { data: updated, error: updateError } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', existingArticle.id)
          .select()
          .single();
        if (updateError) throw updateError;
        savedArticle = updated;
      } else {
        // Crear nuevo artículo
        const { data: created, error: insertError } = await supabase
          .from('articles')
          .insert([articleData])
          .select()
          .single();
        if (insertError) throw insertError;
        savedArticle = created;
      }

      if (savedArticle) {
        savedCount++;
      }
    }
    return savedCount;
  } catch (error) {
    console.error('Error syncing articles from DEV.to:', error);
    return 0;
  }
}

// Obtener todos los artículos
export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Obtener un artículo por slug
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}