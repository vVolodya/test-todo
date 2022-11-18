import { useReducer, createContext } from "react";

import { todosReducer } from "./todos-reducer";

import { DUMMY_TODOS } from "../DUMMY_TODO/Todos";

export const TodosContext = createContext({
  todos: [],
  dispatch: () => {},
});

export const TodosContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, DUMMY_TODOS);

  const contextValues = {
    todos,
    dispatch,
  };

  return (
    <TodosContext.Provider value={contextValues}>
      {children}
    </TodosContext.Provider>
  );
};
