  export interface Response {
    id: string;
    surveyId: string;
    answers: string[];
    createdAt: Date;
  }


  export interface SurveyQuestion {
    id: string
    surveyId: string
    question: string
    typeresponse: "range" | "select" | "answer"
    options: string[]
    required?: boolean
  }
  
  export interface Survey {
    id: string
    title: string
    createdAt: string
    questions: SurveyQuestion[]
  }
  
  export interface SurveyResponse {
    survey: Survey
  }
  
  export interface SurveyAnswer {
    questionId: string
    answer: string
  }
  
  export interface SurveySubmission {
    answers: SurveyAnswer[]
  }
  
  // For the dashboard display
  export interface SurveyListItem {
    id: number
    title: string
    completion: number
    date: string
    status: string
  }
  
  export interface SurveyCreationCardProps {
    onSurveyGenerated: (survey: Survey) => void
  }