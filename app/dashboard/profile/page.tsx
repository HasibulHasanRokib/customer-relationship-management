import { UserProfile } from "@/components/profile/user-profile";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Your Profile</h1>
      <UserProfile />
    </div>
  );
}
