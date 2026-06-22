import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getSession() {
  return await auth();
}
