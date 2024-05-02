import React, { useState } from "react";
import axios from "axios";

const Todos = ({ todos, fetchTodos }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // =========== DELETE TODO ===========
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`); // Update the URL with your backend endpoint
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // =========== UPDATE TODO ===========
  const handleEditTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${editId}`, {
        text: editText,
      }); // Update the URL with your backend endpoint
      setEditId(null);
      setEditText("");
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // =========== CHECKBOX ===========
  const handleToggleDone = async (id, done) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        done: !done,
      }); // Update the URL with your backend endpoint
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-2"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone(todo._id, todo.done)}
              className="mr-2 h-6 w-6 rounded-md border-gray-300 focus:ring-blue-500"
            />

            {/* ====== UPDATE FORM ====== */}
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="px-2 py-1 border rounded-md mr-2"
                />
                <button
                  onClick={handleUpdateTodo}
                  className="px-2 py-1 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              </>
            ) : (
              <span className={`${todo.done ? "line-through" : ""}`}>
                {todo.text}
              </span>
            )}
          </div>

          {/* ====== EDIT AND DELETE ====== */}
          <div>
            <button
              onClick={() => handleEditTodo(todo._id, todo.text)}
              className="mr-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
