import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type TodolistType = {
  todolistId: string;
  title: string;
  filter: FilterValues;
  changeFilter: (filterValue: FilterValues, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (title: string, todolistId: string) => void;
}

export enum FilterValues {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed"
}

export const Todolist = ({
                           todolistId,
                           title,
                           filter,
                           changeFilter,
                           removeTodolist,
                           changeTodolistTitle
                         }: TodolistType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId]);

  const filterTasks = () => {
    switch (filter) {
      case FilterValues.ACTIVE: {
        return tasks.filter(task => !task.isDone)
      }
      case FilterValues.COMPLETED: {
        return tasks.filter(task => task.isDone)
      }
      default: {
        return tasks;
      }
    }
  }

  const changeTaskStatus = (id: string, todolistId: string) =>
    dispatch(changeTaskStatusAC(id, todolistId));

  const handleUpdateTaskTitle = (taskId: string) => (title: string) => {
    dispatch(changeTaskTitleAC(title, taskId, todolistId));
  }

  const renderTasks = () => {
    const filteredTasks = filterTasks();

    return filteredTasks.length
      ? filteredTasks.map(task => {
        return (
          <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatus(task.id, todolistId)}/>
            <EditableSpan title={task.title} onSave={handleUpdateTaskTitle(task.id)}/>
            <IconButton aria-label="delete" size="small" onClick={handleRemoveTask(task.id)}>
              <Delete fontSize="small"/>
            </IconButton>
          </li>)
      })
      : "All is done!"
  }

  const handleRemoveTask = (id: string) => () => {
    dispatch(removeTaskAC(id, todolistId));
  }

  const handleAddNewTask = (title: string) => {
    dispatch(addTaskAC(title, todolistId));
  }

  const handleChangeFilter = (newFilterValue: FilterValues) => () => {
    changeFilter(newFilterValue, todolistId);
  }

  const handleChangeTodolistTitle = (title: string) => {
    changeTodolistTitle(title, todolistId);
  }

  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
        <h3><EditableSpan title={title} onSave={handleChangeTodolistTitle}/></h3>
        <IconButton aria-label="delete" size="small" onClick={() => removeTodolist(todolistId)}>
          <Delete fontSize="small"/>
        </IconButton>
      </div>
      <div>
        <AddItemForm addItem={handleAddNewTask}/>
      </div>
      <ul>
        {renderTasks()}
      </ul>
      <div>
        <Button variant={filter === FilterValues.ALL ? 'contained' : 'text'}
                onClick={handleChangeFilter(FilterValues.ALL)}>All
        </Button>
        <Button color="primary" variant={filter === FilterValues.ACTIVE ? 'contained' : 'text'}
                onClick={handleChangeFilter(FilterValues.ACTIVE)}>Active
        </Button>
        <Button color="secondary" variant={filter === FilterValues.COMPLETED ? 'contained' : 'text'}
                onClick={handleChangeFilter(FilterValues.COMPLETED)}>Completed
        </Button>
      </div>
    </div>
  );
};
