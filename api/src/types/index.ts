export type Order = {
  id: string;
  type: string;
  customerName: string;
  date: string;
  product: string;
  price: number;
};

export type Transaction = {
  id: string;
  type: string;
  customerName: string;
  orderId: string;
  date: string;
  product: string;
  price: number;
  transactionType: string;
  transactionDate: string;
  transactionAmount: number;
};

export type MatchedRecord = Order & { transactions: Transaction[] };

export type Thresholds = {
  customerNameSimilarity: number;
  orderIdSimilarity: number;
  productSimilarity: number;
};
