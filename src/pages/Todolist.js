import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TodoList from "./component/TodoList";

import TodoForm from "./component/TodoForm";
import CompletedList from "./component/CmpletedList";
import { fetchTodos, addTodos, updateTodo } from "../redux/todoSlice";
import { STATUSES } from "../redux/todoSlice";
import axios from "axios";
import { LOCALURL } from "../api/env";

export default function index() {
  const { todos: todosFromRedux, status } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  // console.log(todosFromRedux);
  const [todos, setTodo] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [edit, setEdit] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [completedList, setCompletedList] = useState([]);

  const handleSubmit = async (val) => {
    //from state
    // const value = [...todos, val];
    // setTodo(value);

    //from api
    await dispatch(addTodos(val));
    await dispatch(fetchTodos());
  };

  const handleDelete = async (val) => {
    // for state
    // const newVal = todos.filter((i) => i.id !== val);
    // const value = [...completedList, ...todos.filter((i) => i.id == val)];
    // setCompletedList(value);
    // setTodo(newVal);
    //from API

    await dispatch(updateTodo({ id: val, done: true }));
    await dispatch(fetchTodos());
  };

  const handleDeleteForAll = () => {
    setCompletedList(todos);
    setTodo([]);
  };
  const handleEdit = (val) => {
    // setEdit(val.id);

    setEdit(val._id);
  };

  const updateEdit = (val) => {
    setEditItem(val);
  };

  const updateEditValue = async (id) => {
    //from state
    // const updatedValue = todos.map((i) => {
    //   if (i.id === id) {
    //     i.text = editItem;
    //   }
    //   return i;
    // });
    // setTodo(updatedValue);
    // setEdit(null);

    // from api

    // const updatedValue = newValue.map((i) => {
    //   console.log(newValue);
    //   if (i._id === id) {
    //     i.value = editItem;
    //   }
    //   return i;
    // });

    // setTodo(updatedValue);
    // setEdit(null);

    console.log(editItem);

    await dispatch(updateTodo({ id, value: editItem }));

    await setEdit(null);
    await dispatch(fetchTodos());
  };

  const handleCompleteAllAPI = async () => {
    let config = {
      method: "post",
      url: `${LOCALURL}/todo/updateAll`,
    };

    await axios(config)
      .then((res) => {
        console.log(res);
        dispatch(fetchTodos());

        alert("do something");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (status === STATUSES.LOADING) {
    return (
      <div className="loading">
        <h2>Loading</h2>
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <div className="loading">
        <h2>Something went wrong</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="completed-list-tab">
        <div>
          <button onClick={() => handleDeleteForAll()}>Delete All</button>
          <button onClick={() => handleCompleteAllAPI()}>Complete All</button>
        </div>

        <div>
          <button onClick={() => setShowCompleted(false)}>Active</button>

          <button onClick={() => setShowCompleted(true)}>Completed</button>
        </div>
      </div>
      <TodoForm onsubmit={handleSubmit} />
      {showCompleted ? (
        <CompletedList list={todosFromRedux.filter((i) => i.done)} />
      ) : (
        <TodoList
          list={todosFromRedux.filter((i) => !i.done)}
          onDelete={handleDelete}
          onEdit={handleEdit}
          edit={edit}
          handleSubmit={updateEditValue}
          updateEdit={updateEdit}
        />
      )}
    </div>
  );
}
