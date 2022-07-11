import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "../actions/productActions";
import { arrayRowsPerPage, totalRowsPerPage } from "../utils";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SearchIcon from "@mui/icons-material/Search";
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
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useEffect, useState } from "react";
import "../style/pagetable.css";

const Product = () => {
  const productState = useSelector((state) => state.product.list);
  const [productList, setProductList] = useState(productState);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(arrayRowsPerPage(productList, page));
  const [openSearch, setOpenSearch] = useState(false);
  const [searchProduct, setSearchProduct] = useState(String);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    loadProducts();
  }, [page, productList]);

  useEffect(() => {
    setProductList(productState);
  }, [productState]);

  const loadProducts = () => {
    setProducts(arrayRowsPerPage(productList, page));
  };
  const handleEditProduct = (product) => {
    history.replace(`/product/${product.id}`);
  };

  const handleAddProduct = () => {
    history.replace(`/newproduct`);
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product));
  };

  const handleSeachProduct = (e) => {
    setProductList(
      productState.filter(function (el) {
        return el.name.toLowerCase().includes(searchProduct.toLowerCase());
      })
    );
    setPage(1);
    setOpenSearch(false);
  };

  const handleResetProduct = () => {
    setProductList(productState);
  };

  return (
    <div className="box__wrapper">
      <p className="box__route">React CRM / Product</p>
      <TableContainer
        sx={{ boxShadow: 1, borderRadius: 1 }}
        className="table__wrapper"
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Products ({productList ? productList.length : 0})</h2>
          <div>
            <Button variant="contained" onClick={() => handleResetProduct()}>
              Reset
            </Button>
          </div>
        </Box>
        <hr className="line-bottom"></hr>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total In Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>{product.numInStock}</TableCell>
                  <TableCell>
                    <Box sx={{ mt: -1, mb: -1 }}>
                      <Fab
                        sx={{ mr: 1, zIndex: 1 }}
                        color="success"
                        size="small"
                        onClick={() => handleEditProduct(product)}
                      >
                        <ModeEditOutlineIcon />
                      </Fab>
                      <Fab
                        sx={{ zIndex: 1 }}
                        size="small"
                        onClick={() => handleDeleteProduct(product)}
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
          {totalRowsPerPage(productList) > 1 && (
            <Pagination
              showFirstButton
              showLastButton
              count={totalRowsPerPage(productList)}
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
            label="Product"
            variant="standard"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <Button
            sx={{ mb: 3 }}
            variant="contained"
            color="error"
            onClick={() => handleSeachProduct()}
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
        onClick={() => handleAddProduct()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Product;
