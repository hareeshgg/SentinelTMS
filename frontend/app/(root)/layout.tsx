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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar role={"analyst"} />
      <main className="flex h-screen w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
