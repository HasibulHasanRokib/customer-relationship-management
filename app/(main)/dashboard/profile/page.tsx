import { UserProfile } from "@/components/profile/user-profile";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }

  const contacts = await db.contact.count({
    where: {
      userId: currentUser.id,
    },
  });
  const deals = await db.deals.count({
    where: {
      userId: currentUser.id,
    },
  });
  const leads = await db.lead.count({
    where: {
      userId: currentUser.id,
    },
  });
  const tasks = await db.task.count({
    where: {
      userId: currentUser.id,
    },
  });

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>
      <UserProfile
        currentUser={currentUser}
        contacts={contacts}
        leads={leads}
        tasks={tasks}
        deals={deals}
      />
    </div>
  );
}
