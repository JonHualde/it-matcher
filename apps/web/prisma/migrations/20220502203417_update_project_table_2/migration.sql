/*
  Warnings:

  - You are about to drop the column `EstimatedTimeDuration` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `EstimatedTimeDurationMetric` on the `Project` table. All the data in the column will be lost.
  - Added the required column `estimatedTimeDuration` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTimeDurationMetric` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "EstimatedTimeDuration",
DROP COLUMN "EstimatedTimeDurationMetric",
ADD COLUMN     "estimatedTimeDuration" INTEGER NOT NULL,
ADD COLUMN     "estimatedTimeDurationMetric" TEXT NOT NULL;
