import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "./PopUpAction.css";

const PopUpAction = ({
	isOpen,
	actionType,
	pageName,
	itemId,
	itemName,
	onCancel,
	onConfirm,
}) => {

	const handleAction = () => {
		onConfirm(itemId);
	};

	return (
		<div id={`popup_action_${pageName}`}>
			<Modal
				className="modal-content-popup-action"
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
						¿Está seguro que desea {actionType.toLowerCase()} el/la siguiente{" "}
						{pageName.toLowerCase()}: {itemId} - {itemName}?
					</p>
				</Modal.Body>

				<Modal.Footer className="buttons-container-popup-action">
					<Button
						id={`popup_action_${pageName}_ok_${actionType}_btn`}
						className="confirm-button-popup-action"
						variant="danger"
						style={{ backgroundColor: "#c6161c" }}
						onClick={() => handleAction()}
					>
						{actionType}
					</Button>

					<Button
						id={`popup_action_${pageName}_cancel_${actionType}_btn`}
						className="cancel-button-popup-action"
						variant="secondary-outlined"
						style={{ border: "2px solid #5c636a" }}
						onClick={onCancel}
					>
						Cancelar
					</Button>
				</Modal.Footer>
			</Modal>
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
