import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "../Styles/CSS/PopUpDelete.css";

const PopUpDeleted = ({ isOpen, onClose, pageName }) => {
    return (
        <Modal 
            show={isOpen} 
            onHide={onClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {pageName === "modulo"
                        ? "Módulo Eliminado"
                        : pageName === "seccion"
                            ? "Sección Eliminada"
                            : "ERROR!"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {pageName === "modulo" ? (
                    <p>El módulo ha sido eliminado correctamente.</p>
                ) : pageName === "seccion" ? (
                    <p>La sección ha sido eliminada correctamente.</p>
                ) : (
                    <p>ERROR: Operación no válida.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

PopUpDeleted.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    pageName: PropTypes.string,
};

export default PopUpDeleted;
