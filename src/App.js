import queryString from "query-string";
import { useEffect, useState } from "react";
import { Redirect, Switch, useHistory } from "react-router-dom";
import {
  useLocation,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import EditForm from "./components/EditForm";
import FilterForm from "./components/FilterForm";
import SearchForm from "./components/SearchForm";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const [filterChange, setFilterChange] = useState(() => {
    // ! setup url location search only onload
    const queryParams = queryString.parse(location.search);

    return {
      search: queryParams.search || "",
      status: queryParams.status || "all",
    };
  });

  useEffect(() => {
    // !  useEffect run 1 time when todoList change value
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    // !  useEffect sync url
    const params = queryString.parse(location.search);
    setFilterChange(params);
  }, [location.search]);

  const handleSubmit = (newValue) => {
    const newTodoList = [...todoList, newValue];
    setTodoList(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = [...todoList].filter((todo) => todo.id !== id);

    setTodoList(newTodoList);
  };

  const handleEditTingTodo = (newValue) => {
    setIsEditing(true);
    setCurrentTodo({ ...newValue });
  };

  const handleSubmitEditTodo = (updatedValue) => {
    const index = todoList.findIndex((todo) => todo.id === updatedValue.id);
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      text:
        newTodoList[index].id === updatedValue.id
          ? updatedValue.text
          : newTodoList[index].text,
    };

    // setEdit = false
    setIsEditing(false);
    setTodoList(newTodoList);
  };

  const handleInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleSubmitEditFormTodo = (e) => {
    e.preventDefault();

    handleSubmitEditTodo(currentTodo);
  };

  const handleSearch = (searchValue) => {
    // setSearchTern(searchValue);
    // setFilterChange((prevState) => ({
    //   ...prevState,
    //   search: searchValue,
    // }));

    const queryParams = {
      ...filterChange,
      search: searchValue,
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleFilterChange = (newFilter) => {
    // setFilter(newFilter);
    // setFilterChange((prevState) => ({
    //   ...prevState,
    //   status: newFilter,
    // }));

    const queryParams = {
      ...filterChange,
      status: newFilter,
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleChangeStatus = (index, currentTodo) => {
    const newTodoList = [...todoList];

    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "new" ? "completed" : "new",
    };

    setTodoList(newTodoList);
  };

  const handleChangeSearch = (e) => {
    const queryParams = {
      ...filterChange,
      search: e.target.value,
    };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };

  const newTodoList = todoList.filter(
    (todo) =>
      (filterChange.status === "all" || todo.status === filterChange.status) &&
      todo.text.toLowerCase().includes(filterChange.search.toLowerCase())
  );

  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to={`/?search=&status=all`} />
      </Switch>

      <h1>TODO APP</h1>
      <SearchForm
        onSearchForm={handleSearch}
        valueSearchChange={filterChange.search}
        onChangeSearch={handleChangeSearch}
        onSubmit={handleSubmitSearch}
      />

      <hr />

      <FilterForm
        onChangeFilter={handleFilterChange}
        valueSearchChange={filterChange.status}
      />

      {isEditing && (
        <EditForm
          currentTodo={currentTodo}
          onEditFormSubmit={handleSubmitEditFormTodo}
          onInputChange={handleInputChange}
          onCancelEdit={() => setIsEditing(false)}
        />
      )}
      {!isEditing && <TodoForm onSubmit={handleSubmit} />}

      <TodoList
        todoList={newTodoList}
        onDeleteTodo={handleDeleteTodo}
        onEditTing={handleEditTingTodo}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}

export default App;
