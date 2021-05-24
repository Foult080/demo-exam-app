import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectAuth } from "../Reducers/AuthSlice";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const auth = useSelector(selectAuth);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        !auth.loading && auth.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
