import React, { useState } from "react";

EditForm.propTypes = {};

function EditForm({
  currentTodo = {},
  onEditFormSubmit = null,
  onCancelEdit = null,
  onInputChange = null,
}) {
  const handleRemoveEdit = () => {
    onCancelEdit();
  };

  return (
    <>
      <h1>Edit Todo</h1>
      <form onSubmit={onEditFormSubmit}>
        <label>Update todo: </label>
        <input
          type="text"
          name="todo"
          placeholder="update todo"
          onChange={onInputChange}
          value={currentTodo.text}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={handleRemoveEdit}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default EditForm;
