import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import Todos from "./components/Todos";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const { user, isAuthenticated, logout } = useAuth0();
  const filteredTodo = todos.filter((todo) => todo.user === user?.email);

  useEffect(() => {
    fetchTodos();
  }, []);

  // =========== GET TODO ===========
  const fetchTodos = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/todos")
        .then((res) => setTodos(res.data));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="max-w-md mx-auto mt-8">
          <h1 className="text-3xl font-semibold mb-4">
            Hello{" "}
            <span className="font-bold uppercase text-red-500">
              {user?.nickname}
            </span>{" "}
            your To-Do List
          </h1>

          {/* ========== FORM ========== */}
          <Form fetchTodos={fetchTodos} />

          {/* ========== TODOS ========== */}
          <Todos todos={filteredTodo} fetchTodos={fetchTodos} />

          {/* ========== Logout ========== */}
          <button
            className="bg-red-500 hover:bg-red-700 fixed right-5 top-5 text-white font-bold py-2 px-4 rounded"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default TodoList;
