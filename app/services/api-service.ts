import { Survey, SurveyAnswer } from "../types/survey"

// Function to generate survey questions
export async function generateSurveyQuestions(title: string): Promise<Survey> {
  try {
    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })

    if (!response.ok) {
      throw new Error(`Error generating survey: ${response.statusText}`)
    }

    const data = await response.json()
    return data.survey
  } catch (error) {
    console.error("Error generating survey questions:", error)
    throw error
  }
}

// Function to submit survey responses
export async function submitSurveyResponses(
  surveyId: string,
  answers: SurveyAnswer[],
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`/api/surveys/${surveyId}/submit-response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    })

    if (!response.ok) {
      throw new Error(`Error submitting survey: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      message: data.message || "Survey responses submitted successfully!",
    }
  } catch (error) {
    console.error("Error submitting survey responses:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

