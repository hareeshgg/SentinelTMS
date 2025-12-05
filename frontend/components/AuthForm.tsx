"use client";

import Link from "next/link";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "./CustomInput";

import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
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
import { userProps } from "@/constants";
import { useRouter } from "next/navigation";

type AuthMode = "sign-in" | "sign-up" | "create" | "edit";

interface authFormProps {
  mode: AuthMode;
  data?: userProps;
}

const AuthForm = ({ mode, data }: authFormProps) => {
  const router = useRouter();

  const isSignIn = mode === "sign-in";
  const isAuthPage = mode === "sign-in" || mode === "sign-up";
  const isManage = mode === "create" || mode === "edit";
  const isEdit = mode === "edit";

  const [isLoading, setIsloading] = React.useState(false);

  const formSchema = authFormSchema(mode);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      phone: data?.phone ?? "",
      dob: data?.dob ?? "",
      city: data?.city ?? "",
      email: data?.email ?? "",
      password: "", // usually don’t prefill
      role: data?.role ?? "",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMIT CALLED", { mode, values });
      setIsloading(true);

      if (mode === "sign-in") {
        // sign-in
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Login failed");

        // maybe redirect
        router.push("/");
      } else if (mode === "sign-up") {
        // sign-up
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Sign up failed");
        router.push("/sign-in");
      } else if (mode === "edit" && data?.id) {
        console.log("EDIT FETCH", {
          id: data.id,
          url: `/api/users/${data.id}`,
        });
        // admin user management - UPDATE user
        const res = await fetch(`/api/users/${data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Update user failed");
        router.refresh();
      } else if (mode === "create") {
        // admin user management - CREATE user by admin
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Create user failed");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      // TODO: show shadcn toast with error
    } finally {
      setIsloading(false);
    }
  };

  // optional helper to see validation errors while debugging
  const handleInvalid = (errors: any) => {
    console.log("VALIDATION ERRORS", errors);
  };

  const showNameFields =
    mode === "sign-up" || mode === "create" || mode === "edit";
  const showSignupExtraFields = mode === "sign-up";
  const showPasswordField =
    mode === "sign-in" || mode === "sign-up" || mode === "create";

  return (
    <section
      className={
        `flex w-full max-w-[420px] flex-col justify-center gap-1 py-5 md:gap-8 rounded-md ` +
        (isAuthPage ? "min-h-screen" : "")
      }
    >
      {isAuthPage && (
        <header className="flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-[24px] leading-[30px] lg:text-[36px] leading-[44px] font-semibold text-gray-900">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            <p className="text-[16px] font-normal text-gray-600">
              {isSignIn ? "Please enter your details" : "Create your account"}
            </p>
          </div>
        </header>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, handleInvalid)}
          className="space-y-8"
        >
          {showNameFields && (
            <div className="flex gap-4">
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
          )}

          {showSignupExtraFields && (
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

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          {showPasswordField && (
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
          )}

          {isManage && (
            <Field>
              <FieldLabel htmlFor="user_role">Role</FieldLabel>
              <Select
                defaultValue={data?.role ?? ""}
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

          {isAuthPage ? (
            <div className="flex flex-col gap-4">
              <Button type="submit" className="form-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> &nbsp;
                    Loading...
                  </>
                ) : isSignIn ? (
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
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> &nbsp;
                      Loading...
                    </>
                  ) : isEdit ? (
                    "Save Changes"
                  ) : (
                    "Create User"
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </form>
      </Form>

      {isAuthPage && (
        <footer className="flex justify-center gap-1">
          <p className="text-[14px] font-normal text-gray-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="form-link">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </footer>
      )}
    </section>
  );
};

export default AuthForm;
