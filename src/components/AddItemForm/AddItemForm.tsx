import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <TextField
        value={newTitle}
        onChange={handleChangeTitle}
        onKeyDown={handleInputKeyDown}
        error={!!errorMessage}
        label="Type value"
        helperText={errorMessage}
      />
      <Button
        onClick={handleAddNewTitle}
        variant="contained"
        color="primary"
      >+</Button>
    </>
  );
};
