export const schema = gql`
  type Order {
    id: Int!
    orderId: String!
    type: String!
    customerName: String!
    date: String!
    product: String!
    price: Float!
    createdAt: DateTime!
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: Int!): Order @requireAuth
  }

  input CreateOrderInput {
    orderId: String!
    type: String!
    customerName: String!
    date: String!
    product: String!
    price: Float!
  }

  input UpdateOrderInput {
    orderId: String
    type: String
    customerName: String
    date: String
    product: String
    price: Float
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`;
