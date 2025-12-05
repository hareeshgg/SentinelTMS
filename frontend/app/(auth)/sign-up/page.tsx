import AuthForm from "@/components/AuthForm";
import { auth } from "@/lib/auth";
import { Section, SectionIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm mode="sign-up" />
    </section>
  );
};

export default SignUp;
