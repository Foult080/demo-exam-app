import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { login, selectAuth, clearErrors } from "../Reducers/AuthSlice";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values)).then(dispatch(clearErrors()));
      formik.values.email = "";
      formik.values.password = "";
    },
  });

  //redirect of logged in
  if (auth.isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <div style={styles.main}>
        {auth.errors &&
          auth.errors.map((item) => <Alert variant="danger">{item.msg}</Alert>)}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="floatingInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            style={{ maxWidth: "35%", minWidth: "35%" }}
          >
            Войти
          </Button>
        </Form>
        <p className="mt-2 mb-3 text-muted">
          Created by{" "}
          <a
            href="https://github.com/Foult080"
            target="_blank"
            rel="noopener noreferrer"
          >
            @foult080
          </a>{" "}
          &copy;demo-exam-app 2021
        </p>
      </div>
    </Container>
  );
};

const styles = {
  main: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    margin: "20vh auto auto",
    textAlign: "center",
  },
  text: {
    fontStyle: "bold",
  },
};

export default Login;
