import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
                           removeTodolist
                         }: TodolistType) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const renderTasks = () => {
    const filteredTasks = filterTasks();

    return filteredTasks.length
      ? filteredTasks.map(task => {
        return (
          <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatus(task.id, todolistId)}/>
            <span>{task.title}</span>
            <button onClick={handleRemoveTask(task.id)}>X</button>
          </li>)
      })
      : "All is done!"
  }

  const handleRemoveTask = (id: string) => () => {
    removeTask(id, todolistId);
  }

  const handleAddNewTask = () => {
    if (!newTaskName.trim()) {
      setErrorMessage("Title is required!");
      return;
    }


    addTask(newTaskName, todolistId);
    setNewTaskName("");
  }

  const handleChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage(null);
    }

    setNewTaskName(e.currentTarget.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewTask();
    }
  }

  const handleChangeFilter = (newFilterValue: FilterValues) => () => {
    changeFilter(newFilterValue, todolistId);
  }

  return (
    <div>
      <div style={{display: "flex", alignItems: "center"}}>
        <h3>{title}</h3>
        <button onClick={() => removeTodolist(todolistId)}>X</button>
      </div>
      <div>
        <input
          value={newTaskName}
          onChange={handleChangeNewTaskTitle}
          onKeyDown={handleInputKeyDown}
          className={`${errorMessage && "error"}`}
        />
        <button onClick={handleAddNewTask}>+</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <ul>
        {renderTasks()}
      </ul>
      <div>
        <button className={filter === FilterValues.ALL ? 'active-button' : ''}
                onClick={handleChangeFilter(FilterValues.ALL)}>All
        </button>
        <button className={filter === FilterValues.ACTIVE ? 'active-button' : ''}
                onClick={handleChangeFilter(FilterValues.ACTIVE)}>Active
        </button>
        <button className={filter === FilterValues.COMPLETED ? 'active-button' : ''}
                onClick={handleChangeFilter(FilterValues.COMPLETED)}>Completed
        </button>
      </div>
    </div>
  );
};
