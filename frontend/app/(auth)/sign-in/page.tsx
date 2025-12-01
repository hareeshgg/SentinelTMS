import AuthForm from "@/components/AuthForm";
import { Section, SectionIcon } from "lucide-react";
import React from "react";

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm mode="sign-in" />
    </section>
  );
};

export default SignIn;
