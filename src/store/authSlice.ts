import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isTwoFactorAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("authenticated") === "true",
  isTwoFactorAuthenticated: localStorage.getItem("twoFactorAuthenticated") === "true",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem("token", action.payload || "");
      localStorage.setItem("authenticated", JSON.stringify(state.isAuthenticated));
    },
    setTwoFactorAuthenticated(state, action: PayloadAction<boolean>) {
      state.isTwoFactorAuthenticated = action.payload;
      localStorage.setItem("twoFactorAuthenticated", JSON.stringify(action.payload));
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.isTwoFactorAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("twoFactorAuthenticated");
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setToken, setTwoFactorAuthenticated, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
