import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitialTodosAsync, todoSelector,actions} from '../todoSlice';
import "./TodoList.css";

export default function TodoList() {
  const {todos,editingTodo} = useSelector(todoSelector);
  const dispatch = useDispatch();

  const handleEdit = (todo) => {
    dispatch(actions.setEditingTodo(todo));
  }
  
  useEffect(()=>{
    dispatch(fetchInitialTodosAsync());
  },[dispatch]);

  return (
    <div className="container">
    <ul className='list'>
      {todos.map((todo,index) => (
        <li key={todo.id} className={todo.completed?"completed-li":null}>
          <span className="content">{todo.title}</span>
          <span className={todo.completed ? 'completed':'pending'}>{todo.completed ? 'Completed': 'Pending'}</span>
          <button className="btn btn-warning"
          onClick={()=>{dispatch(actions.toggle(index))}}
          >Toggle</button>
          <button onClick={()=>handleEdit(todo)} className='btn' disabled={editingTodo?.id===todo.id}>Edit</button>
          </li>
      ))}
    </ul>
    </div>
  );
}
