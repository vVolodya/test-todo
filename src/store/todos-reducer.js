export const todosReducer = (state, action) => {
  switch (action.type) {

    case "INIT_TODOS":
      return [...action.payload];

    case "COMPLETE_TODO":
      return action.payload.state
        ? [
            ...state.map((todo) =>
              todo.id === action.payload.id
                ? { ...todo, isCompleted: true }
                : todo
            ),
          ]
        : [
            ...state.map((todo) =>
              todo.id === action.payload.id
                ? { ...todo, isCompleted: false }
                : todo
            ),
          ];

    case "EDIT_TODO":
      return [
        ...state.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                task: action.payload.task,
                description: action.payload.desc,
                files: action.payload.files,
                date: action.payload.date,
              }
            : todo
        ),
      ];

    case "DELETE_TODO":
      return [...state.filter((todo) => todo.id !== action.payload)];

    default:
      return [...state];
  }
};
