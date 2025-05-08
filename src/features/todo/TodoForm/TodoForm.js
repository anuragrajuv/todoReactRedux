import { addTodoAsync, actions,updateTodoAsync, todoSelector } from "../todoSlice";
import { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./TodoForm.css"



export default function TodoForm(){
    const [todoText, setTodoText] = useState("");
    const dispatch = useDispatch();

    const {editingTodo} = useSelector(todoSelector);
    const isEditing = Boolean(editingTodo);


    useEffect(()=>{
        if(isEditing&&editingTodo){
            setTodoText(editingTodo.title)
        }else{
            setTodoText("");
        }
    },[isEditing,editingTodo])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!todoText){
            alert("please enter task name")
            return;
        }
        if(isEditing){
            dispatch(updateTodoAsync({...editingTodo,title:todoText}))
            .then(()=>actions.setEditingTodo(null))
        }else{
            dispatch(addTodoAsync(todoText));  
        }
        setTodoText("");
    }

    return(
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={todoText}
                onChange={(e) =>{
                    setTodoText(e.target.value);}}
                 />
                <button className="btn btn-success float-end" type="submit">
                    {isEditing ? "Update Todo" : "Create Todo"}
                </button>
            </form>
        </div>
        
        </>
    )
}