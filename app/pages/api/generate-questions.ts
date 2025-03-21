import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    // Use Google Gemini API
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

    const response = await fetch(`${geminiUrl}?key=${geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: {
          text: `Generate five engaging survey questions based on the topic: ${title}`,
        },
      }),
    });

    const data = await response.json();

    // Extract questions from the Gemini response
    if (!data.candidates || data.candidates.length === 0) {
      return res.status(500).json({ error: "Failed to generate questions" });
    }

    const generatedText = data.candidates[0].output;
    const questions = generatedText.trim().split("\n").filter((q: string) => q.length > 0);

    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return res.status(500).json({ error: "AI Question Generation Failed" });
  }
}
