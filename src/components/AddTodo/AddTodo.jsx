import uuid from "react-uuid";
import dayjs from "dayjs";

import { React, useContext, useRef } from "react";

import { TodosContext } from "../../store/todos-context";

import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

export const AddTodo = () => {
  const { dispatch } = useContext(TodosContext);

  const taskInputRef = useRef();
  const descInputRef = useRef();
  const filesInputRef = useRef();

  const addTodoHandler = (e) => {
    e.preventDefault();

    const newTask = {
      id: uuid(),
      task: taskInputRef.current.value,
      description: descInputRef.current.value,
      date: dayjs(new Date()).format("DD.MM.YYYY"),
      isCompleted: false,
    };

    taskInputRef.current.value = "";
    descInputRef.current.value = "";
    filesInputRef.current.value = "";

    dispatch({ type: "ADD_TODO", payload: newTask });
  };

  return (
    <form onSubmit={addTodoHandler} className="flex justify-between w-full">
      <div className="flex flex-col w-full space-y-4">
        <input
          type="text"
          name="task"
          ref={taskInputRef}
          placeholder="Title"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="text"
          name="description"
          ref={descInputRef}
          placeholder="Description"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="file"
          multiple
          ref={filesInputRef}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        ></input>
      </div>
      <button type="submit" aria-label="Add todo">
        <PlusIcon />
      </button>
    </form>
  );
};
