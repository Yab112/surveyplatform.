import { NextRequest } from "next/server";
import { GET } from "../api/surveys/[id]/route"; // Adjust the import path based on your file structure
import { PrismaClient } from "@prisma/client";

// Mock PrismaClient
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    survey: {
      findUnique: jest.fn(),
    },
  })),
}));

const prisma = new PrismaClient();

describe("GET /api/survey/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if survey ID is missing", async () => {
    const req = new NextRequest("http://localhost/api/survey/");
    const params = { id: "" };

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Survey ID is required");
  });

  it("should return 404 if survey is not found", async () => {
    const req = new NextRequest("http://localhost/api/survey/123");
    const params = { id: "123" };

    (prisma.survey.findUnique as jest.Mock).mockResolvedValue(null);

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("Survey not found");
  });

  it("should return 200 and the survey data if found", async () => {
    const req = new NextRequest("http://localhost/api/survey/123");
    const params = { id: "123" };

    const mockSurvey = {
      id: "123",
      title: "Test Survey",
      questions: [{ id: "1", text: "Question 1" }],
      responses: [{ id: "1", answer: "Answer 1" }],
    };

    (prisma.survey.findUnique as jest.Mock).mockResolvedValue(mockSurvey);

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.survey).toEqual(mockSurvey);
  });

  it("should return 500 if there is a server error", async () => {
    const req = new NextRequest("http://localhost/api/survey/123");
    const params = { id: "123" };

    (prisma.survey.findUnique as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await GET(req, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to fetch survey");
  });
});