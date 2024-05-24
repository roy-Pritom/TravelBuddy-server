/*
  Warnings:

  - You are about to drop the column `photos` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "photos",
ADD COLUMN     "file" TEXT,
ALTER COLUMN "activities" SET DEFAULT ARRAY[]::TEXT[];
