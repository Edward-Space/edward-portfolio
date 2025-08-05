import { NextRequest, NextResponse } from 'next/server';
import { ProjectsData } from '@/data';
import { SingleProjectApiResponse, projectToSlug } from '@/model/projects';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Project slug is required' },
        { status: 400 }
      );
    }

    // Find project by converting name to slug format
    const project = ProjectsData.find(p => 
      projectToSlug(p.name) === slug.toLowerCase()
    );

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const response: SingleProjectApiResponse = {
      data: project
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}