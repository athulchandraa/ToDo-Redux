import { createSlice } from "@reduxjs/toolkit";

const toDoSlice=createSlice({
    name:"ToDos",
    initialState:{
        TodoList:[]
    },
    reducers:{
        TaskAdding:(state,action)=>{
            state.TodoList.push(action.payload)
        },
        TaskDelete:(state,action)=>{
            state.TodoList=state.TodoList.filter(item=>item.id!=action.payload)
        },
        SearchTask:(state,action)=>{
            state.TodoList=state.TodoList.filter(item=>item.title.includes(action.payload))
        },
        UpdateTask:(state,action)=>{
            state.TodoList=state.TodoList.map(item=>item.id==action.payload.id ? action.payload : item)
        }
    }
})

export default toDoSlice.reducer
export const {TaskAdding,TaskDelete,SearchTask,UpdateTask}=toDoSlice.actions