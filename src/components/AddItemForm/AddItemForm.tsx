import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
  addItem: (title: string) => void;
}

export const AddItemForm = ({addItem}: AddItemFormType) => {
  const [newTitle, setNewTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage(null);
    }

    setNewTitle(e.currentTarget.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewTitle();
    }
  }

  const handleAddNewTitle = () => {
    if (!newTitle.trim()) {
      setErrorMessage("Title is required!");
      return;
    }

    addItem(newTitle);
    setNewTitle("");
  }

  return (
    <>
      <input
        value={newTitle}
        onChange={handleChangeTitle}
        onKeyDown={handleInputKeyDown}
        className={`${errorMessage && "error"}`}
      />
      <button onClick={handleAddNewTitle}>+</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </>
  );
};
