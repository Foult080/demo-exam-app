import React from "react";
import { Container, Tab, Row, Col, Nav } from "react-bootstrap";
import { BsFillGearFill, BsBriefcaseFill, BsKanbanFill } from "react-icons/bs";

const Dashboard = () => {
  return (
    <div>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <BsBriefcaseFill style={{ marginRight: "1rem" }} />
                    События
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item></Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <BsKanbanFill style={{ marginRight: "1rem" }} />
                    Статистика
                  </Nav.Link>
                  <Nav.Link eventKey="third">
                    <BsFillGearFill style={{ marginRight: "1rem" }} />
                    Настройки
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <h1>Hello world</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h1>Hello from pane 2А</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <h1>Hello from statistics</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Dashboard;
