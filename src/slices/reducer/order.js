import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../../api/orderApi";
export const PER_PAGE = 10;

export const getOrders = createAsyncThunk(
    "orders/getAll",
    ({ page, lastname }, thunkAPI) => {
        try {
            return orderApi.getAll({ page, lastname, per_page: PER_PAGE });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const getOneOrder = createAsyncThunk(
    "orders/getOne",
    (id, thunkAPI) => {
        try {
            return orderApi.getOne(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
)

export const addOrder = createAsyncThunk(
    "orders/Added",
    (data, thunkAPI) => {
        try {
            return orderApi.create(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/Deleted",
    (id, thunkAPI) => {
        try {
            return orderApi.remove(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const updateOrder = createAsyncThunk(
    "orders/Update",
    (data, thunkAPI) => {
        try {
            return orderApi.update(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        order: null,
        categories: [],
        products: [],
        customers: [],
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
        [getOrders.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getOrders.fulfilled]: (state, action) => {
            const { currentPage, perPage, totalRow } = action.payload?.pagination;
            state.data = action.payload.data;
            state.pagination.perPage = perPage;
            state.pagination.currentPage = currentPage;
            state.pagination.totalRow = totalRow;
            state.isLoading = false;
        },
        [getOrders.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getOneOrder.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getOneOrder.fulfilled]: (state, action) => {
            state.order = action.payload?.order;
            state.categories = action.payload?.categories;
            state.products = action.payload?.products;
            state.customers = action.payload?.customers;
            state.isLoading = false;
        },
        [getOneOrder.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [addOrder.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addOrder.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [deleteOrder.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.data = state.data.filter(d => Number(d.id) !== Number(action.payload));
            state.pagination.totalRow -= 1;
            state.isLoading = false;
        },
        [deleteOrder.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [updateOrder.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateOrder.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const ordersSelector = (state) => state.orderReducer;

export default ordersSlice.reducer;
