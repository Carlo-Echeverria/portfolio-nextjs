import { Image } from "@/types/file";
import { TechStack } from '@/types/tech_stack';
import { Role } from '@/types/role';
import { ProjectType } from '@/types/project_type';

export interface Project {
  id: string;
  type?: 'node--project';
  attributes: {
    title: string;
    langcode: string;
    drupal_internal__nid: number;
    status: string;
    path: {
      alias: string;
    };
    body: {
      value?: string;
      summary?: string;
    };
    // Información Básica
    field_summary?: string; // Resumen breve para cards y listados
    field_objective?: string; // Objetivo y propósito del proyecto
    field_sector?: string; // Sector/Industria
    field_project_status?: 'Completado' | 'En desarrollo' | 'En pausa' | 'Cancelado'; // Estado del proyecto
    // Fechas y Período
    field_start_date: string;
    field_end_date?: string;
    field_is_current: boolean;
    // Equipo y Metodología
    field_team_composition?: string[]; // Composición del equipo (array de roles)
    field_methodology?: string[]; // Metodología usada (Agile, Scrum, etc.) - array de valores
    // Tareas y Responsabilidades
    field_taks: string[]; // Tareas principales (typo en Drupal: field_taks)
    field_responsibilities?: string[]; // Responsabilidades detalladas (array de valores)
    // Contenido Detallado
    field_project_context?: string; // Contexto y antecedentes
    field_challenges?: string[]; // Desafíos técnicos principales (array de valores)
    field_solutions?: string[]; // Soluciones técnicas implementadas (array de valores)
    field_features?: string[]; // Características principales (array de valores)
    field_architecture?: string; // Arquitectura o enfoque técnico
    // Resultados e Impacto
    field_results?: string; // Resultados e impacto del proyecto
    field_success_metrics?: string; // Métricas de éxito
    field_technical_impact?: string; // Impacto técnico y aprendizajes
    field_lessons_learned?: string; // Lecciones aprendidas
    // Integraciones
    field_integrations?: string[]; // Lista de integraciones con servicios externos (array de valores)
    // Enlaces y Recursos
    field_project_url?: string; // URL pública del proyecto
    field_repository_url?: string; // URL del repositorio
    field_case_study_url?: string; // URL a caso de estudio externo
    field_technical_docs_url?: string; // URL a documentación técnica
    // SEO y Metadata
    field_meta_description?: string; // Descripción para SEO
    field_keywords?: string; // Palabras clave separadas por comas
    field_featured?: boolean; // Si el proyecto aparece destacado
    field_weight?: number; // Orden de visualización (menor = primero)
    field_display_priority?: 'Alta' | 'Media' | 'Baja'; // Prioridad de visualización
  };
  relationships: {
    // Medios e Imágenes
    field_thumbnail: {
      data: Image | {};
    };
    field_project_hero?: {
      data: Image | {};
    };
    field_gallery: {
      data: Image[];
    };
    field_diagrams?: {
      data: Image[];
    };
    // Tipos y Categorías
    field_project_types: {
      data: ProjectType[];
    };
    // Stack Tecnológico
    field_tech_stacks: {
      data: TechStack[];
    };
    field_backend_stack?: {
      data: TechStack[];
    };
    field_frontend_stack?: {
      data: TechStack[];
    };
    field_tools_platforms?: {
      data: TechStack[];
    };
    // Roles
    field_roles: {
      data: Role[];
    };
    field_main_role?: {
      data: Role | {};
    };
    // Experiencia relacionada (opcional)
    field_experience?: {
      data: any; // TODO: definir tipo Experience si existe
    };
  };
}