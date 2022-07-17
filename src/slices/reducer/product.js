import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";
export const PER_PAGE = 10;

export const getProducts = createAsyncThunk(
    "products/getAll",
    ({ page, product}, thunkAPI) => {
        try {
            return productApi.getAll({ page, product, per_page: PER_PAGE });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const getOneProduct = createAsyncThunk(
    "products/getOne",
    (id, thunkAPI) => {
        try {
            return productApi.getOne(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
)

export const addProduct = createAsyncThunk(
    "products/Added",
    (data, thunkAPI) => {
        try {
            return productApi.create(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/Deleted",
    (id, thunkAPI) => {
        try {
            return productApi.remove(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/Update",
    (data, thunkAPI) => {
        try {
            return productApi.update(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        product: null,
        categories: [],
        data: [],
        isLoading: false,
        pagination: {
            currentPage: 1,
            perPage: PER_PAGE,
            totalRow: 0,
        },
    },
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            const { currentPage, perPage, totalRow } = action.payload?.pagination;
            state.data = action.payload.data;
            state.pagination.perPage = perPage;
            state.pagination.currentPage = currentPage;
            state.pagination.totalRow = totalRow;
            state.isLoading = false;
        },
        [getProducts.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getOneProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getOneProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.categories = action.payload.categories;
            state.isLoading = false;
        },
        [getOneProduct.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [addProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addProduct.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [deleteProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.data = state.data.filter(d => Number(d.id) !== Number(action.payload));
            state.pagination.totalRow -= 1;
            state.isLoading = false;
        },
        [deleteProduct.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [updateProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateProduct.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const productsSelector = (state) => state.productReducer;

export default productsSlice.reducer;
