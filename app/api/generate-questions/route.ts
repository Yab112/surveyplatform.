import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title } = body;
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const response = await fetch(`${geminiUrl}?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: `Generate five engaging survey questions based on the topic: ${title}` },
      }),
    }); 

    const data = await response.json();


    
    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
    }

    const generatedText = data.candidates[0].output;
    const questions = generatedText.trim().split("\n").filter((q: string) => q.length > 0);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "AI Question Generation Failed" }, { status: 500 });
  }
}
















