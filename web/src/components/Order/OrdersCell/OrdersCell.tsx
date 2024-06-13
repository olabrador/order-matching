import type { FindOrders, FindOrdersVariables } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web';

import Orders from 'src/components/Order/Orders';

export const QUERY: TypedDocumentNode<FindOrders, FindOrdersVariables> = gql`
  query FindOrders {
    orders {
      id
      orderId
      type
      customerName
      date
      product
      price
      createdAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No orders yet. '}
      <Link to={routes.newOrder()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps<FindOrders>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  orders,
}: CellSuccessProps<FindOrders, FindOrdersVariables>) => {
  return <Orders orders={orders} />;
};
