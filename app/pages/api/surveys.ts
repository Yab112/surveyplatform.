import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const surveys = await prisma.survey.findMany({
      include: { responses: true },
    });

    return res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return res.status(500).json({ error: "Database Error" });
  }
}
