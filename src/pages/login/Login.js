import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Dashboard", { replace: false });
    }
  }, [isLoggedIn]);

  const [loginDetail, setLoginDetail] = useState({
    email: "z@gmail.com",
    password: "test",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const handleOnChange = (e, type) => {
    setLoginDetail({
      ...loginDetail,
      [type]: e.target.value,
    });
  };
  const { email, password } = loginDetail;

  return (
    <div className="registerform">
      {/* {isLoggedIn && navigate("/Dashboard", { replace: true })} */}
      Login Form
      <form onSubmit={handleSubmit}>
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
        {/* <input type="file" onChange={handleFileChange} /> */}
        {/* <img
          src={avatarIcon}
          width="100"
          height="80"
          // onClick={handleChangeProfilePicture}
        /> */}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
