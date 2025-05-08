import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos:[],
  editingTodo:null,
  loading:false
};


const fetchInitialTodosAsync = createAsyncThunk('todo/fetchInitialTodos',
  ()=>{
    return axios.get("https://jsonplaceholder.typicode.com/todos")
  }
);


const updateTodoAsync = createAsyncThunk('todo/updateTodo',
  async (payload) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.json();
    return data; // ✅ return the updated todo
  }
);

const addTodoAsync = createAsyncThunk("todo/addTodo",
  async(payload)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos",{
      method:"POST",
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      },
      body:JSON.stringify({
        title:payload,
        completed:false,
      })
    })
    return response.json();
  }
)

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers:{
    toggle:(state,action)=>{
      const todo = state.todos[action.payload];
      if(todo){
        todo.completed = !todo.completed
      }
    },
    setEditingTodo:(state,action)=>{
      state.editingTodo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialTodosAsync.pending, (state) => {
      state.loading = true;
      })
      .addCase(fetchInitialTodosAsync.fulfilled, (state, action) => {
      state.todos = [...action.payload.data];
      state.loading = false;
      })
      .addCase(fetchInitialTodosAsync.rejected, (state) => {
      state.loading = false;
      })
      .addCase(addTodoAsync.pending, (state) => {
      state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
      state.loading = false;
      })
      .addCase(addTodoAsync.rejected, (state) => {
      state.loading = false;
      })
      .addCase(updateTodoAsync.pending, (state) => {
      state.loading = true;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
      state.editingTodo = null;
      state.loading = false;
      })
      .addCase(updateTodoAsync.rejected, (state) => {
      state.loading = false;
      state.editingTodo = null;
      });
      
  },
});

export const todoReducer = todoSlice.reducer;
export {fetchInitialTodosAsync,addTodoAsync,updateTodoAsync};
export const actions = todoSlice.actions;

export const todoSelector = (state)=>state.todo;