import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerApi from "../../api/customerApi";
export const PER_PAGE = 10;

export const getCustomers = createAsyncThunk(
    "customers/getAll",
    ({ page, lastname, firstname }, thunkAPI) => {
        try {
            return customerApi.getAll({ page, lastname, firstname, per_page: PER_PAGE });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const getOneCustomer = createAsyncThunk(
    "customers/getOne",
    (id, thunkAPI) => {
        try {
            return customerApi.getOne(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
)

export const addCustomer = createAsyncThunk(
    "customers/Added",
    (data, thunkAPI) => {
        try {
            return customerApi.create(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    "customers/Deleted",
    (id, thunkAPI) => {
        try {
            return customerApi.remove(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const updateCustomer = createAsyncThunk(
    "customers/Update",
    (data, thunkAPI) => {
        try {
            return customerApi.update(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const customersSlice = createSlice({
    name: "customers",
    initialState: {
        customer: null,
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
        [getCustomers.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getCustomers.fulfilled]: (state, action) => {
            const { currentPage, perPage, totalRow } = action.payload?.pagination;
            state.data = action.payload.data;
            state.pagination.perPage = perPage;
            state.pagination.currentPage = currentPage;
            state.pagination.totalRow = totalRow;
            state.isLoading = false;
        },
        [getCustomers.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [getOneCustomer.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getOneCustomer.fulfilled]: (state, action) => {
            state.customer = action.payload;
            state.isLoading = false;
        },
        [getOneCustomer.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [addCustomer.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addCustomer.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [deleteCustomer.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteCustomer.fulfilled]: (state, action) => {
            state.data = state.data.filter(d => d.id != action.payload);
            state.pagination.totalRow -= 1;
            state.isLoading = false;
        },
        [deleteCustomer.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [updateCustomer.pending]: (state, action) => {
            state.isLoading = true;
        },
        [updateCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [updateCustomer.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const customersSelector = (state) => state.customerReducer;

export default customersSlice.reducer;
