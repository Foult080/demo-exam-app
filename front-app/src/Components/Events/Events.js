import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectEvents,
  fetchEvents,
  deleteEvents,
} from "../../Reducers/EventsSlice";
import formatDate from "../../Utils/formatDate";
import {
  Container,
  CardDeck,
  Card,
  Col,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
import {
  BsFillTrashFill as Trash,
  BsPencilSquare as Pencil,
} from "react-icons/bs";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, errors } = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [fetchEvents]);

  const delEvent = (id) => {
    if (window.confirm("Вы действительно хотите удалить событие?")) {
      console.log(id + "удалено");
      dispatch(deleteEvents(id));
    }
  };

  console.log(events);

  return loading ? (
    <Container>
      <h2>Загрузка данных...</h2>
    </Container>
  ) : (
    <Container>
      {!events.length ? (
        <h1 className="text-center">Мероприятий пока нет...</h1>
      ) : (
        <div>
          {errors &&
            errors.map((item) => (
              <Alert variant={item.variant}>{item.msg}</Alert>
            ))}
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
                          onClick={() => delEvent(item._id)}
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
        </div>
      )}
    </Container>
  );
};

export default Events;
