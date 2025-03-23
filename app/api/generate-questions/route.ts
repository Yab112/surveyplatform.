import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SurveyQuestion } from "@/app/types/survey";
import { Geminiprompt, geminiUrl } from "@/app/lib/constat";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Generate questions using Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const prompt = Geminiprompt(title);

    const response = await fetch(`${geminiUrl}?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate questions" },
        { status: 500 }
      );
    }

    // Extract text response and clean it
    let rawText = data.candidates[0].content.parts[0].text.trim();
    if (rawText.startsWith("```json")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    // Parse and validate JSON response
    let questions: SurveyQuestion[];
    try {
      questions = JSON.parse(rawText);
      if (!Array.isArray(questions)) throw new Error("Invalid JSON format");

      questions.forEach((q) => {
        if (!q.question || !q.typeresponse) {
          throw new Error("Invalid question format");
        }
        if (q.typeresponse === "select" && !Array.isArray(q.options)) {
          throw new Error("Missing or invalid options for 'select' question");
        }
      });
    } catch (err) {
      console.error("Error parsing AI response:", err);
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 500 }
      );
    }

    // Step 1: Create the survey (without questions)
    const newSurvey = await prisma.survey.create({
      data: { title },
    });

    // Step 2: Create the questions and link them to the survey
    if (questions.length > 0) {
      await prisma.question.createMany({
        data: questions.map((q) => ({
          surveyId: newSurvey.id,
          question: q.question,
          typeresponse: q.typeresponse,
          options: q.options || [],
        })),
      });
    }

    // Fetch the survey again to include related questions
    const surveyWithQuestions = await prisma.survey.findUnique({
      where: { id: newSurvey.id },
      include: { questions: true },
    });

    return NextResponse.json({ survey: surveyWithQuestions }, { status: 201 });
  } catch (error) {
    console.error("Error generating survey:", error);
    return NextResponse.json(
      { error: "Survey generation failed" },
      { status: 500 }
    );
  }
}
