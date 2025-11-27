import AuthForm from "@/components/AuthForm";
import { Section, SectionIcon } from "lucide-react";
import React from "react";

const SignIn = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" work="form" />
    </section>
  );
};

export default SignIn;
