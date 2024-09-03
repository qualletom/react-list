import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React, {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Delete from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasksReducer";
import {Task} from "./Task";

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

export const Todolist = memo(({
                                todolistId,
                                title,
                                filter,
                                changeFilter,
                                removeTodolist,
                                changeTodolistTitle
                              }: TodolistType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todolistId]);

  const handleAddNewTask = useCallback((title: string) => {
    dispatch(addTaskAC(title, todolistId));
  }, [dispatch])

  const handleChangeFilter = useCallback((newFilterValue: FilterValues) => () => {
    changeFilter(newFilterValue, todolistId);
  }, [dispatch])

  const handleChangeTodolistTitle = useCallback((title: string) => {
    changeTodolistTitle(title, todolistId);
  }, [dispatch])

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
  const filteredTasks = useMemo(filterTasks, [tasks, filter]);

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
        {filteredTasks.length
          ? filteredTasks.map(task => {
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Task task={task} todolistId={todolistId} />
              </li>)
          })
          : "All is done!"}
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
});

