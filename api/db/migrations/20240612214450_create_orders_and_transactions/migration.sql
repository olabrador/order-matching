-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "product" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "product" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "transactionDate" DATETIME NOT NULL,
    "transactionAmount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
