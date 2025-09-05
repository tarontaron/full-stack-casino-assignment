/*
  Warnings:

  - You are about to drop the column `balance` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `balance_after` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "balance",
DROP COLUMN "balance_after";
