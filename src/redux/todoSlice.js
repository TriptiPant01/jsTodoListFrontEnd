import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTodosAPI, updateTodoById } from "../api/TodoListService";
//read only property
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  todos: [],
  // token: null,
  // isLoggedIn: false,
  status: STATUSES.IDLE,
};

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await fetch("https://todolist-gjjz.onrender.com/todo");
  const data = await res.json();
  return data;
});

export const addTodos = createAsyncThunk("todos/add", async (val) => {
  const res = await addTodosAPI(val);
  const data = await res.json();
  return data;
});

export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, value, done }) => {
    const res = await updateTodoById({ id, value, done });
    const data = await res.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      // const todo = {
      //   id: Math.random() * 100,
      //   text: action.payload,
      // };
      state.todos.push(action.payload);
    },
    setDeletePost: (state, action) => {
      state.todos = state.todos.filter((i) => i.id !== action.id);
    },

    setLogout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
    editTodos: (state, action) => {},
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    listTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

export const {
  setTodos,
  setDeletePost,

  setLogout,
  setStatus,
  listTodos,
} = todoSlice.actions;

export default todoSlice.reducer;

// export function fetchTodos() {
//   return async function fetchTodosThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     // const props= getState().data //to get the data from state
//     try {
//       const res = await fetch("http://localhost:8000/todo");

//       const data = await res.json();
//       console.log(data);
//       dispatch(listTodos(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       dispatch(setStatus(STATUSES.ERROR));
//       console.log(err);
//     }
//   };
// }
