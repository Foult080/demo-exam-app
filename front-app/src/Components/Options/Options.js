import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  selectAuth,
  checkDB,
  removeAlert,
  changeConnection,
} from "../../Reducers/AuthSlice";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import {
  BsPersonPlusFill as Person,
  BsGearWide as Gear,
  BsFillPlusSquareFill as Flip,
} from "react-icons/bs";

const initialState = {
  host: "localhost",
  username: "root",
  password: "root",
};

const Options = () => {
  const { user, errors } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const formikOptions = useFormik({
    initialValues: user.options ? user.options : initialState,
    onSubmit: (values) => {
      console.log(values);
      dispatch(changeConnection(values));
    },
  });

  const checkConnection = () => {
    let values = {
      host: formikOptions.values.host,
      username: formikOptions.values.username,
      password: formikOptions.values.password,
    };
    dispatch(checkDB(values));
    setTimeout(() => dispatch(removeAlert()), 5000);
  };

  const formikUser = useFormik({
    initialValues: {
      name: "",
      email: "",
      passwordEx: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <div className="text-center">
        <h2>Настройки</h2>
        <hr />
      </div>
      {errors && <Alert variant={errors.variant}>{errors.msg}</Alert>}
      <Row>
        <Col md={6} lg={6}>
          <div className="text-center">
            <h4>Подключение к базе</h4>
          </div>
          <Form onSubmit={formikOptions.handleSubmit}>
            <Form.Group className="floatingInput">
              <Form.Label>Host</Form.Label>
              <Form.Control
                id="host"
                type="text"
                onChange={formikOptions.handleChange}
                value={formikOptions.values.host}
              />
            </Form.Group>
            <Form.Group className="floatingInput">
              <Form.Label>User</Form.Label>
              <Form.Control
                id="username"
                type="text"
                onChange={formikOptions.handleChange}
                value={formikOptions.values.username}
              />
            </Form.Group>
            <Form.Group className="floatingInput">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                type="text"
                onChange={formikOptions.handleChange}
                value={formikOptions.values.password}
              />
            </Form.Group>
            <Button
              className="mt-2"
              variant="success"
              onClick={formikOptions.handleSubmit}
            >
              <Flip style={styles.icons} />
              Сохранить
            </Button>
            <Button
              className="mt-2"
              style={{ marginLeft: "0.3em" }}
              variant="warning"
              onClick={checkConnection}
            >
              <Gear style={styles.icons} />
              Проверить подключение
            </Button>
          </Form>
        </Col>
        <Col md={6} lg={6}>
          <div className="text-center">
            <h4>Добавить эксперта:</h4>
          </div>
          <Form>
            <Form.Group className="floatingInput">
              <Form.Label>Имя эксперта</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Укажите имя эксперта"
                onChange={formikUser.handleChange}
                value={formikUser.values.name}
              />
            </Form.Group>
            <Form.Group className="floatingInput">
              <Form.Label>Email эксперта</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Укажите email"
                onChange={formikUser.handleChange}
                value={formikUser.values.email}
              />
            </Form.Group>
            <Form.Group className="floatingInput">
              <Form.Label>Пароль эксперта</Form.Label>
              <Form.Control
                id="passwordEx"
                type="password"
                placeholder="Введите пароль"
                onChange={formikUser.handleChange}
                value={formikUser.values.password}
              />
            </Form.Group>
          </Form>

          <Button className="mt-2" variant="primary">
            <Person style={styles.icons} /> Добавить эксперта
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  icons: { marginRight: "0.3em" },
};

export default Options;
