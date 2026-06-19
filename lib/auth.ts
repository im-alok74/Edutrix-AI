import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? `${userId}@edutrix.local`;

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email,
      name: clerkUser?.fullName ?? clerkUser?.firstName ?? "Learner",
      imageUrl: clerkUser?.imageUrl
    },
    create: {
      clerkId: userId,
      email,
      name: clerkUser?.fullName ?? clerkUser?.firstName ?? "Learner"
    }
  });
}
