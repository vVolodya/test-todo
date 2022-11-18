import uuid from "react-uuid";

import { React, useContext, useState } from "react";

import { TodosContext } from "../../store/todos-context";

import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

export const AddTodo = () => {
  const { dispatch } = useContext(TodosContext);

  const [input, setInput] = useState("");

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const addTodoHandler = (e) => {
    e.preventDefault();

    const newTask = {
      id: uuid(),
      task: e.target.task.value,
      isCompleted: false,
    };

    setInput("");
    dispatch({ type: "ADD_TODO", payload: newTask });
  };

  return (
    <form onSubmit={addTodoHandler} className="flex justify-between w-full">
      <input
        type="text"
        name="task"
        onChange={inputChangeHandler}
        value={input}
        placeholder="Example: Go eat"
        className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
        required
      />
      <button type="submit" aria-label="Add todo">
        <PlusIcon />
      </button>
    </form>
  );
};
