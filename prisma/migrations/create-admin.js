
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@domestictravel.com";
    const password = "skyfly@0001";

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
        where: { email },
        update: {
            name: "Admin",
            password: hashedPassword,
        },
        create: {
            name: "Admin",
            email,
            password: hashedPassword,
        },
    });

    console.log("Admin user created successfully");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
