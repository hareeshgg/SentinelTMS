import prisma from "@/lib/db";

import HeaderBox from "@/components/HeaderBox";
import { columns } from "@/components/Transactions/Columns";
import DataTableDemo from "@/components/Transactions/DataTable";

export default async function DemoPage() {
  const data = await prisma.transaction.findMany();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="title"
            title="Transactions"
            user={"Analyst"}
            subtext="Access & manage your accounts efficiently"
          />
        </header>

        <DataTableDemo columns={columns} data={data} />
      </div>
    </section>
  );
}
