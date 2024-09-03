import {v4} from "uuid";
import {FilterValues} from "../Todolist";
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer, TodolistStateType
} from "./todolistsReducer";

let state: TodolistStateType;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
  todolistId1 = v4();
  todolistId2 = v4();

  state = [
    {
      id: todolistId1,
      title: 'Todolist 1',
      filter: FilterValues.ALL
    },
    {
      id: todolistId2,
      title: 'Todolist 2',
      filter: FilterValues.ALL
    }
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(state, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolistTitle = 'Todolist 3';

  const endState = todolistsReducer(state, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe(FilterValues.ALL);
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'Todolist changed';

  const endState = todolistsReducer(state, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe('Todolist 1');
  expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct change filter of todolist', () => {
  const newTodolistFilter = FilterValues.ACTIVE;

  const endState = todolistsReducer(state, changeTodolistFilterAC(todolistId2, newTodolistFilter));

  expect(endState[1].filter).toBe(newTodolistFilter);
});
