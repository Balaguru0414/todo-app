import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

const Form = ({ fetchTodos }) => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth0();

  // =========== CREATE TODO ===========
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      try {
        await axios.post("http://localhost:5000/api/todos", {
          text: inputValue,
          done: false,
          user: user?.email,
        });

        setInputValue("");
        fetchTodos();
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
      <input
        type="text"
        maxLength="30"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new to-do item"
        className="px-4 py-2 border rounded-md w-full"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 mt-2 bg-blue-500 text-white rounded-md"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
