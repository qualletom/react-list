import {TasksStateType, TodolistStateType} from "../App";
import {v4} from "uuid";
import {FilterValues} from "../Todolist";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

let tasksState: TasksStateType;
let todolistsState: TodolistStateType;

let todolistId1: string;

beforeEach(() => {
  todolistId1 = v4();

  tasksState = {
    [todolistId1]: [
      {id: "1", title: "HTML&CSS", isDone: true},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false},
    ]
  }

  todolistsState = [
    {
      id: todolistId1,
      title: 'Todolist 1',
      filter: FilterValues.ALL
    }
  ]
})

test('ids should be equal', () => {
  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(tasksState, action);
  const endTodolistsState = todolistsReducer(todolistsState, action);

  const idFromTodolists = endTodolistsState[1].id;
  const idFromTasks = Object.keys(endTasksState)[1];

  expect(idFromTasks).toBe(action.payload.id);
  expect(idFromTodolists).toBe(action.payload.id);
})
