import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { TodosContext } from "./store/todos-context";

import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase/firebase";

import { Todos } from "./components/Todos/Todos";
import { Todo } from "./components/Todo/Todo";

function App() {
  const { dispatch } = useContext(TodosContext);

  const converter = (obj) => {
    const result = [];

    for (let todo in obj) {
      result.push(obj[todo]);
    }

    return result;
  };

  useEffect(() => {
    const db = getDatabase(app);
    const todosRef = ref(db, "todos");
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      const todos = converter(data);

      dispatch({ type: "INIT_TODOS", payload: todos });
    });
  }, [dispatch]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/:id" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
