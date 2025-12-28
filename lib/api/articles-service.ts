import { supabase } from '../supabase';
import { Article } from "@/types/blog"

// Obtener artículos de DEV.to
export async function fetchDevToArticles(username : string): Promise<Article[]> {
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${username}`);
    if (!response.ok) {
      throw new Error(`DEV.to API responded with status: ${response.status}`);
    }
    const data = await response.json() as Article[];
    console.log(`Fetched ${data.length} articles from DEV.to for user: ${username}`);
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

// Función para obtener artículos de Drupal (para uso futuro)
export async function fetchDrupalArticles(drupalUrl: string, apiKey?: string): Promise<Article[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${drupalUrl}/jsonapi/node/article`, {
      headers
    });
    
    if (!response.ok) {
      throw new Error(`Drupal API responded with status: ${response.status}`);
    }
    
    const data = await response.json() as any;
    
    // Transformar datos de Drupal al formato de Article
    const articles: Article[] = data.data.map((item: any) => ({
      id: parseInt(item.id),
      title: item.attributes.title,
      description: item.attributes.body?.summary || '',
      readable_publish_date: new Date(item.attributes.created).toLocaleDateString(),
      slug: item.attributes.path?.alias || item.id,
      url: `${drupalUrl}${item.attributes.path?.alias || `/node/${item.id}`}`,
      published_timestamp: item.attributes.created,
      cover_image: item.attributes.field_image?.uri || null,
      social_image: item.attributes.field_image?.uri || '',
      created_at: item.attributes.created,
      edited_at: item.attributes.changed,
      published_at: item.attributes.created,
      last_comment_at: item.attributes.changed,
      reading_time_minutes: Math.ceil((item.attributes.body?.value?.length || 0) / 1000),
      tag_list: item.attributes.field_tags?.map((tag: any) => tag.name) || [],
      body_html: item.attributes.body?.value || ''
    }));
    
    console.log(`Fetched ${articles.length} articles from Drupal`);
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Drupal:', error);
    return [];
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
    console.log(`Starting sync for DEV.to user: ${username}`);
    const devToArticles = await fetchDevToArticles(username);
    
    if (devToArticles.length === 0) {
      console.log('No articles found to sync');
      return 0;
    }
    
    let savedCount = 0;
    let updatedCount = 0;
    let newCount = 0;

    for (const article of devToArticles) {
      try {
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
          tag_list: processTagList(fullArticle.tag_list),
          body_html: fullArticle.body_html
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
          updatedCount++;
        } else {
          // Crear nuevo artículo
          const { data: created, error: insertError } = await supabase
            .from('articles')
            .insert([articleData])
            .select()
            .single();
          if (insertError) throw insertError;
          savedArticle = created;
          newCount++;
        }

        if (savedArticle) {
          savedCount++;
        }
      } catch (articleError) {
        console.error(`Error processing article ${article.id}:`, articleError);
        // Continuar con el siguiente artículo en caso de error
        continue;
      }
    }
    
    console.log(`Sync completed: ${savedCount} total processed (${newCount} new, ${updatedCount} updated)`);
    return savedCount;
  } catch (error) {
    console.error('Error syncing articles from DEV.to:', error);
    throw error; // Re-throw para que el cron job pueda manejar el error
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