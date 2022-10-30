/*
  Warnings:

  - You are about to drop the column `project` on the `Application` table. All the data in the column will be lost.
  - The `searchingFor` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `toolsAndTechnologies` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "project";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "searchingFor",
ADD COLUMN     "searchingFor" TEXT[],
DROP COLUMN "toolsAndTechnologies",
ADD COLUMN     "toolsAndTechnologies" TEXT[];
