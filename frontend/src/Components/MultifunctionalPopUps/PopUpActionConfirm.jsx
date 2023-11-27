import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "./PopUpAction.css";

const PopUpActionConfirm = ({ isOpen, actionType, pageName, itemId, itemName, onConfirm }) => {
    return (
        <>
            <Modal
                show={isOpen}
                onHide={onConfirm}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title style={{ fontSize: "1.5rem", textAlign: "center" }}>
                        {actionType} {pageName}: {itemName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: "1.3rem", textAlign: "center" }}>
                        La accion de {actionType.toLowerCase()} el/la siguiente {pageName.toLowerCase()}: {itemId} - {itemName} se realizo correctamente!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="cancel-button"
                        variant="secondary-outlined"
                        style={{ border: "2px solid #5c636a" }}
                        onClick={onConfirm}
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

PopUpActionConfirm.propTypes = {
    isOpen: PropTypes.bool,
    actionType: PropTypes.string,
    pageName: PropTypes.string,
    itemId: PropTypes.number,
    itemName: PropTypes.string,
    onConfirm: PropTypes.func,
};

export default PopUpActionConfirm;
