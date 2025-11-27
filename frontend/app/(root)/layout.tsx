// import Sidebar from "@/components/Sidebar";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const loggedIn = "admin"; //would be types dynamically based on user session

//   return (
//     <main className="flex h-screen w-full">
//       <Sidebar role={loggedIn} />
//       {children}
//     </main>
//   );
// }

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar/AppSidebar";

import { ThemeProvider } from "@/components/Theme-Provider";

export default function Layout({ children }: { children: React.ReactNode }) {
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
              <AppSidebar role={"admin"} />
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
