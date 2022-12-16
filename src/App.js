import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import ActivationEmail from "./Components/ActivationEmail";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import SignUp from "./Components/SignUp";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  const { isLogged } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + "/"}>
          {isLogged ? <Dashboard /> : <Home />}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/login"}>
          {isLogged ? <Dashboard /> : <Login />}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/signup"}>
          {isLogged ? <Dashboard /> : <SignUp />}
        </Route>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/user/activate/:activation_token"}
        >
          <ActivationEmail />
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/user/reset/:token"}>
          {isLogged ? <Dashboard /> : <ResetPassword />}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/dashboard"}>
          {isLogged ? <Dashboard /> : <Login />}
        </Route>
        <Route exact path={process.env.PUBLIC_URL + "/forgot_password"}>
          <ForgotPassword />
        </Route>
        <Route exact path="/profile">
          {isLogged ? <Dashboard /> : <Login />}
        </Route>
        <Route exact path="/udhari">
          {isLogged ? <Dashboard /> : <Login />}
        </Route>
        <Route exact path="/history">
          {isLogged ? <Dashboard /> : <Login />}
        </Route>
        <Redirect to={process.env.PUBLIC_URL + "/"} />
      </Switch>
    </>
  );
}

export default App;
