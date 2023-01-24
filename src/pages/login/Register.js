import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { registerUser } from "../../redux/authSlice";
import { STATUSES } from "../../redux/todoSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isUserRegister, status } = useSelector((state) => state.auth);
  const [registerDetail, setregisterDetail] = useState({
    fullname: "test",
    email: "itsmetripti20@gma",
    password: "test",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
