import AuthForm from "@/components/AuthForm";
import { Section, SectionIcon } from "lucide-react";
import React from "react";

const SignUp = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" work="form" />
    </section>
  );
};

export default SignUp;
