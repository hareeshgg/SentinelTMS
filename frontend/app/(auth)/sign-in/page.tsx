import AuthForm from "@/components/AuthForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm mode="sign-in" />
    </section>
  );
};

export default SignIn;
