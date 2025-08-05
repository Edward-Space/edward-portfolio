import { IProject, ProjectsApiResponse, PaginationParams, CategoriesApiResponse, SingleProjectApiResponse } from "@/model/projects";

// API service for real Next.js API routes
export class ProjectsApiService {
  private static getBaseUrl(): string {
    // For client-side requests, use relative URLs
    if (typeof window !== 'undefined') {
      return '';
    }
    // For server-side requests, use full URL
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
  
  // Get projects with pagination
  static async getProjects(params: PaginationParams): Promise<ProjectsApiResponse> {
    try {
      const { page = 1, limit = 6, search = '', category = '' } = params;
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);
      
      const response = await fetch(`${this.getBaseUrl()}/api/projects?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ProjectsApiResponse = await response.json();
      
      // Validate response structure
      if (!data.data || !data.meta) {
        throw new Error('Invalid response format from API');
      }

      return data;
    } catch (error) {
      console.error('ProjectsApiService.getProjects error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch projects'
      );
    }
  }
  
  // Get all categories for filter
  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.getBaseUrl()}/api/projects/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: CategoriesApiResponse = await response.json();
      
      // Validate response structure
      if (!result.data || !Array.isArray(result.data)) {
        throw new Error('Invalid response format from categories API');
      }

      return result.data;
    } catch (error) {
      console.error('ProjectsApiService.getCategories error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch categories'
      );
    }
  }
  
  // Get project by slug
  static async getProjectBySlug(slug: string): Promise<IProject | null> {
    try {
      if (!slug) {
        throw new Error('Project slug is required');
      }

      const response = await fetch(`${this.getBaseUrl()}/api/projects/${encodeURIComponent(slug)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: SingleProjectApiResponse = await response.json();
      
      // Validate response structure
      if (!result.data) {
        throw new Error('Invalid response format from project API');
      }

      return result.data;
    } catch (error) {
      console.error('ProjectsApiService.getProjectBySlug error:', error);
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch project'
      );
    }
  }

  // Helper method to convert project name to slug
  static projectNameToSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  }

  // Helper method to convert slug back to search for project
  static slugToProjectName(slug: string): string {
    return slug.replace(/-/g, ' ');
  }

  // Test API connectivity
  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.getBaseUrl()}/api/projects?page=1&limit=1`);
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}