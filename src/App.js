import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Order from "./pages/Order";
import ApplicationProduct from "./components/product/ApplicationProduct";
import ApplicationOrder from "./components/order/ApplicationOrder";
import ApplicationCustomer from "./components/customer/ApplicationCustomer";
import Landing from "./components/Landing";
import Changepass from "./components/auth/Changepass";

import { getCategory } from "./actions/categoryActions";
import { getProducts } from "./actions/productActions";
import { getOrders } from "./actions/orderActions";
import { getCustomers } from "./actions/customerActions";

import Auth from "./pages/Auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getProducts());
    dispatch(getOrders());
    dispatch(getCustomers());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Auth} />

        <ProtectedRoute exact path="/changepass" component={Changepass} />
        <ProtectedRoute exact path="/product" component={Product} />
        <ProtectedRoute
          exact
          path="/product/:id"
          component={ApplicationProduct}
        />
        <ProtectedRoute
          exact
          path="/newproduct"
          component={ApplicationProduct}
        />
        {/* order */}
        <ProtectedRoute exact path="/order" component={Order} />
        <ProtectedRoute exact path="/order/:id" component={ApplicationOrder} />
        {/* customer */}
        <ProtectedRoute exact path="/customer" component={Customer} />
        <ProtectedRoute
          exact
          path="/customer/:id"
          component={ApplicationCustomer}
        />
        <ProtectedRoute
          exact
          path="/newcustomer"
          component={ApplicationCustomer}
        />
      </Switch>
    </Router>
  );
}

export default App;
