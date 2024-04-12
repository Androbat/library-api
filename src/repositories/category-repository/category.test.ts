const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

  const category = await prisma.category.create({
    data: {
      name: 'Plastic Dick',
    },
  })


  const product = await prisma.product.create({
    data: {
      name: 'Amazing Dick 3000',
      price: 20,
      categoryId: category.id,
      description: "Someone gay"
    },
  })
	
	
  console.log(product)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
