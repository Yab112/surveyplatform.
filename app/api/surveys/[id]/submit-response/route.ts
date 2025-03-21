import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; 

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { answers } = body; // Array of { questionId, answer }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: "Answers are required" },
        { status: 400 }
      );
    }

    // Fetch the survey and its questions
    const survey = await prisma.survey.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    // Ensure all survey questions are answered
    const questionIds = survey.questions.map((q) => q.id);
    const answeredQuestionIds = answers.map((a) => a.questionId);
    const missingQuestions = questionIds.filter(
      (qid) => !answeredQuestionIds.includes(qid)
    );

    if (missingQuestions.length > 0) {
      return NextResponse.json(
        { error: "All questions must be answered" },
        { status: 400 }
      );
    }

    // Create response and answers
    const response = await prisma.response.create({
      data: {
        surveyId: id,
        answers: {
          create: answers.map(({ questionId, answer }) => ({
            questionId,
            answer,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Response submitted successfully", response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting response:", error);
    return NextResponse.json(
      { error: "Failed to submit response" },
      { status: 500 }
    );
  }
}
