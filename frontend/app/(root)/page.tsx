import { Chart } from "@/components/Chart";
import HeaderBox from "@/components/HeaderBox";
import React from "react";

const Home = () => {
  const loggedIn = { user: "Admin" };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome, "
            user={loggedIn.user || "Analyst"}
            subtext="Access & manage your accounts efficiently"
          />
        </header>
        <Chart />
      </div>
    </section>
  );
};

export default Home;
