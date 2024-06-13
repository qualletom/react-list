import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
  title: string;
  onSave: (title: string) => void
}

export const EditableSpan = ({title, onSave}: EditableSpanType) => {
  const [newTitle, setNewTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  }
  const deactivateEditMode = () => {
    setEditMode(!editMode);
    onSave(newTitle);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      deactivateEditMode()
    }
  }

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(title);
  }

  return (
    editMode
      ? <input
        value={newTitle}
        onChange={handleChangeInput}
        onBlur={deactivateEditMode}
        onKeyDown={handleKeyDown}
        type="text"
        autoFocus
      />
      : <span onDoubleClick={activateEditMode}>{title}</span>

  );
};
