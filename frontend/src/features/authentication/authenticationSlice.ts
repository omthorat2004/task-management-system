import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../../constants";


export const signup = createAsyncThunk(
  "auth/signup",
  async (body: any, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.detail || "Signup failed");
      }

      return data; // 👈 REQUIRED
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Server Error"
      );
    }
  }
);
const initialState = {
  loading: false,
  user: null,
  token: localStorage.getItem(TOKEN_NAME),
  error: null as string | null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
