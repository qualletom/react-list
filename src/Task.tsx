import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import React, {memo, useCallback} from "react";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  task: TaskType,
  todolistId: string
}
export const Task = memo(({task, todolistId}: TaskPropsType) => {
  const dispatch = useDispatch();

  const changeTaskStatus = (id: string, todolistId: string) =>
    dispatch(changeTaskStatusAC(id, todolistId))

  const handleUpdateTaskTitle = (taskId: string) => (title: string) => {
    dispatch(changeTaskTitleAC(title, taskId, todolistId));
  }

  const handleRemoveTask = useCallback((id: string) => () => {
    dispatch(removeTaskAC(id, todolistId));
  }, [dispatch])

  return (
    <>
      <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatus(task.id, todolistId)}/>
      <EditableSpan title={task.title} onSave={handleUpdateTaskTitle(task.id)}/>
      <IconButton aria-label="delete" size="small" onClick={handleRemoveTask(task.id)}>
        <Delete fontSize="small"/>
      </IconButton>
    </>
  )
})
