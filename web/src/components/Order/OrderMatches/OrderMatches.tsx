import { useMutation } from "@redwoodjs/web";
import { useCallback, useMemo } from "react";
import Table from "src/components/common/Table";
import { TableColumns } from "src/types";
import { MutationcreateMatchArgs, Order, OrderMatchesQuery, Transaction } from "types/graphql";
import { toast } from '@redwoodjs/web/toast';
import { QUERY } from "../OrderMatchesCell";
import { MatchStatus } from "../../../../../types";

type Props = {
  order: OrderMatchesQuery['order'];
  orderMatches: OrderMatchesQuery['orderMatches'];
  allPossibleTransactions: OrderMatchesQuery['allPossibleTransactions'];
};

type OrderMatchesTransaction = Omit<OrderMatchesQuery['orderMatches'][number], 'order' | 'transaction' | '__typename'>
  & Omit<Transaction, 'createdAt' | 'type'>;

const CREATE_MATCH_MUTATION = gql`
  mutation CreateMatchMutation($input: CreateMatchInput!) {
    createMatch(input: $input) {
      id
    }
  }
`;

const UPDATE_MATCH_MUTATION = gql`
  mutation UpdateMatchMutation($id: Int!, $input: UpdateMatchInput!) {
    updateMatch(id: $id, input: $input) {
      id
    }
  }
`;

const OrderMatches = ({ orderMatches, allPossibleTransactions, order }: Props) => {
  const columnsForOrder: TableColumns<OrderMatchesQuery['orderMatches'][number]['order']>[] = useMemo(() => [
    { key: 'id', title: 'Id' },
    { key: 'orderId', title: 'Order id' },
    { key: 'customerName', title: 'Customer name' },
    { key: 'product', title: 'Product' },
    { key: 'date', title: 'Date' },
    { key: 'price', title: 'Price' },
  ], []);
  const columnsForMatches: TableColumns<OrderMatchesTransaction>[] = useMemo(() => [
    { key: 'id', title: 'Id' },
    { key: 'orderId', title: 'Order id' },
    { key: 'customerName', title: 'Customer name' },
    { key: 'product', title: 'Product' },
    { key: 'customerNameSimilarity', title: 'Customer name similarity' },
    { key: 'orderIdSimilarity', title: 'Order id similarity' },
    { key: 'productSimilarity', title: 'Product similarity' },
    { key: 'status', title: 'Match status' },
    { key: 'feedback', title: 'Match feedback' },
  ], []);
  const columnsForTransactions: TableColumns<Omit<Transaction, 'createdAt' | 'type'>>[] = useMemo(() => [
    { key: 'id', title: 'Id' },
    { key: 'orderId', title: 'Order id' },
    { key: 'customerName', title: 'Customer name' },
    { key: 'product', title: 'Product' },
    { key: 'transactionAmount', title: 'Transaction amount' },
    { key: 'transactionDate', title: 'Transaction date' },
    { key: 'transactionType', title: 'Transaction type' },
  ], []);
  const transactionsMatched = useMemo(() => orderMatches.map((orderMatched) => ({
    ...orderMatched.transaction,
    customerNameSimilarity: orderMatched.customerNameSimilarity,
    orderIdSimilarity: orderMatched.orderIdSimilarity,
    productSimilarity: orderMatched.productSimilarity,
    status: orderMatched.status,
    id: orderMatched.id,
    feedback: orderMatched.feedback,
  })), [orderMatches]);
  const [createMatch] = useMutation(CREATE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match created');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [{ query: QUERY, variables: { orderId: order.id }}],
    awaitRefetchQueries: true,
  });
  const [updateMatch] = useMutation(UPDATE_MATCH_MUTATION, {
    onCompleted: () => {
      toast.success('Match updated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [{ query: QUERY, variables: { orderId: order.id }}],
    awaitRefetchQueries: true,
  });
  const matchStatusMessage = useMemo(() => ({
    [MatchStatus.rejected]: 'reject',
    [MatchStatus.verified]: 'verify',
  }), []);
  const onCreateMatch = useCallback((transactionId: number) => {
    const confirmation = confirm('Are you sure you want to match this transaction?');
    if (!confirmation) return;

    const feedback = prompt('(Optional) provide info on why this is a match', '');
    createMatch({
      variables: {
        input: {
          status: MatchStatus.verified,
          orderId: order.id,
          transactionId,
          feedback: feedback === '' ? null : feedback,
        },
      },
    });
  }, [createMatch, order.id]);
  const onUpdateMatch = useCallback((id: number, status: MatchStatus) => {
    const confirmation = confirm(`Are you sure you want to ${matchStatusMessage[status]} this match?`);
    if (!confirmation) return;

    const feedback = prompt(`(Optional) provide info on why this match is being ${matchStatusMessage[status]}`, '');
    updateMatch({ variables: { id, input: { status, feedback: feedback === '' ? null : feedback } } });
  }, [updateMatch, matchStatusMessage]);
  const actionsForMatches = useCallback((match: OrderMatchesTransaction) => {
    if (match.status !== MatchStatus.unverified) {
      return null;
    }

    return (
      <nav className="rw-table-actions">
        <button
          type="button"
          title={`Approve match ${match.id}`}
          className="rw-button rw-button-small rw-button-green"
          onClick={() => onUpdateMatch(match.id, MatchStatus.verified)}
        >
          Approve
        </button>
        <button
          type="button"
          title={`Reject match ${match.id}`}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onUpdateMatch(match.id, MatchStatus.rejected)}
        >
          Reject
        </button>
      </nav>
    );
  }, [onUpdateMatch]);

  const actionsForTransactions = useCallback((transaction: Transaction) => {
    return (
      <nav className="rw-table-actions">
        <button
          type="button"
          title={`Match transaction ${transaction.id}`}
          className="rw-button rw-button-small rw-button-green"
          onClick={() => onCreateMatch(transaction.id)}
        >
          Match
        </button>
      </nav>
    );
  }, [onCreateMatch]);

  return (
    <>
      <Table
        items={[order]}
        columns={columnsForOrder}
        actions={null}
      />
      <div className="mt-5">
        <h1 className="p-4 font-semibold text-lg text-gray-600">Matched transactions</h1>
        <Table
          items={transactionsMatched}
          columns={columnsForMatches}
          actions={actionsForMatches}
        />
      </div>
      <div className="mt-5">
        <h1 className="p-4 font-semibold text-lg text-gray-600">All possible transactions not matched</h1>
        <Table
          items={allPossibleTransactions}
          columns={columnsForTransactions}
          actions={actionsForTransactions}
        />
      </div>
    </>
  );
};

export default OrderMatches;
