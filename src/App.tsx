import React, {useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {Todolist} from "./Todolist";

function App() {
    const [tasks, setTasks] = useState([
        {id: v4(), title: "HTML&CSS", isDone: true},
        {id: v4(), title: "JS", isDone: true},
        {id: v4(), title: "React", isDone: false},
        {id: v4(), title: "Rest API", isDone: false},
        {id: v4(), title: "GraphQL", isDone: false},
    ])

    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const addTask = (name: string) => {
        setTasks(prev => [
            {
                id: v4(),
                title: name,
                isDone: false
            },
            ...prev
        ]);
    }

    const changeTaskStatus = (id: string) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    isDone: !task.isDone
                }
            } else {
                return task;
            }
        }))
    }

    return (
        <div className="App">
            <Todolist
                title={"Things"}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
