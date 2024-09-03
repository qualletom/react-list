import {v4} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolistsReducer";
import {TaskType} from "../Todolist";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodoListActionType

export type TasksStateType = {
  [todolistId: string]: TaskType[];
}

const initialsState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialsState, action: ActionType): TasksStateType => {
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
    default:
      return state;
  }
}



export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE_TASK",
    payload: {
      taskId,
      todolistId
    }
  } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD_TASK",
    payload: {
      title,
      todolistId
    }
  } as const
}

export const changeTaskStatusAC = (taskId: string, todolistId: string) => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload: {
      taskId,
      todolistId
    }
  } as const
}

export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => {
  return {
    type: "CHANGE_TASK_TITLE",
    payload: {
      title,
      taskId,
      todolistId
    }
  } as const
}
