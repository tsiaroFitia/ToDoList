import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";

const ToDoItem = ({ text, id, isComplete, onDelete }) => {
  const [check, setCheck] = useState(isComplete);

  const toggleCheck = () => setCheck((prev) => !prev);

  return (
    <div className="flex items-center justify-between my-3 gap-3 hover:bg-gray-100 rounded-lg p-4">
      <div className="flex flex-row gap-3">
        <button onClick={toggleCheck}>
          {check ? (
            <IoIosCheckmarkCircle
              size={25}
              className="text-blue-600 hover:text-blue-400"
            />
          ) : (
            <IoCheckmarkCircleOutline
              size={25}
              className="text-gray-600 hover:text-gray-800"
            />
          )}
        </button>
        <span
          className={`${
            check ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {text}
        </span>
      </div>
      <button onClick={() => onDelete(id)}>
        <FaTrash size={20} className="text-gray-500 hover:text-red-600" />
      </button>
    </div>
  );
};

export default ToDoItem;
