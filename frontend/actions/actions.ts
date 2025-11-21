"use server";

import prisma from "@/lib/db";

export async function createUser(formData: FormData) {
  await prisma.user.create({
    data: {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
      dob: formData.get("dob") as string,
      city: formData.get("city") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
  });
}

// "use server";

// import prisma from "@/lib/db";

// export async function createUser(formData: FormData) {
//   try {
//     const firstName = formData.get("firstName") as string | null;
//     const lastName = formData.get("lastName") as string | null;
//     const phone = formData.get("phone") as string | null;
//     const dobStr = formData.get("dob") as string | null; // YYYY-MM-DD
//     const city = formData.get("city") as string | null;
//     const email = formData.get("email") as string | null;
//     const password = formData.get("password") as string | null;

//     // transform dob if present and if your Prisma field is DateTime
//     const dob = dobStr ? new Date(dobStr) : null;

//     const user = await prisma.user.create({
//       data: {
//         firstName: firstName ?? "",
//         lastName: lastName ?? "",
//         phone: phone ?? "",
//         dob: dob, // or omit if null and your schema requires it
//         city: city ?? "",
//         email: email ?? "",
//         password: password ?? "",
//       },
//     });

//     return user; // optional
//   } catch (err) {
//     console.error("createUser error:", err);
//     throw err;
//   }
// }
