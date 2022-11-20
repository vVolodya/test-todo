import dayjs from "dayjs";

import { useState, useRef, useContext } from "react";

import { TodosContext } from "../../store/todos-context";

export const EditTodo = ({ todo, onEdit }) => {
  const { dispatch } = useContext(TodosContext);

  const [task, setTask] = useState(todo.task);
  const [desc, setDesc] = useState(todo.description);

  const filesInputRef = useRef();
  const dateInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const filesNames = [];

    for (let i = 0; i < filesInputRef.current.files.length; i++) {
      filesNames.push(filesInputRef.current.files[i].name);
    }

    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: todo.id,
        task,
        desc,
        files: filesNames,
        date: dayjs(dateInputRef.current.value).format("DD.MM.YYYY"),
      },
    });

    onEdit();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-between w-full"
    >
      <div className="flex flex-col w-full space-y-4">
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Title"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="text"
          name="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="file"
          name="files"
          ref={filesInputRef}
          multiple
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <input
          type="date"
          name="due-date"
          ref={dateInputRef}
          min={new Date()}
        />
      </div>
      <button
        type="submit"
        className="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        Save
      </button>
    </form>
  );
};
