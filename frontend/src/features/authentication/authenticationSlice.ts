import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../../constants";


type LoginBody = {
  email:string;
  password:string;
}

type SignupBody = {
  name:string;
  email:string;
  password:string;
}


export const signup = createAsyncThunk(
  "auth/signup",
  async (body: SignupBody, { rejectWithValue }) => {
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

      return data;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Server Error"
      );
    }
  }
);

export const login = createAsyncThunk("auth/login", async (body :LoginBody , { rejectWithValue }) => {
  try {
   
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_API}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      throw new Error(data.detail || "Login failed")
    }

    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err instanceof Error ? err.message : "Server Error")
  }
})

type User = {
  id:Number;
  name:string;
  email:string;
  role:string
}


type initialStateType = {
  loading:boolean;
  user:User|null;
  token:string|null;
  error:string|null;
  success:boolean;
}



const initialState : initialStateType = {
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
    logOut: (state)=>{
      state.token = null
      state.user = null
      localStorage.clear()
    },
    setUser:(state,action)=>{
      state.user = action.payload
    }
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
        state.user = action.payload?.user;
        state.token = action.payload?.access_token

        localStorage.setItem(TOKEN_NAME,state.token as string)
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.token = action.payload.access_token
        state.user = action.payload.user
        localStorage.setItem(TOKEN_NAME,state.token as string)
      })
      .addCase(login.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export const { resetAuthState , logOut,setUser} = authSlice.actions;
export default authSlice.reducer;
