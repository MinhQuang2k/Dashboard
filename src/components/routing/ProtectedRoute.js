import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import "../../style/App.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const showSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Sidebar openSidebar={openSidebar} />
            <div className={openSidebar ? "container active" : "container"}>
              <Navbar showSidebar={showSidebar} openSidebar={openSidebar} />
              <Component {...rest} {...props} />
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
