/*
  Warnings:

  - You are about to drop the column `balance` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "balance";

-- AlterTable
ALTER TABLE "public"."wallets" ALTER COLUMN "balance" SET DEFAULT 1000.00;
