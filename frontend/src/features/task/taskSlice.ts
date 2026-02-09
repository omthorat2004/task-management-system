import type { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  assigned_user: number;
  status: TaskStatus;
  due_date: string; // yyyy-mm-dd
  created_at: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

/* =======================
   Thunks
======================= */

// fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await axios.get("http://localhost:8000/task/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail);
    }
  }
);

// ADMIN: create task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload: {
    title: string;
    description: string;
    assigned_user: number;
    due_date: string;
    status: TaskStatus;
  }, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await axios.post(
      "http://localhost:8000/task/create",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

// ADMIN: update full task
export const adminUpdateTask = createAsyncThunk(
  "tasks/adminUpdate",
  async ({ id, data }: { id: number; data: any }, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await axios.put(
      `http://localhost:8000/task/admin/update/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

// EMPLOYEE: update status only
export const employeeUpdateStatus = createAsyncThunk(
  "tasks/employeeUpdateStatus",
  async ({ id, status }: { id: number; status: TaskStatus }, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await axios.put(
      `http://localhost:8000/task/employee/update-status/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);
/* =======================
   Slice
======================= */

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      // create
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      // admin update
      .addCase(adminUpdateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })

      // employee update status
      .addCase(employeeUpdateStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) state.tasks[index].status = action.payload.status;
      });
  },
});

export default taskSlice.reducer;

