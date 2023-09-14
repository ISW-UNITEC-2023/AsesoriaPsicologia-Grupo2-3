import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Container, Button, Row, Col } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import dropdownItems from './dropdownItems.json';



function AnunciosCrear() {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();

 

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quillRef.current.firstChild.innerHTML);
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
//0------

  const [selectedItems, setSelectedItems] = useState([]);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleItemSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemDeselect = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
  };

  const handleTermsCheckboxChange = () => {
    setAcceptTerms(!acceptTerms);
  };

  const handleButtonClick = (buttonName) => {
    // Print the button name to the console
    console.log(`Button pressed: ${buttonName}`);
  };



  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ textAlign: "left" }}>Titulo del tema</h3>

      <input
        type="text"
        className="form-control"
        placeholder="Ingrese el titulo"
      />

      <div style={{ width: "100%", height: 300 }}>
        <div ref={quillRef} />
      </div>
      <div style={{ marginTop: "50px" }}>
      <Container>
      <Row>
      <Row>
        <Col md={6}>
          <div className="menu-container">
            <DropdownButton id="ID" title="Publicar en"> 
              {dropdownItems.map((item, index) => (
                <Dropdown.Item key={index} as="button" onClick={() => handleItemSelect(item.action)}>
                  {item.text} {item.action}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Col>
        <Col md={6}>
          <div className="selected-items-container">
            {selectedItems.map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                className="selected-item-button"
                onClick={() => handleItemDeselect(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </Col>
        
      </Row>
      <div style={{ marginTop: "20px" }}></div>
      <Row>

        <Col md={6}>
          <div className="terms-checkbox">
            <InputGroup className="mb-3">
              <Form.Check
                type="checkbox"
                label="Notificar a los usuarios que este contenido ha cambiado?"
                checked={acceptTerms}
                onChange={handleTermsCheckboxChange}
              />
            </InputGroup>
          </div>
        </Col>
        <Col md={6}>
          <div className="button-container">
            <Button variant="primary" onClick={() => handleButtonClick('Cancelar')}>
              Cancelar
            </Button>
            <Button variant="success" onClick={() => handleButtonClick('Guardar')}>
              Guardar
            </Button>
            <Button variant="info" onClick={() => handleButtonClick('Actualizar')}>
              Actualizar
            </Button>
          </div>
        </Col>
      </Row>
      </Row>
    </Container>
    </div>
    </div>
    
  );
}

export default AnunciosCrear;
