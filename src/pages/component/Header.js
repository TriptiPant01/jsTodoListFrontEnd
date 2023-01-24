import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    if (!isLoggedIn) {
      localStorage.removeItem("token");
      setToken("");
    }
  }, [isLoggedIn]);

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography>MERN AUTH</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            {!token ? (
              <>
                <Tab to="/login" LinkComponent={Link} label="Login" />
                <Tab to="/register" LinkComponent={Link} label="SignUp" />
              </>
            ) : (
              <>
                {/* <Tab to="/Dashboard" LinkComponent={Link} label="logout" /> */}
                <Tab to="/logout" LinkComponent={Link} label="logout" />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
    // <header>
    // <h1>Todo List</h1>
    // </header>
  );
}
