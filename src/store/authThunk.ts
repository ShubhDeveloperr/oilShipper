import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, setTwoFactorAuthenticated, setLoading, setError } from "./authSlice";
import { AppDispatch } from "../store";

interface LoginCredentials {
 email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const loginUser = createAsyncThunk<void, LoginCredentials, { dispatch: AppDispatch }>(
  "auth/loginUser",
  async ({email, password }, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data: LoginResponse = await response.json();

      console.log(data,"logData")

      dispatch(setToken(data.access_token || "123456789"));
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
