import prisma from "@/lib/db";

import HeaderBox from "@/components/HeaderBox";
import { userColumn } from "@/components/Transactions/Columns";
import DataTableDemo from "@/components/Transactions/DataTable";

export default async function users() {
  const data = await prisma.user.findMany();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="title"
            title="User Management"
            user={"Analyst"}
            subtext="Access & manage user accounts efficiently"
          />
        </header>

        <DataTableDemo columns={userColumn} data={data} component="user" />
      </div>
    </section>
  );
}
