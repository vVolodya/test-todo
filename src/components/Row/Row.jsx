import { React, useContext, useState } from "react";

import { TodosContext } from "../../store/todos-context";

import { ReactComponent as EditIcon } from "../../assets/pencil.svg";
import { ReactComponent as CheckMarkIcon } from "../../assets/checkmark.svg";

export const Row = (props) => {
  const { dispatch } = useContext(TodosContext);

  const [isReadOnly, setReadOnly] = useState(true);
  const [inputName, setInputName] = useState(props.todo.task);

  const inputStateHandler = () => {
    setReadOnly((prevState) => !prevState);
  };

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
    dispatch({
      type: "EDIT_TODO",
      payload: { id: props.todo.id, taskName: e.target.value },
    });
  };

  const deleteHandler = () => {
    dispatch({ type: "DELETE_TODO", payload: props.todo.id });
  };

  const completeHandler = (e) => {
    const state = e.target.checked;
    dispatch({ type: "COMPLETE_TODO", payload: { id: props.todo.id, state } });
  };

  return (
    <div
      className={`flex w-full p-4 mb-2 justify-between items-center
    ${props.todo.isCompleted ? "bg-gray-400 " : "bg-green-300"}`}
    >
      <input
        id="task-name-input"
        value={inputName}
        onChange={inputNameHandler}
        readOnly={isReadOnly}
        className={`ml-2 text-xl font-sans font-medium
      ${!isReadOnly ? "font-bold" : null}
      ${props.todo.isCompleted ? "text-white line-through" : "text-gray-700"}`}
      />

      <div className="w-1/6 flex justify-between items-center mr-2">
        {isReadOnly ? (
          <button
            onClick={inputStateHandler}
            type="button"
            aria-label="Edit the todo"
            className="h-7 w-7 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded"
          >
            <EditIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={inputStateHandler}
            type="button"
            aria-label="Edit the todo"
            className="h-7 w-7 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded"
          >
            <CheckMarkIcon className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={deleteHandler}
          aria-label="Delete the todo"
          className="h-7 w-7 flex justify-center items-center bg-red-400 hover:bg-red-500 text-white font-bold rounded"
        >
          X
        </button>

        <input
          type="checkbox"
          className="form-checkbox h-7 w-7"
          onChange={completeHandler}
        />
      </div>
    </div>
  );
};
