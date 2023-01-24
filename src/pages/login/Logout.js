import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/authSlice";

export default function Logout() {
  const navigate = useNavigate();
  const { isUserRegister, status, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(setLogout());
    navigate("/login", { replace: false });
  }, [isLoggedIn]);
  return <div>Logout</div>;
}
