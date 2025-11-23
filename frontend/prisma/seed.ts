// prisma/seed.ts
import prisma from "../lib/db";
import { faker } from "@faker-js/faker";

async function main() {
  // --- Branches
  const branchData = [
    { code: "BR-DEL-01", name: "Delhi Central", city: "Delhi" },
    { code: "BR-MUM-01", name: "Mumbai Main", city: "Mumbai" },
    { code: "BR-BLR-01", name: "Bengaluru Central", city: "Bengaluru" },
    { code: "BR-HYD-01", name: "Hyderabad Main", city: "Hyderabad" },
    { code: "BR-CHE-01", name: "Chennai Central", city: "Chennai" },
  ];

  const branches = [];
  for (const b of branchData) {
    const br = await prisma.branch.create({ data: b });
    branches.push(br);
  }

  // --- Customers
  const customers = [];
  const CUSTOMER_COUNT = 30;
  for (let i = 0; i < CUSTOMER_COUNT; i++) {
    const fullName = faker.person.fullName();
    // generate safe email from name
    const firstName = fullName.split(" ")[0] ?? `user${i}`;
    const email = faker.internet.email({ firstName }).toLowerCase();
    const phone = "+91" + faker.string.numeric(10);

    const cust = await prisma.customer.create({
      data: {
        name: fullName,
        email,
        phone,
      },
    });
    customers.push(cust);
  }

  // --- Accounts for customers (1-3 each)
  const accounts = [];
  let accountCounter = 1000000000;
  for (const cust of customers) {
    const numAccounts = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numAccounts; i++) {
      const branch = faker.helpers.arrayElement(branches);
      accountCounter++;
      const account_no = `SBIN${accountCounter}`;

      const acc = await prisma.account.create({
        data: {
          account_no,
          type: faker.helpers.arrayElement([
            "SAVINGS",
            "CURRENT",
            "SALARY",
          ]) as any,
          status: faker.helpers.arrayElement([
            "ACTIVE",
            "DORMANT",
            "FROZEN",
          ]) as any,
          openingDate: faker.date.past({ years: 5 }),
          customerId: cust.id,
          branchId: branch.id,
        },
      });
      accounts.push(acc);
    }
  }

  // --- Transactions (50)
  const TX_COUNT = 50;
  const transactions = [];
  for (let i = 0; i < TX_COUNT; i++) {
    const isInternal = faker.datatype.boolean();
    const accA = faker.helpers.arrayElement(accounts);
    let accB = faker.helpers.arrayElement(accounts);

    if (isInternal) {
      // ensure different accounts for internal tx
      while (accB && accB.id === accA.id && accounts.length > 1) {
        accB = faker.helpers.arrayElement(accounts);
      }
    }

    const amount = parseFloat(
      faker.finance.amount({ min: 10, max: 200000, dec: 2 })
    );
    const status = faker.helpers.arrayElement([
      "PENDING",
      "COMPLETED",
      "FAILED",
    ]) as any;
    const type = faker.helpers.arrayElement([
      "CREDIT",
      "DEBIT",
      "TRANSFER",
      "UPI",
    ]) as any;
    const risk_score = faker.number.int({ min: 1, max: 100 });
    const reference = `REF-${faker.string.alphanumeric(10).toUpperCase()}`;

    const base: any = {
      date: faker.date.recent({ days: 90 }),
      status,
      type,
      risk_score,
      amount,
      currency: "INR",
      description: faker.lorem.sentence(),
      reference,
    };

    if (isInternal) {
      const tx = await prisma.transaction.create({
        data: {
          ...base,
          benefactorAccountId: accA.id,
          beneficiaryAccountId: accB.id,
        },
      });
      transactions.push(tx);
    } else {
      const externalIsBeneficiary = faker.datatype.boolean();
      if (externalIsBeneficiary) {
        // internal sender -> external receiver
        const tx = await prisma.transaction.create({
          data: {
            ...base,
            benefactorAccountId: accA.id,
            beneficiary_account_no: faker.finance.iban({ countryCode: "IN" }),
          },
        });
        transactions.push(tx);
      } else {
        // external sender -> internal receiver
        const tx = await prisma.transaction.create({
          data: {
            ...base,
            beneficiaryAccountId: accA.id,
            benefactor_account_no: faker.finance.iban({ countryCode: "IN" }),
          },
        });
        transactions.push(tx);
      }
    }
  }

  console.log(`Created ${branches.length} branches`);
  console.log(`Created ${customers.length} customers`);
  console.log(`Created ${accounts.length} accounts`);
  console.log(`Created ${transactions.length} transactions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
