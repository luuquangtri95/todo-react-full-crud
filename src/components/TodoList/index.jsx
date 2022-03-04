import React from "react";
import "./style.css";

TodoList.propTypes = {};

function TodoList({
  todoList = [],
  onDeleteTodo = null,
  onEditTing = null,
  onChangeStatus = null,
  isMatch,
}) {
  const handleDeleteTodo = (id) => {
    if (onDeleteTodo) onDeleteTodo(id);
  };

  const handleEditTodo = (currentValue) => {
    if (onEditTing) onEditTing(currentValue);
  };

  const handleClickChangeStatus = (index, todo) => {
    if (onChangeStatus) onChangeStatus(index, todo);
  };

  return (
    <ul>
      {todoList.map((todo, index) => (
        <li key={todo.id} className={todo.status}>
          {todo.text}
          <button
            type="button"
            onClick={() => handleClickChangeStatus(index, todo)}
          >
            {todo.status === "completed" ? "new" : "completed"}
          </button>
          <button type="button" onClick={() => handleEditTodo(todo)}>
            Edit
          </button>
          <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
