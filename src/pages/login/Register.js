import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { registerUser } from "../../redux/authSlice";
import { STATUSES } from "../../redux/todoSlice";
import { LOCALURL } from "../../api/env";
import axios from "axios";
import { postDataToBackend } from "../../api/ApiService";
const avator = require("../../avator.png");

const Register = () => {
  const dispatch = useDispatch();
  const [avatarIcon, setAvatarIcon] = useState(avator);

  const { isUserRegister, status } = useSelector((state) => state.auth);
  const [registerDetail, setregisterDetail] = useState({
    fullname: "test",
    email: "b@gma",
    password: "test",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // image upload
    // const formData = new FormData();
    // formData.append("password", password);
    // formData.append("email", email);
    // formData.append("fullname", fullname);
    // formData.append("myImage", avatarIcon);

    // let config = {
    //   method: "post",
    //   url: `${LOCALURL}/register`,

    //   data: formData,
    // };

    // await axios(config)
    //   .then((res) => {
    //     console.log(res);
    //     alert("do something");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    dispatch(registerUser({ fullname, email, password }));
  };
  const handleOnChange = (e, type) => {
    setregisterDetail({
      ...registerDetail,
      [type]: e.target.value,
    });
  };

  if (status === STATUSES.LOADING) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }

  if (status === STATUSES.IDLE && isUserRegister === true) {
    return (
      <div className="loading">
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </div>
    );
  }
  // if (status === STATUSES.ERROR && isUserRegister === false) {
  //   return (
  //     <div className="loading">
  //       <Alert severity="error">This is a error alert — check it out!</Alert>
  //     </div>
  //   );
  // }

  const handleFileChange = async (e) => {
    setAvatarIcon(e.target.files[0]);
    // const formData = new FormData();
    // formData.append("myImage", e.target.files[0]);
    // await fetch(LOCALURL + "/profile", {
    //   method: "POST",

    //   body: formData,
    //   dataType: "jsonp",
    // });
  };
  const { fullname, email, password } = registerDetail;
  return (
    <div className="registerform">
      {status === STATUSES.ERROR && isUserRegister === false && (
        <Alert severity="error">This is a error alert — check it out!</Alert>
      )}
      Register Form
      <form onSubmit={handleSubmit}>
        <input
          value={fullname}
          placeholder="FullName"
          className="inputfullname"
          onChange={(e) => handleOnChange(e, "fullname")}
        />
        <input
          value={email}
          placeholder="Email"
          className="inputfullname"
          onChange={(e) => handleOnChange(e, "email")}
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          className="inputfullname"
          onChange={(e) => handleOnChange(e, "password")}
        />
        <input type="file" onChange={handleFileChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
