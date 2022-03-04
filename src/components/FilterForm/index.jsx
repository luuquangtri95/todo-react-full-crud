import React from "react";

FilterForm.propTypes = {};

const status = ["all", "completed", "new"];

function FilterForm({ onChangeFilter = null, valueSearchChange }) {
  const handleChange = (e) => {
    if (onChangeFilter) onChangeFilter(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      {status.map((x, idx) => (
        <option
          key={idx}
          value={x}
          selected={x === valueSearchChange ? true : false}
        >
          {x}
        </option>
      ))}
    </select>
  );
}

export default FilterForm;
