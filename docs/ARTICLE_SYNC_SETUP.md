# Sistema de Sincronización Automática de Artículos

Este sistema permite sincronizar artículos automáticamente desde DEV.to y Drupal hacia tu base de datos de Supabase, con revalidación automática del contenido.

## 🚀 Características

- ✅ Sincronización automática diaria via cron jobs
- ✅ Sincronización manual desde DEV.to
- ✅ Sincronización manual desde Drupal
- ✅ Revalidación automática del contenido
- ✅ Manejo robusto de errores
- ✅ Logging detallado
- ✅ Autenticación para endpoints de cron

## 📋 Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Article Synchronization
DEVTO_USERNAME=your_devto_username
DRUPAL_URL=https://your-drupal-site.com
DRUPAL_API_KEY=your_drupal_api_key_optional

# Cron Job Security
NEXT_PUBLIC_CRON_SECRET=your_secure_random_string_for_cron_authentication

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Configuración de Supabase

Asegúrate de tener una tabla `articles` en Supabase con la siguiente estructura:

```sql
CREATE TABLE articles (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  readable_publish_date TEXT,
  slug TEXT,
  url TEXT,
  published_timestamp TEXT,
  cover_image TEXT,
  social_image TEXT,
  created_at TEXT,
  edited_at TEXT,
  published_at TEXT,
  last_comment_at TEXT,
  reading_time_minutes INTEGER,
  tag_list TEXT[],
  body_html TEXT
);
```

### 3. Configuración de Vercel (Producción)

El archivo `vercel.json` ya está configurado para ejecutar el cron job diariamente a las 6:00 AM UTC:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-articles",
      "schedule": "0 6 * * *"
    }
  ]
}
```

## 🔄 Endpoints Disponibles

### 1. Sincronización Automática (Cron)
- **URL**: `/api/cron/sync-articles`
- **Método**: `GET`
- **Descripción**: Ejecutado automáticamente cada día
- **Autenticación**: Bearer token (NEXT_PUBLIC_CRON_SECRET)

### 2. Sincronización Manual DEV.to
- **URL**: `/api/articles/sync`
- **Método**: `POST`
- **Body**: `{ "username": "optional_username" }`
- **Descripción**: Sincroniza artículos desde DEV.to

### 3. Sincronización Manual Drupal
- **URL**: `/api/articles/sync-drupal`
- **Método**: `POST`
- **Body**: `{ "drupalUrl": "required", "apiKey": "optional" }`
- **Descripción**: Sincroniza artículos desde Drupal

### 4. Obtener Artículos
- **URL**: `/api/articles`
- **Método**: `GET`
- **Descripción**: Obtiene todos los artículos sincronizados

## 🛠️ Scripts de Desarrollo

### Probar Sincronización Local

```bash
# Sincronizar con username por defecto
npm run sync:articles

# Sincronizar con username específico
npm run sync:articles your_username

# Probar endpoint de cron
npm run sync:articles:cron
```

### Usar Script Directamente

```bash
# Sincronización normal
node scripts/sync-articles.js [username]

# Probar cron
node scripts/sync-articles.js cron
```

## 📊 Monitoreo y Logs

El sistema incluye logging detallado que puedes monitorear en:

- **Desarrollo**: Console del servidor
- **Producción**: Vercel Function Logs

Ejemplo de logs:
```
Starting sync for DEV.to user: username
Fetched 10 articles from DEV.to for user: username
Sync completed: 10 total processed (2 new, 8 updated)
```

## 🔒 Seguridad

- El endpoint de cron está protegido con un token Bearer
- Las variables de entorno sensibles deben configurarse en Vercel
- Los errores se manejan sin exponer información sensible

## 🚨 Solución de Problemas

### Error: "Unauthorized" en Cron
- Verifica que `NEXT_PUBLIC_CRON_SECRET` esté configurado correctamente
- Asegúrate de que el header Authorization esté presente

### Error: "No articles found"
- Verifica que `DEVTO_USERNAME` esté configurado
- Confirma que el usuario tiene artículos públicos

### Error de Conexión a Supabase
- Verifica las credenciales de Supabase
- Confirma que la tabla `articles` existe

### Error de Drupal
- Verifica que `DRUPAL_URL` sea accesible
- Confirma que el endpoint JSON:API esté habilitado
- Verifica las credenciales de API si son requeridas

## 📈 Personalización

### Cambiar Frecuencia del Cron

Edita `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-articles",
      "schedule": "0 */6 * * *"  // Cada 6 horas
    }
  ]
}
```

### Agregar Nuevas Fuentes

1. Crea una nueva función `fetchFromNewSource` en `lib/api/articles-service.ts`
2. Agrega la lógica de transformación de datos
3. Crea un nuevo endpoint en `app/api/articles/sync-newsource/route.ts`

## 🎯 Próximos Pasos

- [ ] Implementar webhooks para sincronización en tiempo real
- [ ] Agregar métricas de sincronización
- [ ] Implementar cache inteligente
- [ ] Agregar soporte para más fuentes de contenido 