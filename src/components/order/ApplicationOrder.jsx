import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getSingleOrder, editSingleOrder } from "../../actions/orderActions";

import "../../style/pagetable.css";
import {
  TableContainer,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";

const ApplicationOrder = () => {
  // state
  const [firstname, setFirstname] = useState(String);
  const [reference, setReference] = useState(String);
  const [amount, setAmount] = useState(Number);
  const [products, setProduct] = useState([]);
  const [orderDate, setOrderDate] = useState(String);
  const [shippedDate, setShippedDate] = useState(String);
  const [address, setAddress] = useState(String);
  const [city, setCity] = useState(String);
  const [country, setCountry] = useState(String);
  const [zipcode, setZipcode] = useState(String);

  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const singleOrder = useSelector((state) => state.order.singleOrder);

  const handleBack = () => {
    history.replace(`/order`);
  };

  useEffect(() => {
    if (pathname.split("/")[1] === "order") {
      const id = pathname.split("/")[2];
      dispatch(getSingleOrder(parseInt(id)));
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.split("/")[1] === "order") {
      loadData();
    }
  }, [singleOrder]);

  const loadData = () => {
    if (!singleOrder) return;
    setFirstname(singleOrder.firstname);
    setReference(singleOrder.reference);
    setAmount(singleOrder.amount);
    setProduct(singleOrder.products);
    setOrderDate(singleOrder.orderDate);
    setShippedDate(singleOrder.shippedDate);
    setAddress(singleOrder.shipAddress.address);
    setCity(singleOrder.shipAddress.city);
    setCountry(singleOrder.shipAddress.country);
    setZipcode(singleOrder.shipAddress.zipcode);
  };

  const handleSave = () => {
    if (pathname.split("/")[1] === "order") {
      const order = {
        firstname,
        reference,
        amount,
        products,
        orderDate,
        shippedDate,
        shipAddress: {
          address,
          city,
          country,
          zipcode,
        },
        customerId: singleOrder.customerId,
        id: singleOrder.id,
      };
      dispatch(editSingleOrder(order));
    }
    handleBack();
  };

  const handleDeleteProduct = (product) => {
    setProduct(products.filter((item) => item.id !== product.id));
  };

  return (
    <div className="box__wrapper">
      <p className="box__route">Application / Order</p>
      <TableContainer
        sx={{ boxShadow: 1, borderRadius: 1 }}
        className="table__wrapper"
      >
        <h2>Order</h2>
        <hr className="line-bottom"></hr>
        <Grid container spacing={3} mt={1} mb={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Customer"
              variant="outlined"
              sx={{ width: "100%" }}
              value={firstname}
              disabled
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Reference Number"
              variant="outlined"
              sx={{ width: "100%" }}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Amount"
              variant="outlined"
              sx={{ width: "100%" }}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Quantity"
              variant="outlined"
              value={products.length}
              sx={{ width: "100%" }}
              disabled
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Order Date"
              variant="outlined"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Shipped Date"
              variant="outlined"
              value={shippedDate}
              onChange={(e) => setShippedDate(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ width: "100%" }}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="City"
              variant="outlined"
              sx={{ width: "100%" }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Country"
              variant="outlined"
              sx={{ width: "100%" }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Zip Code"
              variant="outlined"
              sx={{ width: "100%" }}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Grid>
        </Grid>
        <Typography sx={{ color: "navy", fontSize: "1rem", fontWeight: 600 }}>
          Product List:
        </Typography>
        <hr className="line-bottom"></hr>
        <Box>
          {products &&
            products.map((product) => (
              <Box key={product.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    my: 2,
                  }}
                >
                  <Box>
                    <Typography>{product.name}</Typography>
                    <Typography sx={{ color: "#7b7c81", fontSize: ".9rem" }}>
                      Price: $ {product.unitPrice}
                    </Typography>
                  </Box>
                  <Fab sx={{ mr: 2 }} size="small">
                    <DeleteIcon onClick={() => handleDeleteProduct(product)} />
                  </Fab>
                </Box>
                <hr className="line-bottom"></hr>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            p: 1,
            m: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            sx={{ ml: 2 }}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleBack}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </Box>
      </TableContainer>
    </div>
  );
};

export default ApplicationOrder;
