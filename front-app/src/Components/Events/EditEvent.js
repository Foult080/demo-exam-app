import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Container, Button } from "react-bootstrap";
import {
  BsFillXSquareFill as Del,
  BsPersonPlusFill as Person,
} from "react-icons/bs";

const EditEvent = () => {
  return (
    <Container>
      <div className="text-center">
        <h1>Добавить событие</h1>
        <hr />
      </div>

      <Formik
        initialValues={{
          name: "Some Event 003",
          students: ["jared", "ian", "brent"],
        }}
        onSubmit={(values) =>
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500)
        }
      >
        {(props) => (
          <Form>
            <h4 className="text-center">Укажите название:</h4>
            <div class="floatingInput form-group">
              <input
                placeholder="Укажите название"
                type="text"
                name="name"
                class="form-control"
                value={props.values.name}
                onChange={props.handleChange}
              />
            </div>
            <h4 className="text-center mt-2">Список студентов:</h4>
            <hr />
            <FieldArray
              name="students"
              render={(arrayHelpers) => (
                <div>
                  {props.values.students && props.values.students.length > 0 ? (
                    props.values.students.map((student, index) => (
                      <div key={index} class="input-group mt-2">
                        <Field
                          name={`students.${index}`}
                          type="text"
                          class="form-control"
                          placeholder="ФИО студента"
                        />
                        <Button
                          variant="outline-danger"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <Del />
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => arrayHelpers.insert(index, "")}
                        >
                          <Person />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button onClick={() => arrayHelpers.push("")}>
                      <Person /> Добавить участника
                    </Button>
                  )}
                  <div className="mt-2">
                    <Button variant="success" type="submit">
                      Сохранить
                    </Button>
                    <Button style={{ marginLeft: "0.3em" }} variant="danger">
                      Назад
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditEvent;
