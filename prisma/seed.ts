import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.survey.create({
    data: {
      title: "Customer Feedback",
      questions: ["How was your experience?", "What can we improve?"],
      responses: {
        create: [{ answers: ["Great!", "More variety in products"] }],
      },
    },
  });
}

main()
  .then(() => {
    console.log("Database seeded successfully!");
  })
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
