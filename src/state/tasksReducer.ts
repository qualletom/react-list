import {TasksStateType} from "../App";
import {v4} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolistsReducer";

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK',
  payload: {
    taskId: string,
    todolistId: string,
  }
}
export type AddTaskActionType = {
  type: 'ADD_TASK',
  payload: {
    title: string,
    todolistId: string,
  }
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS',
  payload: {
    taskId: string,
    todolistId: string,
  }
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE',
  payload: {
    title: string,
    taskId: string,
    todolistId: string,
  }
}

type ActionType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const {taskId, todolistId} = action.payload;

      return {
        ...state,
        [todolistId]: state[todolistId].filter(t => t.id !== taskId)
      }
    }
    case "ADD_TASK": {
      const {title, todolistId} = action.payload;

      return {
        ...state,
        [todolistId]: [
          ...state[todolistId],
          {
            id: v4(),
            title,
            isDone: false
          }
        ]
      }
    }
    case "CHANGE_TASK_STATUS": {
      const {taskId, todolistId} = action.payload;

      return {
        ...state,
        [todolistId]: state[todolistId].map(t => t.id === taskId
          ? {...t, isDone: !t.isDone}
          : t)
      }
    }
    case "CHANGE_TASK_TITLE": {
      const {title, taskId, todolistId} = action.payload;

      return {
        ...state,
        [todolistId]: state[todolistId].map(t => t.id === taskId
          ? {...t, title}
          : t)
      }
    }
    case "ADD_TODOLIST": {
      const {id} = action.payload;

      return {
        ...state,
        [id]: []
      }
    }
    case "REMOVE_TODOLIST_BY_ID": {
      const {id} = action.payload;
      const {[id]: toDelete, ...restTasks} = state;

      return restTasks;
    }
    default: {
      return {...state};
    }
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: "REMOVE_TASK",
    payload: {
      taskId,
      todolistId
    }
  }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {
    type: "ADD_TASK",
    payload: {
      title,
      todolistId
    }
  }
}

export const changeTaskStatusAC = (taskId: string, todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload: {
      taskId,
      todolistId
    }
  }
}

export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE_TASK_TITLE",
    payload: {
      title,
      taskId,
      todolistId
    }
  }
}
