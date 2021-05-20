import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { BsFillTerminalFill } from "react-icons/bs";

const Navigate = () => {
  return (
    <Navbar
      className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <Container>
        <Navbar.Brand href="#home" size="large">
          <BsFillTerminalFill
            style={{ width: "40px", height: "40px", margin: "1rem" }}
          />
          demo-exam-app
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigate;
