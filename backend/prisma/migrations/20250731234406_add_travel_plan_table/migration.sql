-- CreateEnum
CREATE TYPE "public"."planType" AS ENUM ('VACATION', 'RELOCATION');

-- CreateEnum
CREATE TYPE "public"."budgetLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."travel_plans" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "type" "public"."planType" NOT NULL,
    "budget" INTEGER,
    "budgetLevel" "public"."budgetLevel" NOT NULL,
    "destination" TEXT NOT NULL,
    "days" INTEGER,
    "itinerary" JSONB,
    "contSummary" JSONB,
    "additionalInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "travel_plans_clerkUserId_idx" ON "public"."travel_plans"("clerkUserId");
