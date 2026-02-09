import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ============================
   Types
   ============================ */

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  assigned_user: string;
  status: TaskStatus;
  due_date: string;     // YYYY-MM-DD
  created_at: string;  // ISO string
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

/* Payloads */

interface CreateTaskPayload {
  title: string;
  description: string;
  assigned_user: string;
  due_date: string; // YYYY-MM-DD
}

interface UpdateTaskPayload extends CreateTaskPayload {
  id: number;
  status: TaskStatus;
}

/* ============================
   Initial State
   ============================ */

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

/* ============================
   Async Thunks
   ============================ */

/* Fetch all tasks (Admin) */
export const fetchTasks = createAsyncThunk(
  "task/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<Task[]>("/task");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Failed to fetch tasks");
    }
  }
);

/* Create task */
export const createTask = createAsyncThunk(
  "task/create",
  async (payload: CreateTaskPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post<Task>("/task/create", payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Failed to create task");
    }
  }
);

/* Update task */
export const updateTask = createAsyncThunk(
  "task/update",
  async (payload: UpdateTaskPayload, { rejectWithValue }) => {
    try {
      const { id, ...data } = payload;
      const res = await axios.put<Task>(`/task/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Failed to update task");
    }
  }
);

/* ============================
   Slice
   ============================ */

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* Fetch tasks */
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* Create task */
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* Update task */
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
