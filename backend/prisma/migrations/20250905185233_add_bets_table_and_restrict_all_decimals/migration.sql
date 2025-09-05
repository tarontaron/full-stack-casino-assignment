/*
  Warnings:

  - You are about to drop the column `game_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `balance` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `balance_after` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.
  - You are about to alter the column `balance` on the `wallets` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,2)`.

*/
-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_game_id_fkey";

-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "game_id",
ADD COLUMN     "bet_id" INTEGER,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(15,2),
ALTER COLUMN "balance_after" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "public"."wallets" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(15,2);

-- CreateTable
CREATE TABLE "public"."bets" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bets_user_id_idx" ON "public"."bets"("user_id");

-- CreateIndex
CREATE INDEX "bets_game_id_idx" ON "public"."bets"("game_id");

-- CreateIndex
CREATE INDEX "transactions_wallet_id_idx" ON "public"."transactions"("wallet_id");

-- CreateIndex
CREATE INDEX "transactions_bet_id_idx" ON "public"."transactions"("bet_id");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "public"."users"("role");

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_bet_id_fkey" FOREIGN KEY ("bet_id") REFERENCES "public"."bets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bets" ADD CONSTRAINT "bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bets" ADD CONSTRAINT "bets_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
