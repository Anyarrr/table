import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../features/todosSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const preloadedState = {
    todo: loadFromLocalStorage() || undefined
};



export const store = configureStore({
    reducer : {
        todo: todosSlice,
    },
 preloadedState,

})

store.subscribe(() => saveToLocalStorage(store.getState().todo))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;