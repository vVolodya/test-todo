import uuid from "react-uuid";
import dayjs from "dayjs";

import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/firebase";

import { useRef } from "react";

import { ReactComponent as PlusIcon } from "../../assets/plus.svg";

/**
 * Component for adding new Todo
 * @returns {JSX.Element}
 */

export const AddTodo = () => {
  const taskInputRef = useRef();
  const descInputRef = useRef();
  const filesInputRef = useRef();
  const dateInputRef = useRef();

  /**
   * Submit handler for adding new Todo to Firebase DB
   */

  const addTodoHandler = (e) => {
    e.preventDefault();

    const todoID = uuid();

    const filesNames = [];

    if (filesInputRef.current.files.length > 0) {
      /**
       * Uploading files to Firebase Storage
       */

      for (let i = 0; i < filesInputRef.current.files.length; i++) {
        const currentFile = filesInputRef.current.files[i];
        const storage = getStorage();
        const storageRef = sRef(storage, `${todoID}/${currentFile.name}`);
        uploadBytes(storageRef, currentFile);
      }

      /**
       * Adding files names to the todo
       */

      for (let i = 0; i < filesInputRef.current.files.length; i++) {
        filesNames.push(filesInputRef.current.files[i].name);
      }
    }

    /**
     * A new Task
     * @typedef {Object} newTask
     * @property {string} id - The task id
     * @property {string} task - The task
     * @property {string} description - The description of the task
     * @property {string} date - The due date
     * @property {string} files - Files included in the task
     * @property {boolean} isCompleted - Task completed or not
     */

    const newTask = {
      id: todoID,
      task: taskInputRef.current.value,
      description: descInputRef.current.value,
      date: dayjs(dateInputRef.current.value).format("DD.MM.YYYY"),
      files: filesNames.join(","),
      isCompleted: false,
    };

    const db = getDatabase(app);
    set(ref(db, `todos/${todoID}`), newTask);

    taskInputRef.current.value = "";
    descInputRef.current.value = "";
    filesInputRef.current.value = "";
    dateInputRef.current.value = "";
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
        />
        <input
          type="date"
          name="due-date"
          ref={dateInputRef}
          min={new Date()}
          required
        />
      </div>
      <button type="submit" aria-label="Add todo">
        <PlusIcon />
      </button>
    </form>
  );
};
