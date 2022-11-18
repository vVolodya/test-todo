import { useContext, useRef } from "react";

import { TodosContext } from "../../store/todos-context";

export const EditTodo = (props) => {
  const { dispatch } = useContext(TodosContext);



  const onSubmitHandler = (e) => {
    e.preventDefault();

    // dispatch({
    //   type: "EDIT_TODO",
    //   payload: { id: props.todo.id, taskName: e.target.value },
    // });

    props.onSaveTodo();
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
          placeholder="Title"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          required
        />
        <input
          type="file"
          name='files'
          multiple
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        ></input>
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
