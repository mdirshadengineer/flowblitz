/*
  Warnings:

  - You are about to drop the column `desscription` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "desscription",
ADD COLUMN     "description" TEXT;
