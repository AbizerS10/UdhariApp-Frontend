import axios from "axios";
import React, { useState } from "react";
import "../Css/signup.css";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification";
import { isEmail } from "../validation/Validation";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid email.", success: "" });
    try {
      const res = await axios.post("/user/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="signup">
      <div className="image">
        <img src={process.env.PUBLIC_URL + "/img/slbg.png"} alt="" />
      </div>
      <div className="text">
        <h3>Forgot Your Password?</h3>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter your email
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
          <button type="submit" className="btn btn-primary">
            Verify your email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
