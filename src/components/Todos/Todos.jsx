import dayjs from "dayjs";

import { useEffect, useContext, useMemo } from "react";

import { TodosContext } from "../../store/todos-context";

import { AddTodo } from "../AddTodo/AddTodo";
import { Row } from "../Row/Row";

export const Todos = () => {
  const { dispatch, todos } = useContext(TodosContext);

  const memoizedTodos = useMemo(() => todos, []);

  useEffect(() => {
    memoizedTodos.forEach((todo) => {
      const today = dayjs(new Date()).format("DD.MM.YYYY");
      const todoDate = todo.date;

      if (todoDate <= today) {
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
