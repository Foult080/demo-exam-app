import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BsFillTerminalFill, BsPersonFill } from "react-icons/bs";
import { selectAuth, logOut } from "../Reducers/AuthSlice";

const Navigate = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  return (
    <Navbar
      className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <Container>
        <Navbar.Brand href="/" size="large">
          <BsFillTerminalFill
            style={{ width: "40px", height: "40px", margin: "1rem" }}
          />
          demo-exam-app
        </Navbar.Brand>
        {auth.isAuth && !auth.loading ? (
          <div>
            <Navbar.Text>
              Вы вошли как: <a href="#login">{auth.user.name}</a>
            </Navbar.Text>
            <Button
              variant="outline-danger"
              style={{ marginLeft: "1em" }}
              onClick={() => dispatch(logOut())}
            >
              <BsPersonFill />
              Выйти
            </Button>
          </div>
        ) : (
          <Nav>Вы вошли как: Гость</Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigate;
