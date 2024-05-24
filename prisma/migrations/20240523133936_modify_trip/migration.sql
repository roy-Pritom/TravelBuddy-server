/*
  Warnings:

  - You are about to drop the column `trvelType` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `travelType` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "trvelType",
ADD COLUMN     "travelType" TEXT NOT NULL;
