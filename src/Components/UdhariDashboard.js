import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Css/udhari.css";
import Udhari from "./Udhari";
import AddUdhari from "./AddUdhari";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification";

function UdhariDashboard() {
  const token = useSelector((state) => state.token);
  const [udharis, setUdharis] = useState([]);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const getUdharis = async () => {
    try {
      const { data } = await axios.get("/user/udhari/?status=pending", {
        headers: { Authorization: token },
      });
      setUdharis(data);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  const setUdhari = async (udhari, customeremail) => {
    try {
      console.log("set1");
      const res = await axios.patch(
        "/user/update_udhari",
        {
          udhari,
          customeremail,
        },
        {
          headers: { Authorization: token },
        }
      );
      setSuccess(res.data.msg);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  const setStatus = async (props) => {
    try {
      const res = await axios.patch(
        "/user/send_paid_alert",
        {
          udhari: props.details,
          customeremail: props.email,
        },
        {
          headers: { Authorization: token },
        }
      );
      setSuccess(res.data.msg);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  const setAlert = async (props) => {
    try {
      const res = await axios.post(
        "/user/send_alert",
        {
          udhari: props.details,
          customeremail: props.email,
        },
        {
          headers: { Authorization: token },
        }
      );
      setSuccess(res.data.msg);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  useEffect(() => {
    getUdharis();
  });

  const set = () => {
    setErr("");
    setSuccess("");
  };

  return (
    <div className="udharidashboard pb-3" onClick={set}>
      <h1 className="text-center mt-3 fw-bold">List of Udhaari</h1>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <AddUdhari />
      <div className="container-fluid align-justify">
        <div className="row g-3 mt-5">
          {udharis.length !== 0 ? (
            udharis.map((elem, indx) => {
              return (
                <Udhari
                  key={indx}
                  name={elem.customername}
                  date={elem.created_at}
                  email={elem.customeremail}
                  details={elem.udhari}
                  show={true}
                  paid={setStatus}
                  edit={setUdhari}
                  alert={setAlert}
                />
              );
            })
          ) : (
            <h4 className="text-center">No udharies yet</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default UdhariDashboard;
