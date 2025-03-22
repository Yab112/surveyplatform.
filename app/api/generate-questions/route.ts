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

    // Extract text response and remove Markdown code blocks
    let rawText = data.candidates[0].content.parts[0].text.trim();
    if (rawText.startsWith("```json")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    // Parse JSON safely
    let questions: SurveyQuestion[];
    try {
      questions = JSON.parse(rawText);
      if (!Array.isArray(questions)) throw new Error("Invalid JSON format");

      // Validate questions
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

    // **Fix Prisma create issue**
    const newSurvey = await prisma.survey.create({
      data: {
        title,
        questions: {
          createMany: {
            data: questions.map((q) => ({
              question: q.question,
              typeresponse: q.typeresponse,
              options: q.options || [],
            })),
          },
        },
      },
      include: { questions: true },
    });
    
    

    return NextResponse.json({ survey: newSurvey }, { status: 201 });
  } catch (error) {
    console.error("Error generating survey:", error);
    return NextResponse.json(
      { error: "Survey generation failed" },
      { status: 500 }
    );
  }
}
