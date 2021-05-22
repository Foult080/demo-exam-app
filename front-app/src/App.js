import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//auth
import { useDispatch } from "react-redux";
import setAuthToken from "./Utils/setAuthToken";
import { loadUser } from "./Reducers/AuthSlice";
import PrivateRoute from "./Components/PrivateRoute";

//components
import Navigate from "./Components/Navigate";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <section style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Navigate />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
