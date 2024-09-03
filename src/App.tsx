import React from 'react';
import './App.css';
import {FilterValues, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistStateType
} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodolistStateType>(state => state.todolists);

  const changeTodolistFilter = (filterValue: FilterValues, todolistId: string) =>
    dispatch(changeTodolistFilterAC(todolistId, filterValue));

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));
  }

  const addNewTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  }

  const changeTodolistTitle = (title: string, todolistId: string) =>
    dispatch(changeTodolistTitleAC(todolistId, title));

  return (
    <div className="App">
      <AddItemForm addItem={addNewTodolist}/>
      {todolists.map(tl =>
        <Todolist
          key={tl.id}
          todolistId={tl.id}
          title={tl.title}
          filter={tl.filter}
          changeFilter={changeTodolistFilter}
          removeTodolist={removeTodolist}
          changeTodolistTitle={changeTodolistTitle}
        />)}
    </div>
  );
}

export default App;
