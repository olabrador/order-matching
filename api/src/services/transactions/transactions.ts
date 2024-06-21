import { db } from "src/lib/db";
import { QueryResolvers } from "types/graphql";

export const transactions: QueryResolvers['transactions'] = async ({ filter }) => {
  return db.transaction.findMany({
    where: {
      ...(filter.date && { date: filter.date }),
      ...(filter.price && { price: filter.price }),
      ...(filter.excludeIds && { id: { notIn: filter.excludeIds } }),
    },
  });
};
