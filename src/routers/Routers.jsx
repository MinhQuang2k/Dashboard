import Sidebar from "../components/common/Sidebar";
import Dashboard from "../page/Dashboard";
import Order from "../page/Order";
import DetailOrder from "../components/order/DetailOrder";
import Customer from "../page/Customer";
import DetailCustomer from "../components/customer/DetailCustomer";
import About from "../page/About";
import Product from "../page/Product";
import DetailProduct from "../components/product/DetailProduct";

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
