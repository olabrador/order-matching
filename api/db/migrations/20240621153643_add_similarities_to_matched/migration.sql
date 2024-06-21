/*
  Warnings:

  - Added the required column `customerNameSimilarity` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderIdSimilarity` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSimilarity` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "customerNameSimilarity" REAL NOT NULL,
    "orderIdSimilarity" REAL NOT NULL,
    "productSimilarity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Match_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("createdAt", "id", "orderId", "status", "transactionId") SELECT "createdAt", "id", "orderId", "status", "transactionId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check("Match");
PRAGMA foreign_keys=ON;
