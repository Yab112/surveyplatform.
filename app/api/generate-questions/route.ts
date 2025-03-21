import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {SurveyQuestion} from "../../types/survey"

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const prompt = `
      Generate five engaging survey questions based on the topic: "${title}".
      Each question should follow this JSON format:
      {
        "question": "Actual question text",
        "typeresponse": "range" or "select" or "comment",
        "options": ["option1", "option2"] (only if typeresponse is "select")
      }
      Do NOT include any extra text, just return a valid JSON array.
    `;

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

    // Parse the AI response into structured JSON
    let questions: SurveyQuestion[];
    try {
      questions = JSON.parse(data.candidates[0].content.parts[0].text);
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

    // **Save to Database**
    const newSurvey = await prisma.survey.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            question: q.question,
            typeresponse: q.typeresponse,
            options: q.options || [],
          })),
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
