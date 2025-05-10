import React, { useRef, useState } from "react";
import { FaClipboardList, FaPlus } from "react-icons/fa6";
import ToDoItem from "./ToDoItem";

export default function ToDoApp() {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    const newToDo = { id: Date.now(), text: inputText, isComplete: false };
    setTodoList((prev) => [...prev, newToDo]);
    inputRef.current.value = "";
  };

  const removeTask = (id) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-1/3 flex flex-col bg-white rounded-lg place-self-center p-6 max-w-md min-h-[550px] shadow-lg">
      <div className="flex flex-row gap-4 mb-8 items-center">
        <FaClipboardList size={30} />
        <h1 className="text-3xl font-bold">To-Do List</h1>
      </div>
      <div className="flex flex-row justify-between rounded-full w-full items-center bg-amber-100 p-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task"
          className="flex-1 p-4 pl-6 bg-transparent outline-none border-0 placeholder:text-slate-700"
        />
        <button
          onClick={add}
          className="flex flex-row px-6 gap-4 items-center cursor-pointer p-4 bg-red-500 rounded-full text-white font-medium hover:bg-red-600"
        >
          Add <FaPlus />
        </button>
      </div>
      <div className="mt-4 overflow-y-auto" style={{ maxHeight: "300px" }}>
        {todoList.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No tasks added yet.</p>
        ) : (
          todoList.map((item) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              text={item.text}
              isComplete={item.isComplete}
              onDelete={removeTask}
            />
          ))
        )}
      </div>
      {todoList.length > 0 && (
        <div className="mt-4 px-5 text-sm text-gray-700">
          {todoList.filter((t) => t.isComplete).length} / {todoList.length}
          {"  "}tâches complétées
        </div>
      )}
    </div>
  );
}
