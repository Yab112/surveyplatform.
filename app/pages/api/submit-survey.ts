import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { title, questions, responses } = req.body;

    if (!title || !questions || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: "All fields are required" });
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

    return res.status(201).json({ message: "Survey submitted successfully", survey });
  } catch (error) {
    console.error("Error submitting survey:", error);
    return res.status(500).json({ error: "Database Error" });
  }
}
