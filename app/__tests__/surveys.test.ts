// import { NextRequest } from 'next/server';
// import prisma from '../lib/prisma';
// import { Survey, Response } from '@prisma/client'; // Import your Prisma models
// import { GET } from '../api/surveys/route';

// // Mock the prisma client
// jest.mock('../../lib/prisma', () => ({
//   survey: {
//     findMany: jest.fn(),
//   },
// }));

// // TypeScript type for the mocked findMany method
// const mockFindMany = prisma.survey.findMany as jest.MockedFunction<typeof prisma.survey.findMany>;

// describe('GET /api/surveys', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return a list of surveys with responses', async () => {
//     // Mock the request objectj
//     const req = new NextRequest('http://localhost/api/surveys');

//     // Mock the prisma response
//     const mockSurveys: (Survey & { responses: Response[] })[] = [
//       {
//         id: "1",
//         title: 'Survey 1',
//         createdAt: new Date(),
//         questions:["are you working on weekend","for real"],
//         responses: [
//           {
//             id: "1",
//             surveyId: "1",
//             createdAt: new Date(),
//             answers:["yes","no"]
//           },
//         ],
//       },
//     ];
//     mockFindMany.mockResolvedValue(mockSurveys);

//     // Call the GET function
//     const response = await GET(req);

//     // Check the response status and data
//     expect(response.status).toBe(200);
//     const data = await response.json();
//     expect(data).toEqual(mockSurveys);
//     expect(mockFindMany).toHaveBeenCalledWith({
//       include: { responses: true },
//     });
//   });

//   it('should return a 500 error if the database query fails', async () => {
//     // Mock the request object
//     const req = new NextRequest('http://localhost/api/surveys');

//     // Mock the prisma error
//     mockFindMany.mockRejectedValue(new Error('Database Error'));

//     // Call the GET function
//     const response = await GET(req);

//     // Check the response status and error message
//     expect(response.status).toBe(500);
//     const data = await response.json();
//     expect(data).toEqual({ error: 'Database Error' });
//   });
// });