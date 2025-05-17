import { normalizeProject } from "@/normalizers/projectNormalizer";
import { Project } from '@/types/project';

export const getProjects = async (projectIds: string[]): Promise<Project[]>  => {
  if (!projectIds || projectIds.length === 0) return [];

  try {
    const queryParams = new URLSearchParams();
    queryParams.append('filter[id][operator]', 'IN');
    projectIds.forEach(id => queryParams.append('filter[id][value][]', id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/project?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error('Error fetching projects');
    }

    const data = await response.json();

    const projects : Project[] = []

    data.data.map((project: Project)=> {
      const dataProject = {
        attributes: {
          id: project.id,
          title: project.attributes.title,
          drupal_internal__nid: project.attributes.drupal_internal__nid,
          langcode: project.attributes.langcode,
          status: project.attributes.status,
          body: {
            value: project.attributes.body?.value, 
            summary: project.attributes.body?.summary,
          },
          field_start_date: project.attributes.field_start_date,
          field_end_date: project.attributes.field_end_date,
          field_is_current: project.attributes.field_is_current,
          field_taks: project.attributes.field_taks,
        }
      };
      projects.push(normalizeProject(dataProject));
    })

    return projects;
  } catch (error) {
    console.error('Error in fetching projects:', error);
    return [];
  }
};