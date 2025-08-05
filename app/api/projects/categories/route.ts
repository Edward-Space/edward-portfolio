import { NextRequest, NextResponse } from 'next/server';
import { ProjectsData } from '@/data';
import { CategoriesApiResponse } from '@/model/projects';

export async function GET(request: NextRequest) {
  try {
    // Extract all unique categories from projects
    const allCategories = ProjectsData.flatMap(project => project.category);
    const uniqueCategories = [...new Set(allCategories)].sort();

    const response: CategoriesApiResponse = {
      data: uniqueCategories
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}