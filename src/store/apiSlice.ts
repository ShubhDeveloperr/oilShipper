import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";

// generic API state for handling multiple API calls
interface ApiState {
  [key: string]: {
    data: object ;
    loading: boolean;
    error: string | null;
  };
}

const initialState: ApiState = {};

// Generic async thunk for making API calls with support for different HTTP methods
export const fetchApiData = createAsyncThunk(
  "api/fetchApiData",
  async ({
    name, 
    url,  
    method = "GET", 
    headers = {}, 
    body = null, 
  }: {
    name: string;
    url: string;
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
  }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token; // Get the token from the Redux store

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), 
        ...headers, 
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return { name, data }; 
  }
);

const apiSlice =  createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending, fulfilled, and rejected states for API requests
      .addCase(fetchApiData.pending, (state, action) => {
        const { name } = action.meta.arg;
        state[name] = { data: {}, loading: true, error: null };
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        const { name } = action.payload;
        state[name] = { data: action.payload.data, loading: false, error: null };
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        const { name } = action.meta.arg;
        state[name] = { data: {}, loading: false, error: action.error.message || "An error occurred" };
      });
  },
});

export default apiSlice.reducer;