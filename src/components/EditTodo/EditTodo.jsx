import dayjs from "dayjs";

import { useState, useRef, useContext } from "react";

import { getDatabase, ref, update } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";

import { TodosContext } from "../../store/todos-context";

/**
 * @description
 * Component for editing a todo
 * @returns {JSX.Element}
 */

export const EditTodo = ({ todo, onEdit }) => {
  const { dispatch } = useContext(TodosContext);

  const [task, setTask] = useState(todo.task);
  const [desc, setDesc] = useState(todo.description);

  const filesInputRef = useRef();
  const dateInputRef = useRef();

  /**
   * @description
   * Submit handler for editing existing Todo
   * And updating Firebase DB entry
   */

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const filesNames = [];

    if (filesInputRef.current.files.length > 0) {
      for (let i = 0; i < filesInputRef.current.files.length; i++) {
        const currentFile = filesInputRef.current.files[i];
        const storage = getStorage();
        const storageRef = sRef(storage, `${todo.id}/${currentFile.name}`);
        uploadBytes(storageRef, currentFile);
      }

      for (let i = 0; i < filesInputRef.current.files.length; i++) {
        filesNames.push(filesInputRef.current.files[i].name);
      }
    }

    /**
     * Updated task
     * @typedef {Object} updatedTask
     * @property {string} id - The task id
     * @property {string} task - The task
     * @property {string} description - The description of the task
     * @property {string} date - The due date
     * @property {string} files - Files included in the task
     * @property {boolean} isCompleted - Task completed or not
     */

    const updatedTask = {
      id: todo.id,
      task,
      description: desc,
      files: filesNames.join(","),
      date: dayjs(dateInputRef.current.value).format("DD.MM.YYYY"),
      isCompleted: false,
    };

    /**
     * @description - Updates the task
     */

    const db = getDatabase(app);
    update(ref(db, `todos/${todo.id}`), updatedTask);

    dispatch({
      type: "EDIT_TODO",
      payload: updatedTask,
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
          required
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
