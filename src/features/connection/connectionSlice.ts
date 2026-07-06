import { createSlice } from "@reduxjs/toolkit";

type ConnectionStatus = "connecting" | "connected" | "disconnected";

const connectionSlice = createSlice({
    name: "connection",
    initialState: { status: "connecting" as ConnectionStatus },
    reducers: {
        setConnectionStatus: (state, action: { payload: ConnectionStatus }) => {
            state.status = action.payload;
        },
    },
});

export const { setConnectionStatus } = connectionSlice.actions;
export default connectionSlice.reducer;
