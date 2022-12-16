import React, { useEffect, useRef, useState } from "react";
import "../Css/udhari.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

function Udhari(props) {
  const [val, setVal] = useState(props.details);
  const [show, setShow] = useState(true);
  const inputElement = useRef(null);
  const paidClick = () => {
    props.paid(props);
  };

  const alertClick = () => {
    props.alert(props);
  };

  const editClick = () => {
    setShow(false);
  };

  const saveClick = () => {
    setShow(true);
    props.edit(val, props.email);
  };

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [show]);
  return (
    <>
      <div className="col-lg-4 col-md-6 col-xs-12">
        <div className="note h-100">
          {props.show ? (
            <div className="mb-2 d-flex justify-content-end">
              {show ? (
                <EditIcon onClick={editClick} className="edit" />
              ) : (
                <SaveIcon onClick={saveClick} className="edit" />
              )}
            </div>
          ) : (
            <div className="mb-2 d-flex justify-content-end">
              <DeleteIcon
                className="edit"
                onClick={() => props.deleteUdhari(props.id)}
              />
            </div>
          )}
          <div className="mb-2 d-flex justify-content-between">
            <span>{props.name}</span>
            <span>{props.date}</span>
          </div>
          <p className="mb-2">{props.email}</p>
          <textarea
            name="udhari"
            id="udhari"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="mb-2 border-0 w-100"
            disabled={show && "disabled"}
            ref={inputElement}
          ></textarea>
          {props.show && (
            <div className="d-flex align-items-center justify-content-between">
              <button className="btn btn-primary" onClick={alertClick}>
                Alert
              </button>
              <button className="btn btn-primary" onClick={paidClick}>
                Paid
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Udhari;
