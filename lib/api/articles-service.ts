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

// Obtener artículo completo por ID de DEV.to (incluyendo body_html)
export async function fetchDevToArticleById(id: number): Promise<Article | null> {
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    if (!response.ok) {
      console.error(`Error fetching article ${id}: ${response.status}`);
      return null;
    }
    const data = await response.json() as Article;
    return data;
  } catch (error) {
    console.error(`Error fetching article ${id} from DEV.to:`, error);
    return null;
  }
}

// Función auxiliar para procesar las etiquetas
function processTagList(tags: any): string[] {
  if (Array.isArray(tags)) {
    return tags;
  }
  if (typeof tags === 'string') {
    // Si es una cadena separada por comas, dividirla
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  }
  return [];
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

      // Obtener el contenido completo del artículo
      const fullArticle = await fetchDevToArticleById(article.id);
      if (!fullArticle) {
        console.warn(`Could not fetch full content for article ${article.id}`);
        continue;
      }

      console.log('Full article data:', {
        id: fullArticle.id,
        title: fullArticle.title,
        tag_list: fullArticle.tag_list,
        tag_list_type: typeof fullArticle.tag_list
      });

      // Preparar los datos del artículo con el contenido completo
      const articleData: Article = {
        id: fullArticle.id,
        title: fullArticle.title,
        description: fullArticle.description,
        readable_publish_date: fullArticle.readable_publish_date,
        slug: fullArticle.slug,
        url: fullArticle.url,
        published_timestamp: fullArticle.published_timestamp,
        cover_image: fullArticle.cover_image,
        social_image: fullArticle.social_image,
        created_at: fullArticle.created_at,
        edited_at: fullArticle.edited_at,
        published_at: fullArticle.published_at,
        last_comment_at: fullArticle.last_comment_at,
        reading_time_minutes: fullArticle.reading_time_minutes,
        tag_list: processTagList(fullArticle.tag_list), // Procesar las etiquetas correctamente
        body_html: fullArticle.body_html // Incluir el contenido HTML
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