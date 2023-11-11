import React, { useState } from "react";
import "../Styles/CSS/PopUp_EditarUser.css";
import userServices from "../Utilities/user-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const EditarUser = ({ isOpen, onClose, user }) => {
  const overlayStyle = {
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  };

  const popupStyle = {
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  };

  const [toggleEdits, setToggleEdits] = useState({
    editName: false,
    editEmail: false,
    editPhone: false,
    editActive: false,
  });

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    active: 1,
  });

  async function actualizarUsuario() {
    if (credentials.name !== user.user_name) {
      // await userServices.updateUserName(user.id_user, credentials.name, );
    }
  }

  return (
    <div className="popup-overlay-eu" style={overlayStyle}>
      <div className="popup-eu" style={popupStyle}>
        <div className="form-header-eu">
          <h2 className="form-title-eu">Datos del usuario {user.name_user}</h2>
          <FontAwesomeIcon
            className="close-icon-eu"
            icon={faRightFromBracket}
            onClick={onClose}
          />
        </div>
        <div className="form-body-eu">
          <div className="form-group-eu">
            <label className="form-label-eu">Nombre Completo</label>
            {toggleEdits.editName ? (
              <input
                type="text"
                className="form-input-eu"
                required
                value={user.name_user}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
            ) : (
              <div className="form-div-input-eu">
                <input
                  type="text"
                  className="form-input-eu"
                  disabled
                  value={user.name_user}
                />
                <FontAwesomeIcon
                  className="pencil-icon-eu"
                  icon={faPencil}
                  onClick={() =>
                    setToggleEdits({
                      ...toggleEdits,
                      editName: toggleEdits.editName ? false : true,
                    })
                  }
                />
              </div>
            )}
          </div>
          <div className="form-group-eu">
            <label className="form-label-eu">Correo Eléctronico</label>
            {toggleEdits.editEmail ? (
              <input
                type="email"
                className="form-div-input-eu"
                required
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  })
                }
              />
            ) : (
              <div className="form-div-input-eu">
                <input
                  type="text"
                  className="form-input-eu"
                  disabled
                  value={user.email_user}
                />
                <FontAwesomeIcon
                  className="pencil-icon-eu"
                  icon={faPencil}
                  onClick={() =>
                    setToggleEdits({
                      ...toggleEdits,
                      editEmail: toggleEdits.editEmail ? false : true,
                    })
                  }
                />
              </div>
            )}
          </div>
          <div className="form-group-double-eu">
            <div className="form-group-eu">
              <label className="form-label-eu">Numero Teléfonico</label>
                {toggleEdits.editPhone ? (
                  <input
                    type="text"
                    required
                    onChange={(event) =>
                      setCredentials({
                        ...credentials,
                        phone: event.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="form-div-input-eu">
                    <input
                      type="text"
                      className="form-input-eu"
                      disabled
                      value={user.number_user}
                    />
                    <FontAwesomeIcon
                      className="pencil-icon-eu"
                      icon={faPencil}
                      onClick={() =>
                        setToggleEdits({
                          ...toggleEdits,
                          editPhone: toggleEdits.editPhone ? false : true,
                        })
                      }
                    />
                  </div>
                )}
            </div>
            <div className="form-group-eu">
              <label className="form-label-eu">Estado</label>
              {toggleEdits.editActive ? (
                <select
                  className="form-control-eu"
                  required
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      active: event.target.value,
                    })
                  }
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              ) : (
                <div className="form-div-input-eu">
                  <input
                    type="text"
                    className="form-input-eu"
                    disabled
                    value={user.active_user ? "Activo" : "Inactivo"}
                  />
                  <FontAwesomeIcon
                    className="pencil-icon-eu"
                    icon={faPencil}
                    onClick={() =>
                      setToggleEdits({
                        ...toggleEdits,
                        editActive: toggleEdits.editActive ? false : true,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-buttons-eu">
            <button className="form-cancel-eu" onClick={onClose}>
              Cancelar
            </button>
            <button className="form-actualizar-eu">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarUser;
