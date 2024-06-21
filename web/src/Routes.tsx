// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Orders" titleTo="orders" buttonLabel="New Order" buttonTo="newOrder">
        <Route path="/orders/new" page={OrderNewOrderPage} name="newOrder" />
        <Route path="/orders/{id:Int}/edit" page={OrderEditOrderPage} name="editOrder" />
        <Route path="/orders" page={OrderOrdersPage} name="orders" />
        <Route path="/orders/{orderId:Int}/matches" page={OrderOrderMatchesPage} name="orderMatches" />
      </Set>
      <Route path='/' redirect='/orders' />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
