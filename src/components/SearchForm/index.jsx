import React, { useState } from "react";

SearchForm.propTypes = {};

function SearchForm({
  onSearchForm = null,
  valueSearchChange,
  onChangeSearch,
  onSubmit,
}) {
  // const [value, setValue] = useState("");

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setValue(value);
  // };

  // const handleSubmitSearch = (e) => {
  //   e.preventDefault();

  //   if (onSearchForm) onSearchForm(value);
  // };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="">Search Form: </label>
      <input
        type="text"
        name="searchForm"
        value={valueSearchChange}
        placeholder="search todo"
        onChange={onChangeSearch}
      />
    </form>
  );
}

export default SearchForm;
