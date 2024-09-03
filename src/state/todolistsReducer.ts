import {v4} from "uuid";
import {FilterValues} from "../Todolist";

export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType = RemoveTodoListActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues
}
export type TodolistStateType = TodolistType[];

const initialState: TodolistStateType = []

export const todolistsReducer = (state: TodolistStateType = initialState, action: ActionType): TodolistStateType => {
  switch (action.type) {
    case 'REMOVE_TODOLIST_BY_ID': {
      const {id} = action.payload;

      return state.filter(tl => tl.id !== id);
    }
    case 'ADD_TODOLIST': {
      const {id, title} = action.payload;

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
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE_TODOLIST_BY_ID",
    payload: {
      id: todolistId
    }
  } as const
}

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD_TODOLIST",
    payload: {
      id: v4(),
      title
    }
  } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE_TODOLIST_TITLE",
    payload: {
      id,
      title
    }
  } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValues) => {
  return {
    type: "CHANGE_TODOLIST_FILTER",
    payload: {
      id,
      filter
    }
  } as const
}
