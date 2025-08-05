import { NextRequest, NextResponse } from 'next/server';
import { ProjectsData } from '@/data';
import { ProjectsApiResponse, IProject } from '@/model/projects';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    // Filter projects based on search and category
    let filteredProjects: IProject[] = [...ProjectsData];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.category.some(cat => cat.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (category) {
      filteredProjects = filteredProjects.filter(project =>
        project.category.some(cat => 
          cat.toLowerCase() === category.toLowerCase()
        )
      );
    }

    // Calculate pagination
    const total = filteredProjects.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Get paginated results
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    // Build response
    const response: ProjectsApiResponse = {
      data: paginatedProjects,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}