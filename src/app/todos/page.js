"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchTodos } from "./actions";
import { auth } from "../auth";
import { signIn, signOut } from "next-auth/react"; // Change this import

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function signInWithGoogle() {
    try {
      await signIn("google", { callbackUrl: "/todos" });
    } catch (err) {
      console.error("Sign in error:", err);
    }
  }

  async function signOutOfPage() {
    try {
      await signOut();
      alert("Signed out successfully");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }

  const fetchData = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTask) return;

    const newAddedTask = {
      id: uuidv4(),
      title: newTask,
      completed: false,
    };
    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddedTask),
      });

      if (res.ok) {
        alert("Task added successfully");
        setNewTask("");
        fetchData();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const completeTask = async (id) => {
    try {
      const targetTask = todos.find((todo) => todo.id === id);
      if (!targetTask) return;

      const res = await fetch("http://localhost:3000/api/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: targetTask.title,
          completed: !targetTask.completed,
        }),
      });
      fetchData();
    } catch (err) {}
  };
  const deleteTask = async (id) => {
    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Task deleted successfully");
        fetchData();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-black">Todo List</h1>
      <div className="border p-4 mt-4 rounded-lg shadow-md bg-gray-100">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={signInWithGoogle}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                fill="currentColor"
              />
            </svg>
            Sign in with Google
          </button>

          <button
            onClick={signOutOfPage}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Sign Out
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="task"
            className="block mt-4 text-lg font-semibold text-black"
          >
            Add a new task:
          </label>
          <input
            id="task"
            name="task"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        </form>
      </div>
      <ul className="list-disc list-inside mt-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
          >
            <a href={`todos/${todo.id}`} className="flex-grow">
              <li className="text-lg">
                <span className="font-semibold text-black">{todo.title}</span>
                <span className="ml-2 text-gray-500 b-2">
                  {todo.completed ? "Completed" : "Not Completed"}
                </span>
              </li>
            </a>
            <button
              onClick={() => deleteTask(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-2"
            >
              Delete
            </button>

            <label className="inline items-center cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => completeTask(todo.id)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-checked:bg-green-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
