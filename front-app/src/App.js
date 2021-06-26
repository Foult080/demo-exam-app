import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//auth
import setAuthToken from "./Utils/setAuthToken";
import { loadUser } from "./Reducers/AuthSlice";
import PrivateRoute from "./Components/PrivateRoute";
import store from "./store";

//components
import Navigate from "./Components/Navigate";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import EditEvent from "./Components/Events/EditEvent";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <section style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Navigate />
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-event" component={EditEvent} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
