import React, { useState } from "react";
import "../Css/profile.css";
import { useSelector } from "react-redux";
import { isLength, isMatch } from "../validation/Validation";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";
import axios from "axios";
import bcrypt from "bcryptjs";

const initialState = {
  phonenumber: "",
  cfpassword: "",
  password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const { phonenumber, password, cfpassword, err, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const updateInfor = (e) => {
    e.preventDefault();
    if (user.phonenumber === phonenumber) {
      return setData({
        ...data,
        err: "new phonenumber is same as the old one",
        success: "",
      });
    }
    try {
      axios.patch(
        "/user/update",
        {
          phonenumber: phonenumber ? phonenumber : user.phonenumber,
        },
        { headers: { Authorization: token } }
      );
      setData({ ...data, err: "", success: "Update Successfull!" });
    } catch (error) {
      setData({ ...data, err: "not updated", success: "" });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    console.log(user);
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      return setData({
        ...data,
        password: "",
        cfpassword: "",
        err: "new password is same as the old one",
        success: "",
      });
    }
    if (isLength(password))
      return setData({
        ...data,
        password: "",
        cfpassword: "",
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cfpassword))
      return setData({
        ...data,
        password: "",
        cfpassword: "",
        err: "Password did not match",
        success: "",
      });
    try {
      axios.post(
        "/user/reset",
        { password: password },
        { headers: { Authorization: token } }
      );
      setData({
        ...data,
        password: "",
        cfpassword: "",
        err: "",
        success: "Update Successfull!",
      });
    } catch (error) {
      setData({
        ...data,
        password: "",
        cfpassword: "",
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  return (
    <div onClick={() => setData({...data, err: "", success: ""})}>
      <h1 className="text-center mt-3 fw-bold">Your profile</h1>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="personal mt-5">
        <h5 className="heading">Personal Details</h5>
        <form onSubmit={updateInfor}>
          <div className="mb-3 d-flex justify-content-between formdiv">
            <div className="w-50">
              <label htmlFor="shopname" className="form-label">
                Shop Name
              </label>
              <input
                type="text"
                className="form-control"
                id="shopname"
                name="shopname"
                aria-describedby="emailHelp"
                defaultValue={user.shopname}
                disabled
              />
            </div>
            <div className="w-50 ms-2">
              <label htmlFor="shopaddress" className="form-label">
                Shop Address
              </label>
              <input
                type="text"
                className="form-control"
                id="shopaddress"
                name="shopaddress"
                aria-describedby="emailHelp"
                defaultValue={user.shopaddress}
                disabled
              />
            </div>
          </div>
          <div className="mb-3 d-flex justify-content-between formdiv">
            <div className="w-50">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phonenumber"
                name="phonenumber"
                defaultValue={user.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div className="w-50 ms-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </form>
      </div>
      <div className="personal my-5">
        <h5 className="heading heading2">Change Password</h5>
        <form onSubmit={updatePassword} method="POST">
          <div className="mb-3 d-flex justify-content-between formdiv">
            <div className="w-50">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="w-50 ms-2">
              <label htmlFor="cfpassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cfpassword"
                name="cfpassword"
                value={cfpassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
