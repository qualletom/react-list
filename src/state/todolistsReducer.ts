import {TodolistStateType} from "../App";
import {v4} from "uuid";
import {FilterValues} from "../Todolist";

export type RemoveTodoListActionType = {
  type: 'REMOVE_TODOLIST_BY_ID',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD_TODOLIST',
  title: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE',
  title: string
  id: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER',
  id: string
  filter: FilterValues
}

type ActionType = RemoveTodoListActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: TodolistStateType, action: ActionType): TodolistStateType => {
  switch (action.type) {
    case 'REMOVE_TODOLIST_BY_ID': {
      //TODO: Delete tasks for this todolist
      return state.filter(s => s.id !== action.id);
    }
    case 'ADD_TODOLIST': {
      //TODO: Add empty tasks array
      return [
        ...state,
        {
          id: v4(),
          title: action.title,
          filter: FilterValues.ALL
        }
      ]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map(s => s.id === action.id ? {
        ...s,
        title: action.title
      } : s)
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map(s => s.id === action.id ? {
        ...s,
        filter: action.filter
      } : s)
    }
    default: {
      throw new Error('Unresolved action type');
    }
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
  return {type: "REMOVE_TODOLIST_BY_ID", id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD_TODOLIST", title}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    id,
    title
  }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValues): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    id,
    filter
  }
}
