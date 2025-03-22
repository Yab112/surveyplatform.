// Mock survey generation service

export interface SurveyQuestion {
    id: string
    type: "multiple-choice" | "rating" | "text" | "yes-no"
    question: string
    options?: string[]
    required: boolean
  }
  
  export interface GeneratedSurvey {
    id: string
    title: string
    description: string
    questions: SurveyQuestion[]
    createdAt: string
  }
  
  // Mock function to simulate API call to generate a survey
  export async function generateSurvey(title: string): Promise<GeneratedSurvey> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
  
    // Generate a random ID
    const id = Math.random().toString(36).substring(2, 9)
  
    // Create mock questions based on the title
    let questions: SurveyQuestion[] = []
  
    if (title.toLowerCase().includes("customer") || title.toLowerCase().includes("satisfaction")) {
      questions = [
        {
          id: "1",
          type: "rating",
          question: "How satisfied are you with our product/service?",
          required: true,
        },
        {
          id: "2",
          type: "multiple-choice",
          question: "Which features do you use most frequently?",
          options: ["Feature A", "Feature B", "Feature C", "Feature D"],
          required: true,
        },
        {
          id: "3",
          type: "text",
          question: "What improvements would you suggest for our product/service?",
          required: false,
        },
        {
          id: "4",
          type: "yes-no",
          question: "Would you recommend our product/service to others?",
          required: true,
        },
      ]
    } else if (title.toLowerCase().includes("employee") || title.toLowerCase().includes("engagement")) {
      questions = [
        {
          id: "1",
          type: "rating",
          question: "How would you rate your job satisfaction?",
          required: true,
        },
        {
          id: "2",
          type: "multiple-choice",
          question: "Which aspects of your work environment do you value most?",
          options: ["Work-life balance", "Career growth", "Team collaboration", "Compensation"],
          required: true,
        },
        {
          id: "3",
          type: "text",
          question: "What suggestions do you have for improving workplace culture?",
          required: false,
        },
        {
          id: "4",
          type: "yes-no",
          question: "Do you feel your contributions are recognized?",
          required: true,
        },
      ]
    } else {
      // Generic survey questions
      questions = [
        {
          id: "1",
          type: "rating",
          question: "How would you rate your overall experience?",
          required: true,
        },
        {
          id: "2",
          type: "multiple-choice",
          question: "What aspects are most important to you?",
          options: ["Quality", "Price", "Service", "Convenience"],
          required: true,
        },
        {
          id: "3",
          type: "text",
          question: "Do you have any additional feedback?",
          required: false,
        },
        {
          id: "4",
          type: "yes-no",
          question: "Would you use this again in the future?",
          required: true,
        },
      ]
    }
  
    return {
      id,
      title,
      description: `AI-generated survey about ${title}`,
      questions,
      createdAt: new Date().toISOString(),
    }
  }
  
  // Mock function to submit survey responses
  export async function submitSurveyResponses(
    surveyId: string,
    responses: Record<string, unknown>,
  ): Promise<{ success: boolean; message: string }> {
    // Simulate network delay
    console.log(surveyId,responses)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Always return success for the mock
    return {
      success: true,
      message: "Survey responses submitted successfully!",
    }
  }
  
  