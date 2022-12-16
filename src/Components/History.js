import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Css/udhari.css";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification";
import Udhari from "./Udhari";

function History() {
  const token = useSelector((state) => state.token);
  const [udharis, setUdharis] = useState([]);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const getUdharis = async () => {
    try {
      const { data } = await axios.get("/user/udhari/?status=paid", {
        headers: { Authorization: token },
      });
      setUdharis(data);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  const deleteUdhari = async (id) => {
    try {
      const res = await axios.delete(`/user/deleteudhari/${id}`);
      setSuccess(res.data.msg);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  useEffect(() => {
    getUdharis();
  });
  return (
    <div
      className="udharidashboard"
      onClick={() => {
        setErr("");
        setSuccess("");
      }}
    >
      <h1 className="text-center mt-3 fw-bold">List of Paid Udhaari</h1>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
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
                  show={false}
                  deleteUdhari={deleteUdhari}
                  id={elem._id}
                />
              );
            })
          ) : (
            <h4 className="text-center">No paid udharies yet</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
