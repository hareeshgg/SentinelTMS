import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";

import { ThemeProvider } from "@/components/Theme-Provider";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const user = session?.user as
    | { name?: string | null; email?: string | null; role?: string | null }
    | undefined;

  const role = (user?.role ?? "GUEST").toUpperCase();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar
                user={{
                  name: user?.name ?? "Guest",
                  email: user?.email ?? "",
                  role,
                }}
              />
              <main className="flex h-screen w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
