import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type TodolistType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValues;
  removeTask: (id: string, todolistId: string) => void;
  addTask: (name: string, todolistId: string) => void;
  changeTaskStatus: (id: string, todolistId: string) => void;
  changeFilter: (filterValue: FilterValues, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  updateTaskTitle: (title: string, taskId: string, todolistId: string) => void;
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
                           tasks,
                           filter,
                           removeTask,
                           addTask,
                           changeTaskStatus,
                           changeFilter,
                           removeTodolist,
                           updateTaskTitle,
                           changeTodolistTitle
                         }: TodolistType) => {
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

  const handleUpdateTaskTitle = (taskId: string) => (title: string) => {
    updateTaskTitle(title, taskId, todolistId);
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
    removeTask(id, todolistId);
  }

  const handleChangeFilter = (newFilterValue: FilterValues) => () => {
    changeFilter(newFilterValue, todolistId);
  }

  const handleAddNewTask = (title: string) => {
    addTask(title, todolistId);
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
