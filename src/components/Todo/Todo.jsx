import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getDatabase, ref, remove, update } from "firebase/database";
import { getStorage, ref as sRef, deleteObject } from "firebase/storage";
import { app } from "../../firebase/firebase";

import { TodosContext } from "../../store/todos-context";

import { EditTodo } from "../EditTodo/EditTodo";

export const Todo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos } = useContext(TodosContext);
  const { dispatch } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);

  const todo = todos.find((todo) => todo.id === id);

  const filesArr = todo.files.split(",");

  const deleteHandler = () => {
    const db = getDatabase(app);
    remove(ref(db, `todos/${todo.id}`));

    if (todo.files.length > 0) {
      for (let i = 0; i < filesArr.length; i++) {
        const storage = getStorage(app);
        const todosRef = sRef(storage, `${todo.id}/${filesArr[i]}`);
        deleteObject(todosRef);
      }
    }

    navigate("/");
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  };

  const completeHandler = (e) => {
    const state = e.target.checked;

    const db = getDatabase(app);
    update(ref(db, `todos/${todo.id}`), { isCompleted: state });

    dispatch({ type: "COMPLETE_TODO", payload: { id: todo.id, state } });
  };

  const removeEditForm = () => {
    setIsEditing(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2">
      {isEditing && <EditTodo todo={todo} onEdit={removeEditForm} />}
      <div className="max-w-sm p-6 border rounded-lg shadow-md bg-gray-800 border-gray-700">
        <h5
          className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${
            todo.isCompleted ? "line-through" : ""
          }`}
        >
          {todo.task}
        </h5>
        <p className="mb-3 font-normal text-gray-300">{todo.description}</p>
        <p className="mb-3 font-normal text-gray-300">{todo.date}</p>
        <p className="mb-3 font-normal text-gray-300">
          {filesArr.length > 0 &&
            filesArr.map((file) => (
              <a
                href={`https://firebasestorage.googleapis.com/v0/b/todowomanup.appspot.com/o/${todo.id}%2F${file}?alt=media&token=78befb1f-7595-46fb-9265-046b07e723e7`}
                key={file}
                className="flex hover:text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                {file}
              </a>
            ))}
        </p>
        <div className="flex gap-2 items-center">
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
            checked={todo.isCompleted}
            onChange={completeHandler}
          />
          <button
            onClick={() => setIsEditing((prevState) => !prevState)}
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Edit
          </button>
        </div>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Back
        </button>
      </div>
    </div>
  );
};
