import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCustomer } from "../actions/customerActions";
import { arrayRowsPerPage, totalRowsPerPage } from "../utils";

import {
  Box,
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

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "../style/pagetable.css";

const Customer = () => {
  const customerState = useSelector((state) => state.customer.list);
  const [customerList, setCustomerList] = useState(customerState);
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState(
    arrayRowsPerPage(customerList, page)
  );
  const [openSearch, setOpenSearch] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState({
    firstname: "",
    lastname: "",
  });

  const { firstname, lastname } = searchCustomer;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    loadCustomers();
  }, [page, customerList]);

  useEffect(() => {
    setCustomerList(customerState);
  }, [customerState]);

  const loadCustomers = () => {
    setCustomers(arrayRowsPerPage(customerList, page));
  };

  const handleDeleteCustomer = (customer) => {
    dispatch(deleteCustomer(customer));
  };

  const handleEditCustomer = (customer) => {
    history.replace(`/customer/${customer.id}`);
  };

  const handleAddCustomer = () => {
    history.replace(`/newcustomer`);
  };

  const handleSeachCustomer = (e) => {
    setCustomerList(
      customerState.filter(function (el) {
        if (searchCustomer.firstname.length === 0) {
          return el.lastname
            .toLowerCase()
            .includes(searchCustomer.lastname.toLowerCase());
        } else if (searchCustomer.lastname.length === 0) {
          return el.firstname
            .toLowerCase()
            .includes(searchCustomer.firstname.toLowerCase());
        } else {
          return (
            el.firstname
              .toLowerCase()
              .includes(searchCustomer.firstname.toLowerCase()) ||
            el.lastname
              .toLowerCase()
              .includes(searchCustomer.lastname.toLowerCase())
          );
        }
      })
    );
    setPage(1);
    setOpenSearch(false);
  };

  const handleResetCustomer = () => {
    setCustomerList(customerState);
  };

  const onChangeSearchCustomer = (event) =>
    setSearchCustomer({
      ...searchCustomer,
      [event.target.name]: event.target.value,
    });

  return (
    <div className="box__wrapper">
      <p className="box__route">React CRM / Customer</p>
      <TableContainer
        sx={{ boxShadow: 1, borderRadius: 1 }}
        className="table__wrapper"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Customers ({customerList ? customerList.length : 0})</h2>
          <div>
            <Button variant="contained" onClick={() => handleResetCustomer()}>
              Reset
            </Button>
          </div>
        </Box>
        <hr className="line-bottom"></hr>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Membership</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers &&
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell component="th" scope="row">
                    {customer.avatar && (
                      <img
                        src={customer.avatar}
                        alt="avatar"
                        className="customer-img"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/assets/img/user.jpeg";
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{customer.firstname}</TableCell>
                  <TableCell>{customer.lastname}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.mobile}</TableCell>
                  <TableCell>{customer.membership ? "1" : "0"}</TableCell>
                  <TableCell>
                    <Box sx={{ mt: -1, mb: -1 }}>
                      <Fab
                        sx={{ mr: 1, zIndex: 1 }}
                        color="success"
                        size="small"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <ModeEditOutlineIcon />
                      </Fab>
                      <Fab
                        sx={{ zIndex: 1 }}
                        size="small"
                        onClick={() => handleDeleteCustomer(customer)}
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
          {totalRowsPerPage(customerList) && (
            <Pagination
              showFirstButton
              showLastButton
              count={totalRowsPerPage(customerList)}
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
            label="First name"
            variant="standard"
            name="firstname"
            value={firstname}
            onChange={(e) => onChangeSearchCustomer(e)}
          />
          <TextField
            sx={{ my: 3 }}
            label="Last name"
            variant="standard"
            name="lastname"
            value={lastname}
            onChange={(e) => onChangeSearchCustomer(e)}
          />
          <Button
            sx={{ mb: 3 }}
            variant="contained"
            color="error"
            onClick={() => handleSeachCustomer()}
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
        onClick={handleAddCustomer}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Customer;
