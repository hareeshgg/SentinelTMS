import { Chart } from "@/components/Chart";
import HeaderBox from "@/components/HeaderBox";
import { auth } from "@/lib/auth";

const Home = async () => {
  const session = await auth();
  const user = session?.user as { name?: string };

  const name = user?.name ?? "GUEST";

  console.log("root", name);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome, "
            user={name}
            subtext="Access & manage your accounts efficiently"
          />
        </header>
        <Chart />
      </div>
    </section>
  );
};

export default Home;
