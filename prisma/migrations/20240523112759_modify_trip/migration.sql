/*
  Warnings:

  - Added the required column `description` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trvelType` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT,
ADD COLUMN     "trvelType" TEXT NOT NULL;
