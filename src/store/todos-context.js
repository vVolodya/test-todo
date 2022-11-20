import { useReducer, createContext } from "react";

import { todosReducer } from "./todos-reducer";

export const TodosContext = createContext({
  todos: [],
  dispatch: () => {},
});

export const TodosContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

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
