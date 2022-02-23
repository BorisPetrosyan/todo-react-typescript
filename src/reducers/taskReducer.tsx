import React from "react";
import {Actions, State} from "../types/types";
import {ActionType} from "../constants/userConstant";


export const taskReducer = (state: State[], action : Actions):State[] => {

    switch (action.type) {
        case ActionType.ADD_TASK: {
            return [...state, action.task]
        }
        case ActionType.CHECK_TASK:
            let taskIndex = state.findIndex(t => t.id === action.task.id);
            state[taskIndex].isChecked = action.task.isChecked
            return state.filter(task => task.id !== action.id);
        case ActionType.REMOVE_TASK: {
            return state.filter(task => task.id !== action.id)
        }
        case ActionType.CHANGE_POSITION: {
            return state.map(t => {
                if(t.id === action.task.id) {
                    return {...t, order:action.currentBoard.order}
                }
                if(t.id === action.currentBoard.id) {
                    return {...t, order:action.task.order}
                }
                return  t
            })
        }
        case ActionType.TASK_UPDATE: {
            return state.map((todo) => {
                if(todo.id === action.task.id) {
                    return {...todo,todo: action.task.updatedTodo};
                }
                return todo;
            });
        }
        default:
            return state;
    }
}