export const todosReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];

    case 'COMPLETE_TODO':
      return action.payload.state ?
      [...state.map((todo) => todo.id === action.payload.id ? {...todo, isCompleted: true} : todo)] :
      [...state.map((todo) => todo.id === action.payload.id ? {...todo, isCompleted: false} : todo)];

    case 'EDIT_TODO':
      return [...state.map((todo) => todo.id === action.payload.id ? {...todo, task: action.payload.taskName} : todo)];

    case 'DELETE_TODO':
      return [...state.filter((todo) => todo.id !== action.payload)];

    default:
      return [...state];
  }
}