import type { FindOrderById, FindOrderByIdVariables } from 'types/graphql';

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web';

import Order from 'src/components/Order/Order';

export const QUERY: TypedDocumentNode<
  FindOrderById,
  FindOrderByIdVariables
> = gql`
  query FindOrderById($id: Int!) {
    order: order(id: $id) {
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

export const Empty = () => <div>Order not found</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindOrderByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  order,
}: CellSuccessProps<FindOrderById, FindOrderByIdVariables>) => {
  return <Order order={order} />;
};
