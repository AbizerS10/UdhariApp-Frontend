import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../Css/signup.css";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/dashboard");
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="signup">
      <div className="image">
        <img src={process.env.PUBLIC_URL + "/img/slbg.png"} alt="" />
      </div>
      <div className="text">
        <h1>Login</h1>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div className="row justify-content-between">
            <div className="col-5">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <div className="col-6 mt-2 p-0 text-center">
              <Link className="text-decoration-none" to="/forgot_password">
                Forgot password
              </Link>
            </div>
          </div>
        </form>
        <p className="mb-0 mt-2">
          New Customer?{" "}
          <Link to="/signup" className="text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
