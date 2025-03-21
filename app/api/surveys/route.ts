import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma"; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const surveys = await prisma.survey.findMany({
      include: { responses: true },
    });

    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}
