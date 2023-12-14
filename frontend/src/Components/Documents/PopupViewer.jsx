import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Services from "../../Utilities/documents-services";
import "../../Styles/CSS/PopupViewer.css";

const PopupViewer = ({ file, onClose }) => {
  const [content, setContent] = useState(null);

  const openFile = async () => {
    try {
      const response = await Services.descargarArchivo(file.id_document);
      if (
        file.document_type === "image/jpeg" ||
        file.document_type === "image/png" ||
        file.document_type === "image/jpg" ||
        file.document_type === "image/gif" ||
        file.document_type === "image/webp"
      ) {
        const url = window.URL.createObjectURL(new Blob([response]));
        setContent(<img src={url} alt={file.document_name} />);
      } else if (file.document_type === "application/pdf") {
        const blob = new Blob([response], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);
        setContent(
          <iframe
            title={file.document_name}
            width="800"
            height="600"
            src={pdfUrl}
          />
        );
      } else {
        console.error("Tipo de archivo no compatible para visualización.");
      }
    } catch (error) {
      console.error("Error al manejar el archivo:", error);
    }
  };

  useEffect(() => {
    openFile();
    return () => {
      setContent(null);
    };
  }, []);

  const handleDownload = async () => {
    try {
      const response = await Services.descargarArchivo(file.id_document);
      const blob = new Blob([response]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = file.document_name;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <Modal
      show={!!content}
      onHide={() => {
        setContent(null);
        onClose();
      }}
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
    >
      <Modal.Body>
        {content}
        <style>
          {`
            img {
              max-width: 90%;
              max-height: 90%;
              width: auto;
              height: auto;
              margin: auto;
              display: block;
              object-fit: contain;
            }

            iframe {
              max-width: 100%;
              max-height: 98%;
              width: 100%;
              height: 100vh;
              border: none;
              margin: auto;
              display: block;
              object-fit: contain;
            }
          `}
        </style>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setContent(null);
            onClose();
          }}
          className="btn-block popup-button"
        >
          Cerrar
        </Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          className="btn-block popup-button"
        >
          Descargar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupViewer;
