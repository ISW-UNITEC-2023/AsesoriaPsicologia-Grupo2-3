import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./PopUp_CrearPaciente.css";

const CrearPaciente = ({ onClose, onSummit, isOpen }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    numeroIdentidad: "",
    direccion: "",
    estadoCivil: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    handleClose();
  };

  return (
    <Modal className="add_patient" show={isOpen} onHide={onClose}>
      <Modal.Header className="add_patient-header" closeButton>
        <Modal.Title>Crear un nuevo Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="add_patient-body">
        <Form onSubmit={handleSubmit} className="add_patient-form">
          <Form.Group controlId="formNombre" className="add_patient-form-group">
            <Form.Label className="form-label-pacientes">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Maria Perez"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="form-control-paciente-nombre"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formFechaNacimiento"
            className="add_patient-form-group"
          >
            <Form.Label className="form-label-pacientes">
              Fecha de Nacimiento
            </Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              className="form-control-paciente-date"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formNumeroIdentidad"
            className="add_patient-form-group"
          >
            <Form.Label className="form-label-pacientes">
              Número de Identidad
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="XXXX-XXXX-XXXX"
              name="numeroIdentidad"
              value={formData.numeroIdentidad}
              onChange={handleInputChange}
              className="form-control-paciente-identidad"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formDireccion"
            className="add_patient-form-group"
          >
            <Form.Label className="form-label-pacientes">Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección: XXXX"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="form-control-paciente-direccion"
              required
            />
          </Form.Group>
          <Form.Group
            controlId="formEstadoCivil"
            className="add_patient-form-group"
          >
            <Form.Label className="form-label-pacientes">
              Estado Civil
            </Form.Label>
            <Form.Control
              as="select"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
              className="form-control-paciente-estado"
              required
            >
              <option value="">Estado Civil</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="add_patient-footer">
        <Button
          variant="primary"
          type="submit"
          className="add_patient-footer-summit-buttom"
        >
          Crear Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearPaciente;
