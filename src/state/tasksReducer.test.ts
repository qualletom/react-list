import {TasksStateType} from "../App";
import {v4} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasksReducer";
import {addTodolistAC, removeTodolistAC} from "./todolistsReducer";

let state: TasksStateType;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
  todolistId1 = v4();
  todolistId2 = v4();

  state = {
    [todolistId1]: [
      {id: "1", title: "HTML&CSS", isDone: true},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false},
    ],
    [todolistId2]: [
      {id: "1", title: "Book", isDone: false},
      {id: "2", title: "Milk", isDone: true},
      {id: "3", title: "Cucumber", isDone: false},
    ],
  }
})

test('should remove task by id', () => {
  const endState = tasksReducer(state, removeTaskAC("2", todolistId1));

  expect(endState[todolistId1].length).toBe(2);
  expect(endState[todolistId1].find(t => t.id === "2")).toBeFalsy();
  expect(endState[todolistId2].length).toBe(3);
});

test('should add task', () => {
  const newTitle = "newTitle";
  const action = addTaskAC(newTitle, todolistId2);
  const endState = tasksReducer(state, action);

  expect(endState[todolistId2].length).toBe(4);
  expect(endState[todolistId2].at(-1)?.title).toBe(newTitle);
  expect(endState[todolistId1].length).toBe(3);
})

test('should change task status', () => {
  const action = changeTaskStatusAC('2', todolistId2);
  const endState = tasksReducer(state, action);

  expect(endState[todolistId2][1].isDone).toBeFalsy();
  expect(endState[todolistId1][1].isDone).toBeTruthy();
})

test('should change task title', () => {
  const newTitle = 'newTitle';
  const action = changeTaskTitleAC(newTitle, '2', todolistId2);
  const endState = tasksReducer(state, action);

  expect(endState[todolistId2][1].title).toBe(newTitle);
})

test('should add new tasks array when new todolist is added', () => {
  const action = addTodolistAC("new Todolist");
  const endState = tasksReducer(state, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);

  if (!newKey) {
    throw new Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
})

test('should delete tasks with todolistId after todolist was deleted', () => {
  const action = removeTodolistAC(todolistId1);
  const endState = tasksReducer(state, action);

  expect(Object.keys(endState).length).toBe(1);
  expect(endState[todolistId1]).toBeUndefined();
})
