import { PrismaClient, ExamType, QuestionType, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const subject = await prisma.subject.upsert({
    where: { name_exam: { name: "Physics", exam: ExamType.JEE } },
    update: {},
    create: { name: "Physics", exam: ExamType.JEE }
  });

  const topic = await prisma.topic.upsert({
    where: { subjectId_name: { subjectId: subject.id, name: "Kinematics" } },
    update: {},
    create: {
      subjectId: subject.id,
      name: "Kinematics",
      description: "Motion in one and two dimensions",
      order: 1
    }
  });

  await prisma.question.createMany({
    data: [
      {
        topicId: topic.id,
        type: QuestionType.MCQ,
        difficulty: Difficulty.EASY,
        prompt: "A body starts from rest with uniform acceleration 2 m/s^2. What is its velocity after 5 seconds?",
        options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
        answer: { option: 1 },
        explanation: "Use v = u + at. Here u = 0, a = 2, t = 5, so v = 10 m/s.",
        tags: ["formula", "basics"]
      },
      {
        topicId: topic.id,
        type: QuestionType.NUMERICAL,
        difficulty: Difficulty.MEDIUM,
        prompt: "A projectile has time of flight 4 seconds. Find its initial vertical velocity in m/s. Take g = 10 m/s^2.",
        answer: { value: 20 },
        explanation: "For projectile motion, T = 2u_y/g. Therefore u_y = Tg/2 = 20 m/s.",
        tags: ["projectile", "numerical"]
      }
    ],
    skipDuplicates: true
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
