import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  task: [],
  error: null,
  loading: false,
};

// Fetch all tasks
export const fetchTask = createAsyncThunk("task/fetchTask/", async () => {
  const res = await axios.get("http://localhost:5000/api/task/");
  return res?.data?.data;
});

// Create a new task
export const createTask = createAsyncThunk("task/createTask/", async (task) => {
  const { title, description } = task;
  try {
    const res = await axios.post("http://localhost:5000/api/task/create", task);
    return res.data;
  } catch (error) {
    toast.error("Failed to create task");
  }
});

// Update a task's title and description
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, title, description }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/update/${id}`,
        { title, description }
      );
      return res.data;
    } catch (error) {
      toast.error("Failed to update task");
    }
  }
);

// Update a task's completion status
export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async ({ id, isCompleted }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/task/${id}/status`,
        { isCompleted }
      );
      return res.data.task;
    } catch (error) {
      toast.error("Failed to update task status");
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ id }) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${id}`);
      return id;
    } catch (error) {
      toast.error("Failed to delete task");
    }
  }
);

// Task Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.task.push(action.payload);
        toast.success("Task created successfully");
      })

      // Update task title and description
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.task.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.task[index] = action.payload;
          toast.success("Task updated successfully");
        }
      })

      // Update task status
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.task.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          state.task[index] = updatedTask;
          toast.success("Task status updated successfully");
        }
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.task = state.task.filter((t) => t._id !== action.payload);
        toast.success("Task deleted successfully");
      });
  },
});

export default taskSlice.reducer;
