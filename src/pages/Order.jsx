import {
  Box,
  Button,
  Fab,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOrder } from "../actions/orderActions";
import { arrayRowsPerPage, totalRowsPerPage } from "../utils";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SearchIcon from "@mui/icons-material/Search";
import "../style/pagetable.css";

const Order = () => {
  const orderState = useSelector((state) => state.order.list);
  const [orderList, setOrderList] = useState(orderState);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState(arrayRowsPerPage(orderList, page));
  const [openSearch, setOpenSearch] = useState(false);
  const [searchOrder, setSearchOrder] = useState(String);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    loadOrders();
  }, [page, orderList]);

  useEffect(() => {
    setOrderList(orderState);
  }, [orderState]);

  const loadOrders = () => {
    setOrders(arrayRowsPerPage(orderList, page));
  };
  const handleEditOrder = (order) => {
    history.replace(`/order/${order.id}`);
  };

  const handleAddOrder = () => {
    history.replace(`/neworder`);
  };
  const handleDeleteOrder = (order) => {
    dispatch(deleteOrder(order));
  };

  const handleSeachOrder = (e) => {
    setOrderList(
      orderState.filter(function (el) {
        return el.firstname.toLowerCase().includes(searchOrder.toLowerCase());
      })
    );
    setPage(1);
    setOpenSearch(false);
  };

  const handleResetOrder = () => {
    setOrderList(orderState);
  };

  return (
    <div className="box__wrapper">
      <p className="box__route">React CRM / Order</p>
      <TableContainer
        sx={{ boxShadow: 1, borderRadius: 1 }}
        className="table__wrapper"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Orders ({orderList ? orderList.length : 0})</h2>
          <div>
            <Button variant="contained" onClick={() => handleResetOrder()}>
              Reset
            </Button>
          </div>
        </Box>
        <hr className="line-bottom"></hr>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Shipping Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.reference}
                  </TableCell>
                  <TableCell>{order.products.length}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.firstname}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.shippedDate}</TableCell>
                  <TableCell>
                    <Box sx={{ mt: -1, mb: -1 }}>
                      <Fab
                        sx={{ mr: 1, zIndex: 1 }}
                        color="success"
                        size="small"
                        onClick={() => handleEditOrder(order)}
                      >
                        <ModeEditOutlineIcon />
                      </Fab>
                      <Fab
                        sx={{ zIndex: 1 }}
                        size="small"
                        onClick={() => handleDeleteOrder(order)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          {totalRowsPerPage(orderList) > 1 && (
            <Pagination
              showFirstButton
              showLastButton
              count={totalRowsPerPage(orderList)}
              variant="outlined"
              boundaryCount={2}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          )}
        </Box>
      </TableContainer>
      <Fab
        sx={{ position: "fixed", bottom: 10, right: 100 }}
        color="primary"
        size="small"
        onClick={() => setOpenSearch(true)}
      >
        <SearchIcon />
      </Fab>
      <SwipeableDrawer
        anchor="right"
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        onOpen={() => setOpenSearch(true)}
      >
        <Box sx={{ width: 250, pl: 2 }} role="presentation">
          <Typography sx={{ mt: 3 }}>Search</Typography>
          <TextField
            sx={{ my: 3 }}
            label="Customer"
            variant="standard"
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
          />
          <Button
            sx={{ mb: 3 }}
            variant="contained"
            color="error"
            onClick={() => handleSeachOrder()}
          >
            Search
          </Button>
          <Button
            sx={{ mb: 3, ml: 1 }}
            variant="contained"
            onClick={() => setOpenSearch(false)}
          >
            Back
          </Button>
          <Divider />
        </Box>
      </SwipeableDrawer>
      <Fab
        sx={{ position: "fixed", bottom: 10, right: 30 }}
        color="error"
        size="small"
        onClick={handleAddOrder}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Order;
