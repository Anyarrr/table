import { Todo } from "../features/todosSlice";

export const saveToLocalStorage  = (state: Todo) => {
    try{
        localStorage.setItem('todoState', JSON.stringify(state))
    }catch(e) {
        console.log('Ошибка', (e));
    }
};

export const loadFromLocalStorage  = () => {
    try{
        const data = localStorage.getItem('todoState');
        return data ? JSON.parse(data) : undefined;
    }catch(e){
        console.log('Ошибка', (e));
        return undefined;
    }
}