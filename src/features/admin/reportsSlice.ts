import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import {
    fetchTopClientsRevenue,
    fetchTopProducts,
    fetchTopSellersItems,
} from "./";
import type {
    ReportsState,
    TopClientRevenue,
    TopItem,
    TopSellerItems,
} from "./";

const initialState: ReportsState = {
    topProducts: [],
    topSellers: [],
    topSellersItems: [],
    loading: false,
    error: null,
};

export const fetchTopProductsThunk = createAsyncThunk<
    TopItem[],
    { startDate: string; endDate: string },
    { rejectValue: string }
>(
    "reports/fetchTopProducts",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            return await fetchTopProducts(startDate, endDate);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch top products"
            );
        }
    }
);

export const fetchTopClientsRevenueThunk = createAsyncThunk<
    TopClientRevenue[],
    { startDate: string; endDate: string },
    { rejectValue: string }
>(
    "reports/fetchTopClientsRevenue",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            return await fetchTopClientsRevenue(startDate, endDate);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch top clients revenue"
            );
        }
    }
);

export const fetchTopSellersItemsThunk = createAsyncThunk<
    TopSellerItems[],
    { startDate: string; endDate: string },
    { rejectValue: string }
>(
    "reports/fetchTopSellersItems",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            return await fetchTopSellersItems(startDate, endDate);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch top sellers by items"
            );
        }
    }
);

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopProductsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTopProductsThunk.fulfilled,
                (state, action: PayloadAction<TopItem[]>) => {
                    state.topProducts = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchTopProductsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching top products";
            })
            .addCase(
                fetchTopClientsRevenueThunk.fulfilled,
                (state, action: PayloadAction<TopClientRevenue[]>) => {
                    state.topSellers = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                fetchTopSellersItemsThunk.fulfilled,
                (state, action: PayloadAction<TopSellerItems[]>) => {
                    state.topSellersItems = action.payload;
                    state.loading = false;
                }
            );
    },
});

export default reportsSlice.reducer;
