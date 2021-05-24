import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEvents, fetchEvents } from "../Reducers/EventsSlice";
import formatDate from "../Utils/formatDate";
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

  return !loading && events == null ? (
    <Container>
      <h2>Загрузка данных...</h2>
    </Container>
  ) : (
    <Container>
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
