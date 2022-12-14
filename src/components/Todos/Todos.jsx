import dayjs from "dayjs";

import { useEffect, useContext, useMemo } from "react";

import { getDatabase, ref, update } from "firebase/database";
import { app } from "../../firebase/firebase";

import { TodosContext } from "../../store/todos-context";

import { AddTodo } from "../AddTodo/AddTodo";
import { Row } from "../Row/Row";

/**
 * @description
 * Todos list component
 * @returns {JSX.Element}
 */

export const Todos = () => {
  const { dispatch, todos } = useContext(TodosContext);

  /**
   * @description
   * useMemo hook to memoize the todos array
   */

  const memoizedTodos = useMemo(() => todos, []);

  /**
   * @description
   * useEffect hook to check if any of the todos are outdated
   */

  useEffect(() => {
    memoizedTodos.forEach((todo) => {
      const today = dayjs(new Date()).format("DD.MM.YYYY");
      const todoDate = todo.date;

      /**
       * @description
       * Make the todo completed if the date is outdated
       */

      if (todoDate <= today) {
        const db = getDatabase(app);
        update(ref(db, `todos/${todo.id}`), { isCompleted: true });

        dispatch({
          type: "COMPLETE_TODO",
          payload: { id: todo.id, state: true },
        });
      }
    });
  }, [memoizedTodos, dispatch]);

  return (
    <section className="w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
      <AddTodo />
      <div className="h-10" />
      {todos && todos.map((todo) => <Row key={todo.id} todo={todo} />)}
      {!todos.length && <h2 className="font-bold">No Todos yet...</h2>}
    </section>
  );
};
