"use client";

import { useState, useEffect, useCallback } from 'react';
import { IProject, PaginationParams, PaginationMeta } from '@/model/projects';
import { ProjectsApiService } from '@/lib/api/projects';

interface UseProjectsReturn {
  projects: IProject[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  fetchProjects: (params?: Partial<PaginationParams>) => Promise<void>;
  refetch: () => Promise<void>;
  categories: string[];
  loadingCategories: boolean;
  categoriesError: string | null;
}

export const useProjects = (initialParams?: PaginationParams): UseProjectsReturn => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<PaginationParams>({
    page: 1,
    limit: 6,
    ...initialParams,
  });

  const fetchProjects = useCallback(async (params?: Partial<PaginationParams>) => {
    try {
      setLoading(true);
      setError(null);
      
      const newParams = { ...currentParams, ...params };
      setCurrentParams(newParams);
      
      const response = await ProjectsApiService.getProjects(newParams);
      
      setProjects(response.data);
      setMeta(response.meta);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching projects';
      setError(errorMessage);
      setProjects([]);
      setMeta(null);
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, [currentParams]);

  const refetch = useCallback(() => {
    return fetchProjects();
  }, [fetchProjects]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
        const cats = await ProjectsApiService.getCategories();
        setCategories(cats);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
        setCategoriesError(errorMessage);
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    meta,
    loading,
    error,
    fetchProjects,
    refetch,
    categories,
    loadingCategories,
    categoriesError,
  };
};