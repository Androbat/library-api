/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_productId_fkey";

-- DropIndex
DROP INDEX "Category_productId_key";

-- DropIndex
DROP INDEX "Product_categoryId_key";

-- DropIndex
DROP INDEX "Stock_productId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "productId";
