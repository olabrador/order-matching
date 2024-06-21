export const schema = gql`
  type Match {
    id: Int!
    orderId: Int!
    transactionId: Int!
    status: String!
    order: Order!
    transaction: Transaction!
    customerNameSimilarity: Float
    orderIdSimilarity: Float
    productSimilarity: Float
    feedback: String
  }

  type Query {
    orderMatches(orderId: Int!): [Match!]! @skipAuth
    allPossibleTransactions(orderId: Int!): [Transaction!]! @skipAuth
  }

  input CreateMatchInput {
    orderId: Int!
    transactionId: Int!
    status: String!
    customerNameSimilarity: Float
    orderIdSimilarity: Float
    productSimilarity: Float
    feedback: String
  }

  input UpdateMatchInput {
    orderId: Int
    transactionId: Int
    status: String
    customerNameSimilarity: Float
    orderIdSimilarity: Float
    productSimilarity: Float
    feedback: String
  }

  type Mutation {
    createMatch(input: CreateMatchInput!): Match! @skipAuth
    updateMatch(id: Int!, input: UpdateMatchInput!): Match! @skipAuth
    deleteMatch(id: Int!): Match! @skipAuth
  }
`;
