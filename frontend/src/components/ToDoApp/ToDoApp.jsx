import React, { useEffect, useState, useRef } from "react";
import { FaClipboardList, FaPlus } from "react-icons/fa6";
import ToDoItem from "./ToDoItem";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../api/todoApi";

export default function ToDoApp() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodoList(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    try {
      const response = await createTodo({
        text: inputText,
        is_complete: false,
      });
      setTodoList((prev) => [response.data, ...prev]);
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTodo(id);
      setTodoList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todoList.find((item) => item.id === id);
      const response = await updateTodo(id, {
        ...todo,
        is_complete: !todo.is_complete,
      });
      setTodoList((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-full md:w-4/5 lg:w-2/3 xl:w-1/3 flex flex-col bg-white rounded-lg mx-auto p-4 sm:p-6 max-w-md min-h-[400px] sm:min-h-[550px] shadow-lg">
      {/* En-tête */}
      <div className="flex flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-center">
        <FaClipboardList className="text-2xl sm:text-3xl" />
        <h1 className="text-2xl sm:text-3xl font-bold">To-Do List</h1>
      </div>

      {/* Formulaire d'ajout */}
      <div className="flex flex-col sm:flex-row justify-between rounded-full w-full items-center bg-amber-100 p-1 sm:p-2 gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task"
          className="flex-1 p-3 sm:p-4 pl-4 sm:pl-6 bg-transparent outline-none border-0 placeholder:text-slate-700 text-sm sm:text-base"
          onKeyPress={(e) => e.key === "Enter" && add()}
        />
        <button
          onClick={add}
          className="flex flex-row px-4 sm:px-6 gap-2 sm:gap-4 items-center cursor-pointer p-2 sm:p-4 bg-red-500 rounded-full text-white font-medium hover:bg-red-400 text-sm sm:text-base"
        >
          Add <FaPlus className="text-sm sm:text-base" />
        </button>
      </div>

      {/* Liste des tâches */}
      <div
        className="mt-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {todoList.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No tasks added yet.</p>
        ) : (
          todoList.map((item) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              text={item.text}
              isComplete={item.is_complete}
              onDelete={removeTask}
              onToggleComplete={toggleComplete}
            />
          ))
        )}
      </div>

      {/* Statistiques */}
      {todoList.length > 0 && (
        <div className="mt-4 px-5 text-xs sm:text-sm text-gray-500 text-center sm:text-left b-0 mb-0 pb-0 field-sizing-fixed">
          {todoList.filter((t) => t.is_complete).length} / {todoList.length}{" "}
          tâches complétées
        </div>
      )}
    </div>
  );
}
