import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {CreateAnnounce} from "../Utilities/announces-services"

function ModalAnuncios({ mode, title, message, sections }) {
  const [selectedSection, setSelectedSection] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    section_id: "",
    user_id: localStorage.getItem("user_id"),
  });

  async function crearAnuncio(){
    try{
      const response = await CreateAnnounce(formData);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        <Modal.Header closeButton>
            <Modal.Title>{mode === "create" ? "Crear Anuncio" : "Editar Anuncio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} readOnly={!mode === "create"} />
            </Form.Group>
            <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" value={message} readOnly={!mode === "create"} />
            </Form.Group>
            <Form.Group controlId="sections">
                <Form.Label>Sections</Form.Label>
                <Dropdown>
                <Dropdown.Toggle variant="primary" id="sections-dropdown">
                    {selectedSection || "Select Section"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {/* {sections.map((section, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedSection(section)}
                    >
                        {section}
                    </Dropdown.Item>
                    ))} */}
                </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger">
            Cancel
            </Button>
            {mode === "create" ? (
            <Button variant="success">
                Enviar
            </Button>
            ) : (
            <Button variant="primary">
                Actualizar
            </Button>
            )}
        </Modal.Footer>
    </div>
  );
}

export default ModalAnuncios;
