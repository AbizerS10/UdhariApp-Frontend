import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { showSuccessMsg, showErrMsg } from "../notifications/Notification";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (error) {
          error.response.data.msg && setErr(error.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="signup">
      <div className="image">
        <img src={process.env.PUBLIC_URL + "/img/slbg.png"} alt="" />
      </div>
      <div className="text">
        <h5>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </h5>
        <Link
          to="/login"
          className="text-decoration-none text-center d-block fs-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default ActivationEmail;
