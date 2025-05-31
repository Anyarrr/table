import { createSlice } from "@reduxjs/toolkit";

interface TodoState {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Todo {
  todos: TodoState[];
  originalTodos: TodoState[];
  isSorted: boolean;
  currentPage: number;
  itemsPage: number; 
}

const initialState: Todo = {
  todos: [],
  originalTodos: [],
  isSorted: false,
  currentPage: 1,
  itemsPage: 4,
};

const now = new Date();
const formattedDate = `${now.getDate().toString().padStart(2, "0")}-${(
  now.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${now.getFullYear()}`;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: false,
        createdAt: formattedDate,
      };
      state.todos.push(newTodo);
      state.originalTodos = state.todos;

      state.currentPage = Math.ceil(state.todos.length / state.itemsPage);
    },
    toggleTodo: (state, action) => {
      const checked = state.todos.find((item) => item.id === action.payload.id);
      if (checked) {
        checked.completed = !checked.completed;
      }
      state.originalTodos = checked ? state.todos : state.originalTodos;
    },
    editTodo: (state, action) => {
      const edit = state.todos.find((item) => item.id === action.payload.id);
      if (edit) {
        edit.title = action.payload.title;
      }
      const original = state.originalTodos.find(
        (item) => item.id === action.payload.id
      );
      if (original) {
        original.title = action.payload.title;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
      state.originalTodos = state.todos;
    },
    sotrTodo: (state) => {
      if (state.isSorted) {
        state.todos = state.originalTodos;
      } else {
        state.todos = state.todos.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      state.isSorted = !state.isSorted;
    },
    filteredTodo: (state, action) => {
      const filterText = action.payload.filter.toLowerCase();
      if (!filterText) {
        state.todos = state.originalTodos;
      } else {
        state.todos = state.originalTodos.filter((item) =>
          item.title.toLowerCase().includes(filterText)
        );
      }
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
});

export const {addTodo,toggleTodo,editTodo,removeTodo,sotrTodo,filteredTodo, changePage} = todoSlice.actions;
export default todoSlice.reducer;
