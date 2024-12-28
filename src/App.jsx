import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todoSlice";

function TodoList() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      dispatch(addTodo(input));
      setInput("");
    } else {
      alert("لطفا یک کار جدید وارد کنید.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        لیست کارها
      </h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="کار جدید را وارد کنید"
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-3 ml-3 rounded-md hover:bg-blue-600 transition-all hover:scale-105"
        >
          افزودن
        </button>
      </div>

      <ul className="space-y-4  ">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-4 rounded-md shadow-md flex items-center justify-between "
          >
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="bg-red-500 text-white p-2 ml-3 rounded-md hover:bg-red-600 transition-all hover:scale-105 "
            >
              حذف
            </button>
            <div className="flex items-center ">
              <span
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="ml-3 h-5 w-5 text-blue-500"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
