/*
  Warnings:

  - You are about to drop the column `contSummary` on the `travel_plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."travel_plans" DROP COLUMN "contSummary",
ADD COLUMN     "costSummary" JSONB;
