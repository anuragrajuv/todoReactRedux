import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the todo slice
const initialState = {
  todos: [], // List of todos
  editingTodo: null, // Currently editing todo
  loading: false // Loading state for async operations
};

// Async thunk to fetch initial todos from an API
const fetchInitialTodosAsync = createAsyncThunk('todo/fetchInitialTodos',
  () => {
    return axios.get("https://jsonplaceholder.typicode.com/todos"); // Fetch todos from API
  }
);

// Async thunk to update a todo on the server
const updateTodoAsync = createAsyncThunk('todo/updateTodo',
  async (payload) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, {
      method: 'PUT', // HTTP PUT method to update the todo
      body: JSON.stringify({
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // JSON content type
      },
    });

    const data = await response.json();
    return data; // Return the updated todo
  }
);


// Async thunk to add a new todo to the server
const addTodoAsync = createAsyncThunk("todo/addTodo",
  async (payload) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST", // HTTP POST method to create a new todo
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // JSON content type
      },
      body: JSON.stringify({
        title: payload, // Title of the new todo
        completed: false, // Default completed status
        id: new Date() // Generate a unique ID
      })
    });
    return response.json(); // Return the created todo
  }
);


// Async Thunk to delete a todo from the server
const deleteTodoAsync = createAsyncThunk('todo/deleteTodo',
  async (payload) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${payload}`, {
      method: 'DELETE'
    });
    return payload; // Return the id of the deleted todo
  }
)
// Create a slice for todos
const todoSlice = createSlice({
  name: 'todo', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer to toggle the completed status of a todo
    toggle: (state, action) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.completed = !todo.completed; // Toggle the completed status
      }
    },
    // Reducer to set the currently editing todo
    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching todos
      .addCase(fetchInitialTodosAsync.pending, (state) => {
        state.loading = true;
      })
      // Handle fulfilled state for fetching todos
      .addCase(fetchInitialTodosAsync.fulfilled, (state, action) => {
        state.todos = [...action.payload.data]; // Set fetched todos
        state.loading = false;
      })
      // Handle rejected state for fetching todos
      .addCase(fetchInitialTodosAsync.rejected, (state) => {
        state.loading = false;
      })
      // Handle pending state for adding a todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      // Handle fulfilled state for adding a todo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.unshift(action.payload); // Add the new todo to the list
        state.loading = false;
      })
      // Handle rejected state for adding a todo
      .addCase(addTodoAsync.rejected, (state) => {
        state.loading = false;
      })
      // Handle pending state for updating a todo
      .addCase(updateTodoAsync.pending, (state) => {
        state.loading = true;
      })
      // Handle fulfilled state for updating a todo
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo; // Update the todo in the list
        }
        state.editingTodo = null; // Clear the editing todo
        state.loading = false;
      })
      // Handle rejected state for updating a todo
      .addCase(updateTodoAsync.rejected, (state) => {
        state.loading = false;
        state.editingTodo = null; // Clear the editing todo
      })
      .addCase(deleteTodoAsync.pending,(state)=>{
        state.loading = true;
      })
      .addCase(deleteTodoAsync.fulfilled,(state,action)=>{
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodoAsync.rejected,(state)=>{
        state.loading = false;
      })
  },
});

// Export the reducer for the todo slice
export const todoReducer = todoSlice.reducer;

// Export async thunks
export { fetchInitialTodosAsync, addTodoAsync, updateTodoAsync ,deleteTodoAsync};

// Export actions from the slice
export const actions = todoSlice.actions;

// Selector to get the todo state from the store
export const todoSelector = (state) => state.todo;