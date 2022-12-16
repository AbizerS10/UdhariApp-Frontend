import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import "../Css/signup.css";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification";
import { isLength, isMatch } from "../validation/Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters long.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Password did not match.",
        success: "",
      });
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
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
        <h3>Reset Your Password</h3>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit} className="mt-3">
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
          <div className="mb-3">
            <label htmlFor="cf_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cf_password"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
