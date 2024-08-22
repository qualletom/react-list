import {TodolistStateType} from "../App";
import {v4} from "uuid";
import {FilterValues} from "../Todolist";

export type RemoveTodoListActionType = {
  type: 'REMOVE_TODOLIST_BY_ID',
  payload: {
    id: string
  }
}
export type AddTodolistActionType = {
  type: 'ADD_TODOLIST',
  payload: {
    id: string,
    title: string
  }
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE',
  payload: {
    title: string
    id: string
  }
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER',
  payload: {
    id: string
    filter: FilterValues
  }
}

type ActionType = RemoveTodoListActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: TodolistStateType, action: ActionType): TodolistStateType => {
  switch (action.type) {
    case 'REMOVE_TODOLIST_BY_ID': {
      const {id} = action.payload;

      //TODO: Delete tasks for this todolist
      return state.filter(tl => tl.id !== id);
    }
    case 'ADD_TODOLIST': {
      const {id, title} = action.payload;
      //TODO: Add empty tasks array
      return [
        ...state,
        {
          id,
          title,
          filter: FilterValues.ALL
        }
      ]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      const {id, title} = action.payload;

      return state.map(tl => tl.id === id
        ? {
          ...tl,
          title,
        }
        : tl)
    }
    case 'CHANGE_TODOLIST_FILTER': {
      const {id, filter} = action.payload;

      return state.map(tl => tl.id === id
        ? {
          ...tl,
          filter,
        }
        : tl)
    }
    default: {
      throw new Error('Unresolved action type');
    }
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
  return {
    type: "REMOVE_TODOLIST_BY_ID",
    payload: {
      id: todolistId
    }
  }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD_TODOLIST",
    payload: {
      id: v4(),
      title
    }
  }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload: {
      id,
      title
    }
  }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValues): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    payload: {
      id,
      filter
    }
  }
}
