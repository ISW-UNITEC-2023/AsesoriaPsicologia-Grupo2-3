import React, { useState, useEffect } from "react";
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

    const isFieldEmpty = (value) => value.trim() === '';

    const isFormDataEmpty = Object.values(formData).every(isFieldEmpty);
    const isAnyFieldEmpty = Object.values(formData).some(isFieldEmpty);

    const isNumeroIdentidadValid = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(formData.numeroIdentidad);

    useEffect(() => {
        console.log("Any empty: " + isAnyFieldEmpty + "\nAll empty: " + isFormDataEmpty);
    }, [isAnyFieldEmpty, isFormDataEmpty]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAnyFieldEmpty || isFormDataEmpty || !isNumeroIdentidadValid) {
            console.error('Todos los campos son obligatorios y/o el formato del número de identidad es incorrecto');
        } else {
            onSummit(formData);
            onClose();
        }
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
                    {!isNumeroIdentidadValid && (
                        <Form.Label className="text-danger">
                            El formato del número de identidad es incorrecto.
                        </Form.Label>
                    )}
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
                <Form.Label className="form-label-error" style={{ color: (isAnyFieldEmpty || isFormDataEmpty) ? 'red' : 'white' }}>
                    Todos los campos son obligatorios
                </Form.Label>
                <Button
                    variant="primary"
                    type="submit"
                    className="add_patient-footer-summit-buttom"
                    onClick={handleSubmit}
                >
                    Crear Paciente
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CrearPaciente;
