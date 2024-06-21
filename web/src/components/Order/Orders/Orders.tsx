import type {
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  FindOrders,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import type { TypedDocumentNode } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Order/OrdersCell';
import Table from 'src/components/common/Table';
import { useCallback } from 'react';

const DELETE_ORDER_MUTATION: TypedDocumentNode<
  DeleteOrderMutation,
  DeleteOrderMutationVariables
> = gql`
  mutation DeleteOrderMutation($id: Int!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const OrdersList = ({ orders }: FindOrders) => {
  const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteOrderMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete order ' + id + '?')) {
      deleteOrder({ variables: { id } });
    }
  };

  const actions = useCallback((order: FindOrders['orders'][number]) => {
    return (
      <nav className="rw-table-actions">
        <Link
          to={routes.orderMatches({ orderId: order.id })}
          title={`Manage transactions for order ${order.id}`}
          className="rw-button rw-button-small rw-button-green"
        >
          Transactions
        </Link>
        <Link
          to={routes.editOrder({ id: order.id })}
          title={`Edit order ${order.id}`}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          title={`Delete order ${order.id}`}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDeleteClick(order.id)}
        >
          Delete
        </button>
      </nav>
    );
  }, []);

  return (
    <Table
      items={orders}
      columns={[
        { key: 'id', title: 'Id' },
        { key: 'orderId', title: 'Order id' },
        { key: 'customerName', title: 'Customer name' },
        { key: 'date', title: 'Date' },
        { key: 'product', title: 'Product' },
        { key: 'price', title: 'Price' },
      ]}
      onDelete={onDeleteClick}
      actions={actions}
    />
  );
};

export default OrdersList;
