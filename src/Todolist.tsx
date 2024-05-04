import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

type TodolistType = {
    title: string;
    tasks: TaskType[];
    removeTask: (id: string) => void;
    addTask: (name: string) => void;
    changeTaskStatus: (id: string) => void;
}

type FilterValuesType = FilterValues;

enum FilterValues {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed"
}

export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus}: TodolistType) => {
    const [filterValue, setFilterValue] = useState<FilterValuesType>(FilterValues.ALL);
    const [newTaskName, setNewTaskName] = useState("");

    const filterTasks = () => {
        switch (filterValue) {
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
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatus(task.id)}/>
                        <span>{task.title}</span>
                        <button onClick={handleRemoveTask(task.id)}>X</button>
                    </li>)
            })
            : "All is done!"
    }

    const handleRemoveTask = (id: string) => () => {
        removeTask(id);
    }

    const handleAddNewTask = () => {
        addTask(newTaskName);
        setNewTaskName("");
    }

    const handleChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddNewTask();
        }
    }

    const handleChangeFilter = (newFilterValue: FilterValues) => () => {
        setFilterValue(newFilterValue)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskName}
                    onChange={handleChangeNewTaskTitle}
                    onKeyDown={handleInputKeyDown}
                />
                <button onClick={handleAddNewTask}>+</button>
            </div>
            <ul>
                {renderTasks()}
            </ul>
            <div>
                <button onClick={handleChangeFilter(FilterValues.ALL)}>All</button>
                <button onClick={handleChangeFilter(FilterValues.ACTIVE)}>Active</button>
                <button onClick={handleChangeFilter(FilterValues.COMPLETED)}>Completed</button>
            </div>
        </div>
    );
};
