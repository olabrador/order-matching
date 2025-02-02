import type {
  EditOrderById,
  UpdateOrderInput,
  UpdateOrderMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import OrderForm from 'src/components/Order/OrderForm';

export const QUERY: TypedDocumentNode<EditOrderById> = gql`
  query EditOrderById($id: Int!) {
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

const UPDATE_ORDER_MUTATION: TypedDocumentNode<
  EditOrderById,
  UpdateOrderMutationVariables
> = gql`
  mutation UpdateOrderMutation($id: Int!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ order }: CellSuccessProps<EditOrderById>) => {
  const [updateOrder, { loading, error }] = useMutation(UPDATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order updated');
      navigate(routes.orders());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (
    input: UpdateOrderInput,
    id: EditOrderById['order']['id']
  ) => {
    updateOrder({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Order {order?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrderForm
          order={order}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
