-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "customerNameSimilarity" REAL,
    "orderIdSimilarity" REAL,
    "productSimilarity" REAL,
    "feedback" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Match_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("createdAt", "customerNameSimilarity", "feedback", "id", "orderId", "orderIdSimilarity", "productSimilarity", "status", "transactionId") SELECT "createdAt", "customerNameSimilarity", "feedback", "id", "orderId", "orderIdSimilarity", "productSimilarity", "status", "transactionId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check("Match");
PRAGMA foreign_keys=ON;
