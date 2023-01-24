import React from "react";
// import Counter from "./Counter";
// import List from "./List";
// import Todo from "./TodoList/Todo";
// import TodoList from "./TodoList/TodoList";
// import PromisePractice from "./PromisePractice";
// import "./App.css";
// import Sync from "./component/Sync";

import TodoPracticePractice from "./pages/Todolist.js";

import "./Todo.css";
import Register from "./pages/login/Register";
import Header from "./pages/component/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout.js";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<TodoPracticePractice />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        {/* <Register /> */}
      </main>
      {/* <PromisePractice /> */}
      {/* <TodoList /> */}
      {/* <List /> */}
      {/* <Counter /> */}

      {/* <TodoPracticePractice /> */}
      {/* <Sync /> */}
    </>
  );
}

export default App;
