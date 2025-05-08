import React from 'react';
// import logo from './logo.svg';
import TodoForm from './features/todo/TodoForm/TodoForm';
import TodoList from './features/todo/TodoList/TodoList';
import Loader from './features/todo/Loader/Loader';
import { useSelector } from 'react-redux';
import { todoSelector } from './features/todo/todoSlice';

function App() {
  const {loading} = useSelector(todoSelector)
  return (
    <div className="App">
      <header className="App-header">
      <h1 className='text-center'>TODO LIST</h1>
      </header>
        {loading&&<Loader/>}
        <TodoForm/>
        <TodoList />
    </div>
  );
}

export default App;
