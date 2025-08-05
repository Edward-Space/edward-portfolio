export interface IProject {
  image: string;
  category: string[];
  name: string;
  description: string;
  link: string;
  github: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProjectsApiResponse {
  data: IProject[];
  meta: PaginationMeta;
}

export interface CategoriesApiResponse {
  data: string[];
}

export interface SingleProjectApiResponse {
  data: IProject;
}

// Helper function to convert project name to slug
export function projectToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}

// Helper function to convert slug back to find project
export function findProjectBySlug(slug: string): IProject | undefined {
  const ProjectsData = require('@/data').ProjectsData;
  return ProjectsData.find((p: IProject) => projectToSlug(p.name) === slug.toLowerCase());
}
