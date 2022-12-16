import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../Css/dashboard.css";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import Profile from "./Profile";
import UdhariDashboard from "./UdhariDashboard";
import History from "./History";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";

function Dashboard() {
  const [show, setShow] = useState("translateX(-70vw)");
  const [clicked, setClicked] = useState(false);

  const Show = () => {
    setClicked(true);
    setShow("translateX(0)");
  };

  const hide = () => {
    setClicked(false);
    setShow("translateX(-70vw)");
  };

  return (
    <div className="dashboard">
      <Navbar />
      {!clicked && (
        <IconButton onClick={Show} className="list">
          <MenuIcon fontSize="large" />
        </IconButton>
      )}
      <div className="container-fluid">
        <div className="row position-relative">
          <div className="col-2 sidebar" style={{ "--trans": show }}>
            {clicked && (
              <IconButton onClick={hide} className="sideclose">
                <CloseIcon />
              </IconButton>
            )}
            <NavLink
              activeClassName="active"
              to="/profile"
              className="link"
              onClick={hide}
            >
              <AccountCircleIcon /> Profile
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/udhari"
              className="link"
              onClick={hide}
            >
              <DashboardIcon /> Dashboard
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/history"
              className="link"
              onClick={hide}
            >
              <HistoryIcon /> History
            </NavLink>
          </div>
          <div className="col-10 position-relative main">
            {window.location.pathname === "/udhari" ? (
              <UdhariDashboard />
            ) : window.location.pathname === "/history" ? (
              <History />
            ) : (
              <Profile />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
