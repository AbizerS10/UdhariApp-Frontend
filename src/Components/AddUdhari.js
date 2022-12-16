import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import "../Css/addudhari.css";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../notifications/Notification";
import { useSelector } from "react-redux";

function AddUdhari() {
  const [expand, setExpand] = useState(false);
  const token = useSelector((state) => state.token);
  const [note, setNote] = useState({
    err: "",
    success: "",
    customername: "",
    customeremail: "",
    udhari: "",
  });

  const { err, success, customername, customeremail, udhari } = note;

  const InputEvent = (event) => {
    const { name, value } = event.target;

    setNote((old) => {
      return {
        ...old,
        [name]: value,
        err: "",
        success: "",
      };
    });
  };

  const expandIt = () => {
    setExpand(true);
  };

  const normal = () => {
    setExpand(false);
  };

  const addUdhari = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/udhari",
        {
          customername,
          customeremail,
          created_at: new Date().toLocaleDateString().toString(),
          udhari,
        },
        {
          headers: { Authorization: token },
        }
      );
      setNote({
        customeremail: "",
        customername: "",
        udhari: "",
        success: res.data.msg,
        err: "",
      });
    } catch (error) {
      error.response.data.msg &&
        setNote({ ...note, err: error.response.data.msg, success: "" });
    }
  };

  return (
    <div onClick={() => setNote({...note, err: "", success: ""})}>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="main-note" onDoubleClick={normal}>
        <form onSubmit={addUdhari}>
          {expand ? (
            <input
              type="text"
              name="customername"
              value={note.customername}
              onChange={InputEvent}
              placeholder="customername"
              autoComplete="off"
            />
          ) : null}

          {expand ? (
            <input
              type="email"
              name="customeremail"
              value={note.customeremail}
              onChange={InputEvent}
              placeholder="customeremail"
              autoComplete="off"
            />
          ) : null}

          <textarea
            name="udhari"
            value={note.udhari}
            onChange={InputEvent}
            placeholder="Product details..."
            onClick={expandIt}
          ></textarea>

          {expand ? (
            <Button className="btn" type="submit">
              <AddIcon className="plus-sign" />
            </Button>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default AddUdhari;
