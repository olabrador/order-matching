import { MatchedRecord, Order, Thresholds, Transaction } from "types/index";
import isLikelyMatch from "./isLikelyMatch";

export default function matchRecords(
  orders: Order[],
  transactions: Transaction[],
  thresholds: Thresholds,
): MatchedRecord[] {
  const matchedRecords: MatchedRecord[] = orders.map((order) => {
    const matchedTransactions = transactions.filter((transaction) => isLikelyMatch(order, transaction, thresholds));
    return {
      ...order,
      transactions: matchedTransactions,
    };
  });
  const ordersWithTransactions = matchedRecords.filter((record) => record.transactions.length > 0);
  return ordersWithTransactions;
}
