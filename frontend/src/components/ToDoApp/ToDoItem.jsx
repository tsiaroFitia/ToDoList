import React from "react";
import { FaTrash } from "react-icons/fa";
import {
  IoIosCheckmarkCircle,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

const ToDoItem = ({ text, id, isComplete, onDelete, onToggleComplete }) => {
  const handleToggle = () => {
    onToggleComplete(id, !isComplete);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center justify-between my-3 gap-3 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={handleToggle}
          aria-label={
            isComplete ? "Marquer comme incomplet" : "Marquer comme complet"
          }
          className="flex-shrink-0"
        >
          {isComplete ? (
            <IoIosCheckmarkCircle
              size={25}
              className="text-blue-600 hover:text-blue-400 transition-colors duration-200"
            />
          ) : (
            <IoMdCheckmarkCircleOutline
              size={25}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            />
          )}
        </button>
        <span
          className={`truncate ${
            isComplete ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        aria-label="Supprimer la tâche"
        className="flex-shrink-0 ml-2"
      >
        <FaTrash
          size={18}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        />
      </button>
    </div>
  );
};

export default ToDoItem;
