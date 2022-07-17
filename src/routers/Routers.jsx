import Sidebar from "../components/common/Sidebar";
import DetailCustomer from "../components/customer/DetailCustomer";
import DetailOrder from "../components/order/DetailOrder";
import DetailProduct from "../components/product/DetailProduct";
import About from "../page/About";
import Customer from "../page/Customer";
import Dashboard from "../page/Dashboard";
import Order from "../page/Order";
import Product from "../page/Product";

export const routes = [
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order/neworder",
        element: <DetailOrder />,
      },
      {
        path: "/order/:id",
        element: <DetailOrder />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/newproduct",
        element: <DetailProduct />,
      },
      {
        path: "/product/:id",
        element: <DetailProduct />,
      },

      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/customer/newcustomer",
        element: <DetailCustomer />,
      },
      {
        path: "/customer/:id",
        element: <DetailCustomer />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
];
