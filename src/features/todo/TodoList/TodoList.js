import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitialTodosAsync, todoSelector, actions, deleteTodoAsync } from '../todoSlice';
import "./TodoList.css";

export default function TodoList() {
  // Extract todos and editingTodo from the Redux store
  const { todos, editingTodo } = useSelector(todoSelector);
  const dispatch = useDispatch();

  // Function to handle editing a todo
  const handleEdit = (todo) => {
    dispatch(actions.setEditingTodo(todo)); // Set the selected todo as the one being edited
  }
  
  // Fetch initial todos when the component mounts
  useEffect(() => {
    dispatch(fetchInitialTodosAsync());
  }, [dispatch]);

  return (
    <div className="container">
      <ul className='list'>
        {/* Render the list of todos */}
        {todos.map((todo, index) => (
          <li key={todo.id} className={todo.completed ? "completed-li" : null}>
            {/* Display the todo title */}
            <span className="content">{todo.title}</span>
            {/* Display the status of the todo */}
            <span className={todo.completed ? 'completed' : 'pending'}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            {/* Button to toggle the completion status of the todo */}
            <button className="btn btn-warning"
              onClick={() => { dispatch(actions.toggle(index)) }}
            >
              Toggle
            </button>
            {/* Button to edit the todo */}
            <button 
              onClick={() => handleEdit(todo)} 
              className='btn' 
              disabled={editingTodo?.id === todo.id} // Disable if the todo is already being edited
            >
              Edit
            </button>
            {/* Button to delete the todo */}
            <button className="btn btn-delete" onClick={() => dispatch(deleteTodoAsync(todo.id))}>
            <i class="fa-solid fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
