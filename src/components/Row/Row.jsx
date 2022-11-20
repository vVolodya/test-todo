import { Link } from "react-router-dom";

import { ReactComponent as EditIcon } from "../../assets/pencil.svg";

export const Row = (props) => {
  return (
    <div
      className={`flex w-full p-4 mb-2 justify-between items-center
    ${props.todo.isCompleted ? "bg-gray-400 " : "bg-green-300"}`}
    >
      <p
        className={`ml-2 text-xl font-sans font-medium
      ${props.todo.isCompleted ? "text-white line-through" : "text-gray-700"}`}
      >
        {props.todo.task}
      </p>

      <div className="w-1/6 flex justify-center items-center ">
        <Link to={`/${props.todo.id}`}>
          <button
            onClick={props.onEditTodo}
            type="button"
            aria-label="Edit the todo"
            className="h-7 w-7 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded"
          >
            <EditIcon className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
