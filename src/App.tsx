import React, {useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {FilterValues, TaskType, Todolist} from "./Todolist";

type TodolistStateType = {
  id: string;
  title: string;
  filter: FilterValues
}

type TasksStateType = {
  [todolistId: string]: TaskType[];
}

const [todolistId1, todolistId2, todolistId3] = [v4(), v4(), v4()];

function App() {
  const [todolists, setTodolists] = useState<TodolistStateType[]>([
    {
      id: todolistId1,
      title: 'What to learn',
      filter: FilterValues.ALL
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: FilterValues.ALL
    },
    {
      id: todolistId3,
      title: "What to kek",
      filter: FilterValues.ALL
    }
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v4(), title: "HTML&CSS", isDone: true},
      {id: v4(), title: "JS", isDone: true},
      {id: v4(), title: "React", isDone: false},
      {id: v4(), title: "Rest API", isDone: false},
      {id: v4(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v4(), title: "Book", isDone: false},
      {id: v4(), title: "Milk", isDone: true},
    ],
    [todolistId3]: [
      {id: v4(), title: "AA", isDone: false},
      {id: v4(), title: "BB", isDone: true},
    ]
  });

  const removeTask = (id: string, todolistId: string) => {
    setTasks(prev => ({
      ...prev,
      [todolistId]: prev[todolistId].filter(task => task.id !== id)
    }))
  }

  const addTask = (name: string, todolistId: string) => {
    setTasks(prev => ({
        ...prev,
        [todolistId]: [{
          id: v4(),
          title: name,
          isDone: false
        },
          ...prev[todolistId]
        ]
      }
    ));
  }

  const changeTaskStatus = (id: string, todolistId: string) => {
    setTasks(prev => ({
      ...prev,
      [todolistId]: prev[todolistId]
        .map(task => task.id === id ? {...task, isDone: !task.isDone} : task)
    }))
  }

  const changeTodolistFilter = (filterValue: FilterValues, todolistId: string) => {
    setTodolists(prev => prev.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(prev => prev.filter(tl => tl.id !== todolistId));

    const {[todolistId]: kek, ...restTasks} = tasks;
    setTasks(restTasks);
  }

  return (
    <div className="App">
      {todolists.map(tl =>
        <Todolist
          key={tl.id}
          todolistId={tl.id}
          title={tl.title}
          tasks={tasks[tl.id]}
          filter={tl.filter}
          removeTask={removeTask}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          changeFilter={changeTodolistFilter}
          removeTodolist={removeTodolist}
        />)}
    </div>
  );
}

export default App;
