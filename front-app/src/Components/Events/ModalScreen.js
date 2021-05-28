import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalScreen = ({ show, handleClose, title, msg }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleClose}>
          ОК
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalScreen;
