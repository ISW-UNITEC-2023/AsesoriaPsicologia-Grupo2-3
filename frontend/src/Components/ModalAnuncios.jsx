import {Modal, Button, Form, Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import {CreateAnnounce} from "../Utilities/announces-services";
import {UpdateAnnouncesDecription, UpdateAnnouncesTitle} from "../Utilities/announces-services";

function ModalAnuncios({ mode, title, message, sections, id, onClose }) {
    const [selectedSection, setSelectedSection] = useState("");

    const handleSelect = (id, name) => {
        setSelectedSection(id + " " + name);
        setFormData({...formData, section_id: id});
        console.log(formData);
    };

    const [formData, setFormData] = useState({
        title: title,
        message: message,
        section_id: 0,
        sender_id: parseInt(localStorage.getItem("user_id")),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function crearAnuncio() {
        try {
            if (formData.section_id === 0) {
                for (let i = 0; i < sections.length; i++) {
                    await CreateAnnounce({ ...formData, section_id: sections[i].SectionId });
                }
            } else {
                await CreateAnnounce(formData);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAnuncio() {
        try {
            if (formData.title !== title) {
                await UpdateAnnouncesTitle(id, formData.title);
            }
            if (formData.message !== message) {
                await UpdateAnnouncesDecription(id, formData.message);
            }
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title>
                        {mode === "create" ? "Nuevo Anuncio: " + formData.title : "Editar Anuncio: " + formData.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Escribe el titulo del anuncio"
                                value={formData.title}
                                readOnly={!mode === "create"}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                placeholder="Escribe el mensaje del anuncio"
                                value={formData.message}
                                readOnly={!mode === "create"}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </Form.Group>
                        {mode === "create" && (
                            <Form.Group controlId="sections">
                                <Form.Label>Secciones</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="sections-dropdown">
                                        {selectedSection || "Select Section"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => handleSelect(0, "Todas las secciones")}
                                        >
                                            Todas las secciones
                                        </Dropdown.Item>
                                        <Dropdown.Divider/>
                                        {sections.map((section, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                onClick={() =>
                                                    handleSelect(section.SectionId, section.CourseName)
                                                }
                                            >
                                                {section.SectionId} {section.CourseName}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                    {mode === "create" ? (
                        <Button
                            variant="success"
                            onClick={() => {
                                crearAnuncio();
                            }}
                        >Enviar
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => {
                                updateAnuncio();
                            }}
                        >Actualizar
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAnuncios;
