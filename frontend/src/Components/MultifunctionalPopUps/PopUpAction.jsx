import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "./PopUpAction.css";
import PopUpActionConfirm from "./PopUpActionConfirm";

const PopUpAction = ({ isOpen, actionType, pageName, itemId, itemName, onCancel, onConfirm }) => {
    const [displayConfirmPopUp, setDisplayConfirmPopUp] = useState(false);

    const handleAction = () => {
        onConfirm(itemId);
        setDisplayConfirmPopUp(true);
    }

    return (
        <div id={`popup_action_${pageName}`}>
            <Modal
                id
                show={isOpen}
                onHide={onCancel}
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
                        ¿Está seguro que desea {actionType.toLowerCase()} el/la siguiente {pageName.toLowerCase()}: {itemId} - {itemName}?
                    </p>
                </Modal.Body>

                <Modal.Footer className="buttons-container">
                    <Button
                        id={`popup_action_${pageName}_ok_${actionType}_btn`}
                        className="confirm-button"
                        variant="danger"
                        style={{ backgroundColor: "#c6161c" }}
                        onClick={() => handleAction()}
                    >
                        {actionType}
                    </Button>

                    <Button
                        id={`popup_action_${pageName}_cancel_${actionType}_btn`}
                        className="cancel-button"
                        variant="secondary-outlined"
                        style={{ border: "2px solid #5c636a" }}
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

            <PopUpActionConfirm
                isOpen={displayConfirmPopUp}
                actionType={actionType}
                pageName={pageName}
                itemName={itemName}
                itemId={itemId}
                onConfirm={() => setDisplayConfirmPopUp(false)}
            />
        </div>
    );
};

PopUpAction.propTypes = {
    isOpen: PropTypes.bool,
    actionType: PropTypes.string,
    pageName: PropTypes.string,
    itemId: PropTypes.number,
    itemName: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default PopUpAction;
