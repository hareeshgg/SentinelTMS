import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = "admin"; //would be types dynamically based on user session

  return (
    <main className="flex h-screen w-full">
      <Sidebar role={loggedIn} />
      {children}
    </main>
  );
}
