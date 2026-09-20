import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './TodoSlice'

const TodoStore=configureStore({
    reducer:{
        ToDoList:todoReducer,
    }
})
export default TodoStore