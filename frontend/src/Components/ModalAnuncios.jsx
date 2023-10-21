import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalAnuncios(props) {
    const {estado} = props;

    return(
        <Modal
            isOpen={estado}
            style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "90%",
            }}
            backdrop={true}
            keyboard={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </Modal>
    )
}

export default ModalAnuncios;