import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  editSingleCustomer,
  addNewCustomer,
  getSingleCustomer,
} from "../../actions/customerActions";

import "../../style/pagetable.css";
import { TableContainer, Grid, TextField, Button, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";

const ApplicationCustomer = () => {
  // state
  const [firstname, setFirstname] = useState(String);
  const [lastname, setLastname] = useState(String);
  const [rewards, setRewards] = useState(Number);
  const [email, setEmail] = useState(String);
  const [mobile, setMobile] = useState(String);
  const [avatar, setAvatar] = useState(String);

  const { pathname } = useLocation();
  const singleCustomer = useSelector((state) => state.customer.singleCustomer);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.split("/")[1] === "customer") {
      dispatch(getSingleCustomer(+pathname.split("/")[2]));
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.split("/")[1] === "customer") {
      loadData();
    }
  }, [singleCustomer]);

  const loadData = () => {
    if (!singleCustomer) return;
    setFirstname(singleCustomer.firstname);
    setLastname(singleCustomer.lastname);
    setRewards(singleCustomer.rewards);
    setEmail(singleCustomer.email);
    setMobile(singleCustomer.mobile);
    setAvatar(singleCustomer.avatar);
  };

  const handleBack = () => {
    history.replace(`/customer`);
  };

  const handleSave = () => {
    if (pathname.split("/")[1] === "customer") {
      dispatch(
        editSingleCustomer({
          id: singleCustomer.id,
          firstname,
          lastname,
          rewards,
          email,
          mobile,
          avatar,
        })
      );
      loadData();
    } else if (pathname.split("/")[1] === "newcustomer") {
      dispatch(
        addNewCustomer({
          firstname,
          lastname,
          rewards,
          email,
          mobile,
          avatar,
        })
      );
    }
    handleBack();
  };

  return (
    <div className="box__wrapper">
      <p className="box__route">Application / Customer</p>
      <TableContainer
        sx={{ boxShadow: 1, borderRadius: 1 }}
        className="table__wrapper"
      >
        <h2>Customer</h2>
        <hr className="line-bottom"></hr>
        <Grid container spacing={3} mt={1} mb={3}>
          <Grid item xs={12} md={4}>
            <TextField
              label="First Name"
              variant="outlined"
              sx={{ width: "100%" }}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Last Name"
              variant="outlined"
              sx={{ width: "100%" }}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Rewards"
              variant="outlined"
              sx={{ width: "100%" }}
              value={rewards}
              onChange={(e) => setRewards(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Mobile"
              variant="outlined"
              sx={{ width: "100%" }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        {avatar && (
          <Box sx={{ my: 2 }}>
            <img src={avatar} className="appCustomer-img" />
          </Box>
        )}
        <hr className="line-bottom"></hr>
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

export default ApplicationCustomer;
