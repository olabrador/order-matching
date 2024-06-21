import type {
  OrderMatchesQuery,
  OrderMatchesQueryVariables,
} from 'types/graphql';

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web';
import OrderMatches from 'src/components/Order/OrderMatches/OrderMatches';


export const QUERY: TypedDocumentNode<
  OrderMatchesQuery,
  OrderMatchesQueryVariables
> = gql`
  query OrderMatchesQuery($orderId: Int!) {
    orderMatches: orderMatches(orderId: $orderId) {
      id
      status
      customerNameSimilarity
      orderIdSimilarity
      productSimilarity
      feedback
      order {
        id
        orderId
        customerName
        product
        date
        price
      }
      transaction {
        id
        orderId
        customerName
        product
        date
        price
        transactionAmount
        transactionDate
        transactionType
      }
    }
    allPossibleTransactions: allPossibleTransactions(orderId: $orderId) {
      id
      orderId
      customerName
      product
      date
      price
      transactionAmount
      transactionDate
      transactionType
    }
    order: order(id: $orderId) {
      id
      orderId
      customerName
      product
      date
      price
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  orderMatches,
  allPossibleTransactions,
  order,
}: CellSuccessProps<OrderMatchesQuery>) => {
  return <OrderMatches orderMatches={orderMatches} allPossibleTransactions={allPossibleTransactions} order={order} />;
};
