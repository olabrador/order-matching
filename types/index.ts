export type Order = {
  id: number;
  orderId: string;
  type: string;
  customerName: string;
  date: string;
  product: string;
  price: number;
};

export type Transaction = {
  id: number;
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

export type MatchedRecord = Order & {
  transactions: (Transaction & {
    customerNameSimilarity: number;
    orderIdSimilarity: number;
    productSimilarity: number;
  })[];
};

export enum MatchStatus {
  rejected = 'rejected',
  unverified = 'unverified',
  verified = 'verified',
};

export type Thresholds = {
  customerNameSimilarity: number;
  orderIdSimilarity: number;
  productSimilarity: number;
};
