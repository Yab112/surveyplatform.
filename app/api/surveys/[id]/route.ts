import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {params}: { params: Promise<{ id: string }> }

) {
  try {
    const respos = await params
    const {id} = await params
    console.log(respos)
    if (!id) {
      return NextResponse.json({ error: 'Survey ID is required' }, { status: 400 });
    }

    // Fetch survey with its questions and responses
    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        questions: true,
        responses: true,
      },
    });

    if (!survey) {
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }

    return NextResponse.json({ survey }, { status: 200 });
  } catch (error) {
    console.error('Error fetching survey:', error);
    return NextResponse.json(
      { error: 'Failed to fetch survey' },
      { status: 500 }
    );
  }
}
