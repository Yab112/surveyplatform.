export const geminiUrl: string =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// export const prompt:string = `
// Generate five engaging survey questions based on the topic: "${title}".
// Each question should follow this strict JSON format:
// [
//   {
//     "question": "Actual question text",
//     "typeresponse": "range" , "select" or "answer",
//     "options": ["option1", "option2"] (only if typeresponse is "select")
//   }
// ]
// Do NOT include any extra text, just return a valid JSON array.
// `;

export const Geminiprompt = (title: string) => {
  return `
Generate five engaging survey questions based on the topic: "${title}".
Each question should follow this strict JSON format:
[
  {
    "question": "Actual question text",
    "typeresponse": "range" , "select" or "answer",
    "options": ["option1", "option2"] (only if typeresponse is "select")
  }
]
Do NOT include any extra text, just return a valid JSON array.
`;
};
