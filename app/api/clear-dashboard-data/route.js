import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    // Очищаємо дані з таблиць
    await db.industryInsight.deleteMany();  // Очищаємо інсайти
    await db.user.updateMany({ data: { industry: null } });  // Очищаємо індустрії користувачів
    await db.coverLetter.deleteMany();  // Очищаємо coverLetters
    await db.assessment.deleteMany();  // Очищаємо assessments
    await db.resume.deleteMany();  // Очищаємо резюме користувачів

    return new Response(JSON.stringify({ message: 'Data cleared successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error clearing data:', error);
    return new Response(JSON.stringify({ error: 'Error clearing data' }), { status: 500 });
  }
}
