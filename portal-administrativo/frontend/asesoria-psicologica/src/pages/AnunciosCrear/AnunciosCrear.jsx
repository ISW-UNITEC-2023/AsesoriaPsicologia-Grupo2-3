import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Container, Button, Row, Col } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import dropdownItems from './dropdownItems.json';
import { loadModules } from "../../Services/course";
import {getInfoSectionMod} from "../../Services/sections";
import { CreateAnnounce } from "../../Services/announces";


function AnunciosCrear() {
  const { quill, quillRef } = useQuill();
  const [value, setValue] = useState();

  const [modules, setModules] = useState([]);
  const [secctions, setModulessec] = useState([]);
  const [messageInfo, setMessageInfo] = useState({});
  const [titleInfo, setTitleInfo] = useState({});

  useEffect(() => {
    updateModulesecList();
    updateModuleList();
  }, []);

  const updateModulesecList = () => {
    async function fetchData() {
      setModulessec(await getInfoSectionMod());
    }
    fetchData();
  };

  const updateModuleList = () => {
    async function fetchData() {
      setModules(await loadModules());
    }
    fetchData();
  };


  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quill.getText(0,400));
        setMessageInfo(quill.getText(0,400));
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

  const handleButtonClick = async (buttonName, announceInfo) => {
    // Print the button name to the console
    console.log(`Button pressed: ${buttonName}`);
    if (buttonName=="Guardar") {
      try {
        await CreateAnnounce(announceInfo);
      } catch (error) {
        console.error("Error creating Announce:", error);
      }
    }

  };
  let title = ""
  if(localStorage.getItem("Title") != null){
    title = localStorage.getItem("Title");
  }

  let message = ""
  if(localStorage.getItem("Message") != null){
    title = localStorage.getItem("Message");
  }

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ textAlign: "left" }}>Titulo del tema</h3>

      {title != "" && <input
        id="myTitle"
        type="text"
        className="form-control"
        value={title}
        placeholder="Escriba el titulo"
      />}
      {title == "" && <input
        id="myTitle"
        type="text"
        className="form-control"
        placeholder="Escriba el titulo"
      />}

      <div style={{ width: "100%", height: 300 }}>
        <div ref={quillRef} />
      </div>
      <div style={{ marginTop: "50px" }}>
      <Container>
      <Row>
      <Row>
        <Col md={3}>
          <div className="menu-container">
            <DropdownButton id="ID"  title="Publicar en"> 
              < >
                {secctions.map((secction) => (
                  <>
                  <Dropdown.Item key={secction.SectionId} as="button" onClick={() => handleItemSelect(`${secction.CourseName}- Seccion: ${secction.SectionId}`)}>
                    {secction.CourseName} {`- Seccion: ${secction.SectionId}`}
                  </Dropdown.Item>
                  </>
                ))}
                {modules.map((module) => (
                  <>
                  <Dropdown.Item key={module.id} as="button" onClick={() => handleItemSelect(module.name)}>
                    {module.name} 
                  </Dropdown.Item>
                  </>
                ))}
                <Dropdown.Item key={123510} as="button" onClick={() => handleItemSelect("Todas las Clases con sus secciones")}>
                  {"Todas las Clases con sus secciones"} 
                </Dropdown.Item>
              </>
            </DropdownButton>
          </div>
        </Col>
        <Col md={3}>
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
        <Col md={4} >
          <div className="button-container"  >
            <Button variant="primary" onClick={() => handleButtonClick('Cancelar')}>
              Cancelar
            </Button>
      
            <Button variant="success" onClick={() => handleButtonClick('Guardar', {
              title:document.getElementById('myTitle').value,
              message:messageInfo,
              section_id:23,
              user_id:null
            })}>
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
