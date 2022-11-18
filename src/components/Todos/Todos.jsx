import { useState, useContext } from "react";

import { TodosContext } from "../../store/todos-context";

import { AddTodo } from "../AddTodo/AddTodo";
import { EditTodo } from "../EditTodo/EditTodo";
import { Row } from "../Row/Row";

export const Todos = () => {
  const { todos } = useContext(TodosContext);

  const [isEditTodoOpen, setIsEditTodoOpen] = useState(false);

  const saveTodoHandler = () => {
    setIsEditTodoOpen(false);
  }

  return (
    <section className="w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
      {isEditTodoOpen ? (
        <EditTodo onSaveTodo={saveTodoHandler} />
      ) : (
        <>
          <AddTodo />
          <div className="h-10" />
          {todos && todos.map((todo) => <Row key={todo.id} todo={todo} onEditTodo={() => setIsEditTodoOpen(true)} />)}
          {!todos.length && <h2 className="font-bold">No Todos yet...</h2>}
        </>
      )}
    </section>
  );
};
