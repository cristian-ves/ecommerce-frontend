import {
    createAsyncThunk,
    createSlice,
    isPending,
    isFulfilled,
    isRejected,
} from "@reduxjs/toolkit";
import {
    fetchTopClientsOrders,
    fetchTopClientsProducts,
    fetchTopClientsRevenue,
    fetchTopProducts,
    fetchTopSellersItems,
} from "./";
import type {
    ReportsState,
    TopClientOrders,
    TopClientProducts,
    TopClientRevenue,
    TopItem,
    TopSellerItems,
} from "./";

const initialState: ReportsState = {
    topProducts: [],
    topSellers: [],
    topSellersItems: [],
    topClientsOrders: [],
    topClientsProducts: [],
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

export const fetchTopClientsOrdersThunk = createAsyncThunk<
    TopClientOrders[],
    { startDate: string; endDate: string },
    { rejectValue: string }
>(
    "reports/fetchTopClientsOrders",
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            return await fetchTopClientsOrders(startDate, endDate);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch top clients orders"
            );
        }
    }
);

export const fetchTopClientsProductsThunk = createAsyncThunk<
    TopClientProducts[],
    void,
    { rejectValue: string }
>("reports/fetchTopClientsProducts", async (_, { rejectWithValue }) => {
    try {
        return await fetchTopClientsProducts();
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to fetch top clients products"
        );
    }
});

const reportThunks = [
    fetchTopProductsThunk,
    fetchTopClientsRevenueThunk,
    fetchTopSellersItemsThunk,
    fetchTopClientsOrdersThunk,
    fetchTopClientsProductsThunk,
] as const;

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopProductsThunk.fulfilled, (state, action) => {
                state.topProducts = action.payload;
            })
            .addCase(fetchTopClientsRevenueThunk.fulfilled, (state, action) => {
                state.topSellers = action.payload;
            })
            .addCase(fetchTopSellersItemsThunk.fulfilled, (state, action) => {
                state.topSellersItems = action.payload;
            })
            .addCase(fetchTopClientsOrdersThunk.fulfilled, (state, action) => {
                state.topClientsOrders = action.payload;
            })
            .addCase(
                fetchTopClientsProductsThunk.fulfilled,
                (state, action) => {
                    state.topClientsProducts = action.payload;
                }
            )

            .addMatcher(isPending(...reportThunks), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isFulfilled(...reportThunks), (state) => {
                state.loading = false;
            })
            .addMatcher(isRejected(...reportThunks), (state, action) => {
                state.loading = false;
                state.error =
                    (action.payload as string) || "Failed to fetch report data";
            });
    },
});

export default reportsSlice.reducer;
