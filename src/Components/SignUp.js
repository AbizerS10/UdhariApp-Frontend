import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";
import "../Css/signup.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { isEmail, isLength } from "../validation/Validation";

const initialState = {
  shopname: "",
  shopaddress: "",
  phonenumber: "",
  email: "",
  password: "",
  err: "",
  success: "",
};

function SignUp() {
  const [user, setUser] = useState(initialState);
  const { shopname, shopaddress, phonenumber, email, password, err, success } =
    user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email.", success: "" });
    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 chracters long.",
        success: "",
      });
    try {
      const res = await axios.post("/user/register", {
        shopname,
        shopaddress,
        phonenumber,
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="signup_main signup">
      <div className="image">
        <img src={process.env.PUBLIC_URL + "/img/slbg.png"} alt="" />
      </div>
      <div className="text">
        <h1>SignUp</h1>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit} action="/verify" className="mt-3">
          <div className="d-flex formdiv">
            <div className="mb-3 me-3 w-50">
              <label htmlFor="shopname" className="form-label">
                Shop Name
              </label>
              <input
                type="text"
                className="form-control"
                id="shopname"
                name="shopname"
                value={shopname}
                required
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phonenumber"
                name="phonenumber"
                value={phonenumber}
                required
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="d-flex formdiv">
            <div className="mb-3 w-50 me-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 w-50">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                required
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="shopaddress" className="form-label">
              Shop Address
            </label>
            <input
              type="text"
              className="form-control"
              id="shopaddress"
              name="shopaddress"
              value={shopaddress}
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="check"
              required
            />
            <label className="form-check-label" htmlFor="check">
              I agree
            </label>
          </div>
          <button type="submit" className="btn btn-primary d-flex justify-content-center align-items-center">
            Sign Up
          </button>
          <p className="mb-0 mt-2">
            Already have an account?{" "}
            <Link className="text-decoration-none" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
