import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 
    const { title, questions, responses } = body;

    if (!title || !questions || !responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const survey = await prisma.survey.create({
      data: {
        title,
        questions,
        responses: {
          create: responses.map((response: { answers: string[] }) => ({
            answers: response.answers,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Survey submitted successfully", survey }, { status: 201 });
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}
