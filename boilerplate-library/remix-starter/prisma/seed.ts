import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.upsert({
    where: { slug: "hello-remix" },
    update: {},
    create: {
      title: "Hello Remix",
      slug: "hello-remix",
      content:
        "Welcome to the Remix starter. Loaders fetch this post from Postgres via Prisma.",
    },
  });

  await prisma.post.upsert({
    where: { slug: "progressive-enhancement" },
    update: {},
    create: {
      title: "Progressive Enhancement",
      slug: "progressive-enhancement",
      content:
        "Remix leans on web standards so forms and links work even before client JS hydrates.",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
