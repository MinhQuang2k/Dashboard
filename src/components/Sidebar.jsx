import "../style/sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { useHistory } from "react-router-dom";
import {
  Modal,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import FilterListIcon from "@mui/icons-material/FilterList";

const Sidebar = ({ openSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    setOpen(false);
    dispatch(logoutUser());
  };
  const handleChangePassword = () => {
    setOpen(false);
    history.replace(`/changepass`);
  };
  return (
    <>
      <div className={openSidebar ? "sidebar active" : "sidebar"}>
        <header>
          <img src={user.avatar} className="sidebar-avatar" alt="" />
          <h2 className="sidebar-name">{user.firstname}</h2>
          <FilterListIcon
            className="btn-setting"
            onClick={() => setOpen(true)}
          />
          <Modal open={open} onClose={() => setOpen(false)}>
            <Paper sx={{ width: 220, maxWidth: "100%", ml: 2, mt: 2 }}>
              <MenuList>
                <MenuItem onClick={() => handleSignOut()}>
                  <ListItemIcon>
                    <VpnKeyIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>Sign Out</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleChangePassword()}>
                  <ListItemIcon>
                    <PowerSettingsNewIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>Change Password</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Modal>
        </header>
        <ul>
          <li>
            <Link to="/customer">
              <i className="fa-regular fa-user"></i>
              <span>Customer</span>
            </Link>
          </li>
          <li>
            <Link to="/order">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Order</span>
            </Link>
          </li>
          <li>
            <Link to="/product">
              <i className="fas fa-shop"></i>
              <span>Product</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
