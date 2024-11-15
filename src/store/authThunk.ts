import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, setTwoFactorAuthenticated, setLoading, setError } from "./authSlice";
import { AppDispatch } from "../store";

interface LoginCredentials {
  login: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginUser = createAsyncThunk<void, LoginCredentials, { dispatch: AppDispatch }>(
  "auth/loginUser",
  async ({ login, password }, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch("https://recruitment-api.pyt1.stg.jmr.pl/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = await response.json();

      dispatch(setToken(data.token || "123456789"));
      dispatch(setTwoFactorAuthenticated(false));
      dispatch(setLoading(false));
      
    } catch (error: unknown) {
      dispatch(setLoading(false));
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    }
  }
);
