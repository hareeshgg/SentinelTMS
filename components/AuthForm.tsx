"use client";

import Link from "next/link";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "./CustomInput";

import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { createUser } from "@/actions/actions";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setuser] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dob: "",
      city: "",
      email: "",
      password: "",
    },
  });

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   setIsloading(true);
  //   console.log(values);
  //   setIsloading(false);
  // }

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
          <h1 className="text-[26px] leading-[32px] font-bold text-black-1">
            SentinelTMS
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] leading-[30px] lg:text-[36px] leading-[44px] font-semibold text-gray-900">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-[16px] font-normal text-gray-600">
            {type === "sign-in"
              ? "Please enter your details"
              : "Create your account"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">Hi</div>
      ) : (
        <>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              action={createUser}
              className="space-y-8"
              method="POST"
            >
              {type === "sign-up" && (
                <>
                  <div className="flex  gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Eg. John"
                    />

                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Eg. Doe"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="+91 996 750 7211"
                  />

                  <div className="flex  gap-4">
                    <CustomInput
                      control={form.control}
                      name="dob"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />

                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Example: New York"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-[14px] font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
