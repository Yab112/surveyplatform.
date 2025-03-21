export interface Survey {
    id: string;
    title: string;
    questions: string[];
    responses: Response[];
    createdAt: Date;
  }
  
  export interface Response {
    id: string;
    surveyId: string;
    answers: string[];
    createdAt: Date;
  }


  export interface SurveyQuestion {
    question: string;
    typeresponse: "range" | "select";
    options?: string[];
  }
  
  