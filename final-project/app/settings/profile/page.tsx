"use client";

import { ProfileEditForm } from "@/components/profile-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettingsPage() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen glass flex flex-col py-12 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      <div className="max-w-4xl w-full mx-auto">
      <div className="mb-6 sm:mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 w-full sm:w-auto justify-start sm:justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl font-bold font-heading mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and public presence
        </p>
      </div>

      <div className="space-y-6">
        <ProfileEditForm />
      </div>
      </div>
    </section>
  );
}

