import { useEffect, Fragment, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { loadModules } from "../../frontend/src/Utilities/course-services";
import { getInfoSectionMod } from "../../frontend/src/Utilities/section-services";
import { CreateAnnounce } from "../../frontend/src/Utilities/announces-services";

function AnuncioModal({ onClose }) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
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

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        console.log(quill.getText(0, 400));
        setMessageInfo(quill.getText(0, 400));
      });
    }
  }, [quill]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleItemSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleItemDeselect = (item) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item)
    );
  };

  const handleTermsCheckboxChange = () => {
    setAcceptTerms(!acceptTerms);
  };

  const handleButtonClick = async (buttonName, announceInfo) => {
    // Print the button name to the console
    console.log(`Button pressed: ${buttonName}`);
    if (buttonName === "Guardar") {
      try {
        await CreateAnnounce(announceInfo);
      } catch (error) {
        console.error("Error creating Announce:", error);
      }
    }
  };
  let title = "";
  if (localStorage.getItem("Title") != null) {
    title = localStorage.getItem("Title");
  }

  let message = "";
  if (localStorage.getItem("Message") != null) {
    title = localStorage.getItem("Message");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <h3 className="font-bold">Titulo del tema:</h3>
                  {title !== "" ? (
                    <input
                      id="myTitle"
                      type="text"
                      className="form-control "
                      value={title}
                      placeholder="Escriba el titulo"
                    />
                  ) : (
                    <input
                      id="myTitle"
                      type="text"
                      className="form-control"
                      placeholder="Escriba el titulo"
                    />
                  )}
                </div>
                <div>
                  <div ref={quillRef} />
                </div>
                <div>
                  <Container>
                    <Row>
                      <Row>
                        <Col md={3}>
                          <div className="menu-container flex flex-row">
                            <DropdownButton
                              id="ID"
                              title="Publicar en"
                              className="ml-3
                                                         inline-flex w-full justify-center rounded-md bg-white px-3 py-2
                                                         text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
                                                         ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto mb-3 mt-3"
                            >
                              <>
                                {secctions.map((secction) => (
                                  <>
                                    <Dropdown.Item
                                      key={secction.SectionId}
                                      as="button"
                                      onClick={() =>
                                        handleItemSelect(
                                          `${secction.CourseName}- Seccion: ${secction.SectionId}`
                                        )
                                      }
                                    >
                                      {secction.CourseName}{" "}
                                      {`- Seccion: ${secction.SectionId}`}
                                    </Dropdown.Item>
                                  </>
                                ))}
                                {modules.map((module) => (
                                  <>
                                    <Dropdown.Item
                                      key={module.id}
                                      as="button"
                                      onClick={() =>
                                        handleItemSelect(module.name)
                                      }
                                    >
                                      {module.name}
                                    </Dropdown.Item>
                                  </>
                                ))}
                                <Dropdown.Item
                                  key={123510}
                                  as="button"
                                  onClick={() =>
                                    handleItemSelect(
                                      "Todas las Clases con sus secciones"
                                    )
                                  }
                                >
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
                      <div></div>
                      <Row>
                        <Col md={6}>
                          <div className="terms-checkbox">
                            <InputGroup className="mb-3">
                              <Form.Check
                                type="checkbox"
                                className="ml-3"
                                label=" Notificar a los usuarios que este contenido ha cambiado?"
                                checked={acceptTerms}
                                onChange={handleTermsCheckboxChange}
                              />
                            </InputGroup>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="button-container">
                            <Button
                              variant="primary"
                              className="mt-3 mb-3 ml-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                              onClick={() => {
                                handleButtonClick("Cancelar").then((r) => r);
                                onClose(); // Cierra el modal
                              }}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="success"
                              className="mt-3 mb-3 ml-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-400 sm:mt-0 sm:w-auto"
                              onClick={() =>
                                handleButtonClick("Guardar", {
                                  title:
                                    document.getElementById("myTitle").value,
                                  message: messageInfo,
                                  section_id: 20,
                                  user_id: null,
                                })
                              }
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="info"
                              className="mt-3 mb-3 ml-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => handleButtonClick("Actualizar")}
                            >
                              Actualizar
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Row>
                  </Container>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AnuncioModal;
