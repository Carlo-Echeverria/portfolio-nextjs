import { Project } from "@/types/project";

export function normalizeProject(data: any): Project {
  
  return {
    id: data.id ?? data.attributes?.id ?? "",
    type: "node--project",
    attributes: {
      title: data.attributes?.title ?? "",
      langcode: data.attributes?.langcode ?? "en",
      drupal_internal__nid: data.attributes?.drupal_internal__nid ?? 0,
      status: String(data.attributes?.status ?? ""),
      path: {
        alias: data.attributes?.path?.alias ?? "",
      },
      body: {
        value: data.attributes?.body?.value ?? "",
        summary: data.attributes?.body?.summary ?? "",
      },
      // Información Básica
      field_summary: data.attributes?.field_summary?.value ?? data.attributes?.field_summary ?? "",
      field_objective: data.attributes?.field_objective?.value ?? data.attributes?.field_objective ?? "",
      field_sector: data.attributes?.field_sector ?? "",
      field_project_status: data.attributes?.field_project_status ?? undefined,
      // Fechas y Período
      field_start_date: data.attributes?.field_start_date ?? "",
      field_end_date: data.attributes?.field_end_date ?? "",
      field_is_current: !!data.attributes?.field_is_current,
      // Equipo y Metodología
      field_team_composition: Array.isArray(data.attributes?.field_team_composition)
        ? data.attributes.field_team_composition
        : data.attributes?.field_team_composition?.value
          ? (Array.isArray(data.attributes.field_team_composition.value) 
              ? data.attributes.field_team_composition.value 
              : [data.attributes.field_team_composition.value])
          : data.attributes?.field_team_composition
            ? (typeof data.attributes.field_team_composition === 'string' 
                ? [data.attributes.field_team_composition] 
                : [])
            : undefined,
      field_methodology: Array.isArray(data.attributes?.field_methodology)
        ? data.attributes.field_methodology
        : data.attributes?.field_methodology?.value
          ? (Array.isArray(data.attributes.field_methodology.value) 
              ? data.attributes.field_methodology.value 
              : [data.attributes.field_methodology.value])
          : data.attributes?.field_methodology
            ? (typeof data.attributes.field_methodology === 'string' 
                ? [data.attributes.field_methodology] 
                : [])
            : undefined,
      // Tareas y Responsabilidades
      field_taks: data.attributes?.field_taks ?? data.attributes?.field_tasks ?? [],
      field_responsibilities: data.attributes?.field_responsibilities?.value ?? data.attributes?.field_responsibilities ?? "",
      // Contenido Detallado
      field_project_context: data.attributes?.field_project_context?.value ?? data.attributes?.field_project_context ?? "",
      field_challenges: data.attributes?.field_challenges?.value ?? data.attributes?.field_challenges ?? "",
      field_solutions: data.attributes?.field_solutions?.value ?? data.attributes?.field_solutions ?? "",
      field_features: data.attributes?.field_features?.value ?? data.attributes?.field_features ?? "",
      field_architecture: data.attributes?.field_architecture?.value ?? data.attributes?.field_architecture ?? "",
      // Resultados e Impacto
      field_results: data.attributes?.field_results?.value ?? data.attributes?.field_results ?? "",
      field_success_metrics: data.attributes?.field_success_metrics?.value ?? data.attributes?.field_success_metrics ?? "",
      field_technical_impact: data.attributes?.field_technical_impact?.value ?? data.attributes?.field_technical_impact ?? "",
      field_lessons_learned: data.attributes?.field_lessons_learned?.value ?? data.attributes?.field_lessons_learned ?? "",
      // Integraciones
      field_integrations: data.attributes?.field_integrations?.value ?? data.attributes?.field_integrations ?? "",
      // Enlaces y Recursos
      field_project_url: data.attributes?.field_project_url?.uri ?? data.attributes?.field_project_url ?? "",
      field_repository_url: data.attributes?.field_repository_url?.uri ?? data.attributes?.field_repository_url ?? "",
      field_case_study_url: data.attributes?.field_case_study_url?.uri ?? data.attributes?.field_case_study_url ?? "",
      field_technical_docs_url: data.attributes?.field_technical_docs_url?.uri ?? data.attributes?.field_technical_docs_url ?? "",
      // SEO y Metadata
      field_meta_description: data.attributes?.field_meta_description ?? "",
      field_keywords: data.attributes?.field_keywords ?? "",
      field_featured: !!data.attributes?.field_featured,
      field_weight: data.attributes?.field_weight ?? 0,
      field_display_priority: data.attributes?.field_display_priority ?? undefined,
    },
    relationships: {
      // Medios e Imágenes
      field_thumbnail: {
        data: data.relationships?.field_thumbnail?.data ?? {},
      },
      field_project_hero: {
        data: data.relationships?.field_project_hero?.data ?? {},
      },
      field_gallery: {
        data: data.relationships?.field_gallery?.data ?? [],
      },
      field_diagrams: {
        data: data.relationships?.field_diagrams?.data ?? [],
      },
      // Tipos y Categorías
      field_project_types: {
        data: data.relationships?.field_project_types?.data ?? [],
      },
      // Stack Tecnológico
      field_tech_stacks: {
        data: data.relationships?.field_tech_stacks?.data ?? [],
      },
      field_backend_stack: {
        data: data.relationships?.field_backend_stack?.data ?? [],
      },
      field_frontend_stack: {
        data: data.relationships?.field_frontend_stack?.data ?? [],
      },
      field_tools_platforms: {
        data: data.relationships?.field_tools_platforms?.data ?? [],
      },
      // Roles
      field_roles: {
        data: data.relationships?.field_roles?.data ?? [],
      },
      field_main_role: {
        data: data.relationships?.field_main_role?.data ?? {},
      },
      // Experiencia relacionada (opcional)
      field_experience: {
        data: data.relationships?.field_experience?.data ?? {},
      },
    },
  };
}