/*
  Warnings:

  - The `projectIds` column on the `Favourite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "projectIds",
ADD COLUMN     "projectIds" INTEGER[];
