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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Field, FieldLabel } from "./ui/field";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogFooter } from "./ui/dialog";

const AuthForm = ({ type, work }: { type: string; work: string }) => {
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
      role: "",
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
    <section
      className={
        `flex w-full max-w-[420px] flex-col justify-center gap-1 py-5 md:gap-8 rounded-md ` +
        (work === "form" ? "min-h-screen" : "")
      }
    >
      {work === "form" && (
        <header className="flex flex-col gap-5 md:gap-8">
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
      )}
      {user ? (
        <div className="flex flex-col gap-4">Hi</div>
      ) : (
        <>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              action={createUser}
              className="space-y-8"
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
                  {work === "form" && (
                    <>
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
              {work === "manage" && (
                <Field>
                  <FieldLabel htmlFor="user_role">Role</FieldLabel>
                  <Select
                    onValueChange={(value) => form.setValue("role", value)}
                  >
                    <SelectTrigger id="user_role">
                      <SelectValue placeholder="Assign Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="ANALYST">ANALYST</SelectItem>
                      <SelectItem value="OFFICER">OFFICER</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* ensure role is part of submitted data */}
                  <input type="hidden" {...form.register("role")} />
                </Field>
              )}

              {work === "form" ? (
                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="form-btn"
                    disabled={isLoading}
                  >
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
              ) : (
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="form-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> &nbsp;
                          Loading...
                        </>
                      ) : (
                        "Save User"
                      )}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              )}
            </form>
          </Form>

          {work === "form" && (
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
          )}
        </>
      )}
    </section>
  );
};

export default AuthForm;
