import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Container>
      <div style={styles.main}>
        <Form>
          <Form.Group controlId="formBasicEmail" className="floatingInput">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
            rel="noreferrer"
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
