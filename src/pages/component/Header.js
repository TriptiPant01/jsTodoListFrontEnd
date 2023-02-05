import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, Typography, Box, Tab, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../../redux/authSlice";

import { LOCALURL } from "../../api/env";
const avator = require("../../avator.png");

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, userDetail } = useSelector((state) => state.auth);
  const [avatarIcon, setAvatarIcon] = useState(avator);
  const imageRef = useRef();

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    } else {
      // dispatch(setLogout());
      localStorage.removeItem("token");
      setToken("");
    }

    // if (!isLoggedIn) {
    //   localStorage.removeItem("token");
    //   setToken("");
    // }
  });

  console.log(token);
  const handleChangeProfilePicture = () => {
    imageRef.current.click();
  };

  const handleFileChange = async (e) => {
    console.log(e.target.files[0]);
    setAvatarIcon(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("myImage", e.target.files[0]);
    await fetch(LOCALURL + "/profile", {
      method: "POST",

      body: formData,
      dataType: "jsonp",
    });
  };
  console.log(`http://localhost:8000/uploads/${userDetail.profilePic}`, "img");
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

          {/* <img
            src={avator}
            width="100"
            height="80"
            onClick={handleChangeProfilePicture}
          /> */}
          {/* <input type="file" /> */}
          {/* <div>
            <input
              type="file"
              id="file"
              // ref="fileUploader"
              style={{ display: "none" }}
              ref={imageRef}
              onChange={handleFileChange}
            />
          </div> */}

          <img
            src={
              userDetail.profilePic
                ? `http://localhost:8000/uploads/${userDetail.profilePic}`
                : avator
            }
            width="100"
            height="80"
            // onClick={handleChangeProfilePicture}
          />
        </Toolbar>
      </AppBar>
    </>
    // <header>
    // <h1>Todo List</h1>
    // </header>
  );
}
