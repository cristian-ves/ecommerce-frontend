import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  name: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
  name: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; email: string; name: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
