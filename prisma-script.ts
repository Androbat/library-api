import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user = {
    email: "manuelreyesjimenez@gmail.com",
    username: "Androbat",
    password: "Lolo2021",
  };

  const createNewUser = await prisma.user.create({ data: user });
  console.log(createNewUser);
}

main()
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
