import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

TodoForm.propTypes = {};

function TodoForm({ onSubmit = null }) {
  const [value, setValue] = useState("");
  const InputRef = useRef();

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newValue = {
      id: Date.now(),
      status: "new",
      text: value,
    };

    if (onSubmit) onSubmit(newValue);

    setValue("");
    InputRef.current.focus();
  };

  return (
    <>
      <h1>Add New Todo</h1>
      <form onSubmit={handleSubmitForm}>
        <label>Create todo: </label>
        <input
          ref={InputRef}
          type="text"
          name="todo"
          placeholder="create new todo"
          onChange={handleChangeValue}
          value={value}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default TodoForm;
