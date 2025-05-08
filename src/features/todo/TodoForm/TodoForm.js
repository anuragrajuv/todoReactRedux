// Import necessary functions and components
import { addTodoAsync, actions, updateTodoAsync, todoSelector } from "../todoSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./TodoForm.css";

// Define the TodoForm component
export default function TodoForm() {
    // State to hold the text of the todo item
    const [todoText, setTodoText] = useState("");

    // Redux dispatch function to dispatch actions
    const dispatch = useDispatch();

    // Extract editingTodo from the Redux store using the todoSelector
    const { editingTodo } = useSelector(todoSelector);

    // Determine if the form is in editing mode
    const isEditing = Boolean(editingTodo);

    // Effect to update the input field when editingTodo changes
    useEffect(() => {
        if (isEditing && editingTodo) {
            // If editing, set the input field to the title of the todo being edited
            setTodoText(editingTodo.title);
        } else {
            // If not editing, clear the input field
            setTodoText("");
        }
    }, [isEditing, editingTodo]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate that the input field is not empty
        if (!todoText) {
            alert("Please enter task name");
            return;
        }

        if (isEditing) {
            // If editing, dispatch an action to update the todo
            dispatch(updateTodoAsync({ ...editingTodo, title: todoText }))
                .then(() => actions.setEditingTodo(null)); // Clear editing state after update
        } else {
            // If not editing, dispatch an action to add a new todo
            dispatch(addTodoAsync(todoText));
        }

        // Clear the input field after submission
        setTodoText("");
    };

    // Render the form
    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Input field for the todo text */}
                    <input
                        type="text"
                        value={todoText}
                        onChange={(e) => {
                            setTodoText(e.target.value);
                        }}
                    />
                    {/* Submit button with dynamic label based on editing state */}
                    <button className="btn btn-success float-end" type="submit">
                        {isEditing ? "Update Todo" : "Create Todo"}
                    </button>
                </form>
            </div>
        </>
    );
}