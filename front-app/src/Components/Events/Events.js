import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEvents, fetchEvents } from "../../Reducers/EventsSlice";
import formatDate from "../../Utils/formatDate";
import ModalScreen from "./ModalScreen";
import { Container, CardDeck, Card, Col, Row, Button } from "react-bootstrap";
import {
  BsFillTrashFill as Trash,
  BsPencilSquare as Pencil,
} from "react-icons/bs";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };

  return !loading && events == null ? (
    <Container>
      <h2>Загрузка данных...</h2>
    </Container>
  ) : (
    <Container>
      <ModalScreen
        show={show}
        handleClose={handleClose}
        title={"Удалить событие"}
        msg={"Вы действительно хотите удалить событие?"}
      />

      <CardDeck>
        <Row>
          {events.map((item) => (
            <Col md={5} lg={5} className="mt-2" key={item._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Дата создания: {formatDate(item.date)}
                  </Card.Subtitle>
                  <Card.Text className="text-right">
                    Всего студентов: {item.students.length}
                  </Card.Text>
                  <div style={{ textAlign: "right" }}>
                    <Button variant="outline-primary">
                      <Pencil style={{ marginRight: "5px" }} />
                      Подробнее
                    </Button>
                    <Button
                      style={{ marginLeft: "0.5em" }}
                      variant="outline-danger"
                      onClick={handleClose}
                    >
                      <Trash style={{ marginRight: "5px" }} /> Удалить
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </CardDeck>
    </Container>
  );
};

export default Events;
