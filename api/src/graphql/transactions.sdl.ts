export const schema = gql`
  type Transaction {
    id: Int!
    type: String!
    customerName: String!
    orderId: String!
    date: String!
    product: String!
    price: Float!
    transactionType: String!
    transactionDate: String!
    transactionAmount: Float!
    createdAt: DateTime!
  }

  input TransactionFilterInput {
    customerName: String
    orderId: String
    date: String
    product: String
    price: Float
    excludeIds: [Int!]
  }

  type Query {
    transactions(filter: TransactionFilterInput): [Transaction!]! @skipAuth
    transaction(id: Int!): Transaction @skipAuth
  }

  input CreateTransactionInput {
    type: String!
    customerName: String!
    orderId: String!
    date: String!
    product: String!
    price: Float!
    transactionType: String!
    transactionDate: String!
    transactionAmount: Float!
  }

  input UpdateTransactionInput {
    type: String
    customerName: String
    orderId: String
    date: String
    product: String
    price: Float
    transactionType: String
    transactionDate: String
    transactionAmount: Float
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @skipAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction! @skipAuth
    deleteTransaction(id: Int!): Transaction! @skipAuth
  }
`;
