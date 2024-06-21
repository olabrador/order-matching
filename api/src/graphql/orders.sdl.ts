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
    orders: [Order!]! @skipAuth
    order(id: Int!): Order @skipAuth
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
    createOrder(input: CreateOrderInput!): Order! @skipAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @skipAuth
    deleteOrder(id: Int!): Order! @skipAuth
  }
`;
