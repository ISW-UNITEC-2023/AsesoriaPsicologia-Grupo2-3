import React, { useState, useEffect } from "react";
import {
  faFilter,
  faArrowUp,
  faArrowDown,
  faFilterCircleXmark,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/CSS/AuditLogs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Services from "../Utilities/actions-services";
import Navbar from "../Components/Navbar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AuditLogs(props) {
  const [logs, setLogs] = useState([]);
  const [originalLogs, setOriginalLogs] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [actions, setActions] = useState([
    "CREACIÓN",
    "MODIFICACIÓN",
    "ELIMINACIÓN",
  ]);
  const [tables, setTables] = useState([]);
  const [selectedCol, setSelectedCol] = useState({
    action: false,
    selectedAction: [],
    table: false,
    selectedTable: [],
  });

  //Mensajes de filtros
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  useEffect(() => {
    async function initialList() {
      const arregloActions = await Services.getActions();
      const arregloMandar = [];

      arregloActions.map((action) => {
        let accionFormeatada = "";
        if (action.type_action === "CREACION") accionFormeatada = "CREACIÓN";
        else if (action.type_action === "MODIFICACION")
          accionFormeatada = "MODIFICACIÓN";

        return arregloMandar.push({
          Fecha_Hora: action.datetime_action,
          ID: action.idactions,
          Usuario: action.user_name,
          Accion: accionFormeatada,
          Tabla: action.table_action,
          Info_Accion: action.info_action,
        });
      });

      let tables = [];
      arregloMandar.map((log) => {
        if (!tables.includes(log.Tabla)) {
          tables.push(log.Tabla);
        }
      });
      setTables(tables);
      setLogs(arregloMandar);
      setOriginalLogs(arregloMandar);
    }
    initialList();
  }, []);

  //Components
  const CustomBtFilter = ({ type }) => {
    const sortLogs = (mode) => {
      let sortedLogs = [...logs];
      sortedLogs.sort((a, b) => {
        if (type === "id_log") {
          return mode === "asc" ? a.ID - b.ID : b.ID - a.ID;
        } else if (type === "user_log") {
          return mode === "asc"
            ? a.Usuario.localeCompare(b.Usuario)
            : b.Usuario.localeCompare(a.Usuario);
        } else if (type === "creation_date") {
          return mode === "asc"
            ? a.Fecha_Hora.localeCompare(b.Fecha_Hora)
            : b.Fecha_Hora.localeCompare(a.Fecha_Hora);
        }
        return 0;
      });
      setSorted(true);
      setLogs(sortedLogs);
    };

    return (
      <div className="dropdown">
        <button
          className="custom-dropdown-toggle"
          type="button"
          id={`dropdownMenu$}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        </button>
        <div className="dropdown-menu" aria-labelledby={`dropdownMenu${type}`}>
          <button
            className="dropdown-item"
            onClick={() => {
              sortLogs("asc");
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} className="filter-icon" />
            ASC
          </button>
          <button
            className="dropdown-item"
            onClick={() => {
              sortLogs("desc");
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} className="filter-icon" />
            DESC
          </button>
        </div>
      </div>
    );
  };

  const CustomCbFilter = ({ type }) => {
    return (
      <div className="dropdown">
        <button
          className="custom-dropdown-toggle"
          type="button"
          id={`dropdownMenu$}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        </button>
        <div className="dropdown-menu" aria-labelledby={`dropdownMenu${type}`}>
          {type === "action" ? (
            <div className="form-check-filter">
              {actions.length > 0 &&
                actions.map((action) => {
                  return (
                    <label className="filter-check-label" htmlFor={action}>
                      <input
                        className="check-input-filter"
                        type="checkbox"
                        name={type}
                        value={action}
                        id={action}
                        checked={selectedCol.selectedAction.includes(action)}
                        onChange={(e) => {
                          filterSelectedItem(e);
                        }}
                      />
                      {action}
                    </label>
                  );
                })}
            </div>
          ) : (
            <div className="form-check-filter">
              {tables.length > 0 &&
                tables.map((table) => {
                  return (
                    <label className="filter-check-label" htmlFor={table}>
                      <input
                        className="check-input-filter"
                        type="checkbox"
                        name={type}
                        value={table}
                        id={table}
                        checked={selectedCol.selectedTable.includes(table)}
                        onChange={(e) => {
                          filterSelectedItem(e);
                        }}
                      />
                      {table}
                    </label>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  };

  //Limpiar filtros
  function limpiarFiltros() {
    if (sorted) {
      setLogs(originalLogs);
      setSorted(false);
      setSelectedCol({
        action: false,
        selectedAction: [],
        table: false,
        selectedTable: [],
      });
    }
  }

  //Filtrado por accion y tabla
  function filterSelectedItem(e) {
    let selectedItem = e.target.value;
    let filteredLogs = [];
    if (e.target.name === "action") {
      const newActions = [...selectedCol.selectedAction];
      if (newActions.includes(selectedItem)) {
        const index = newActions.indexOf(selectedItem);
        newActions.splice(index, 1);
      } else {
        if (!newActions.includes(selectedItem)) {
          newActions.push(selectedItem);
        }
      }
      setSelectedCol({
        ...selectedCol,
        action: true,
        selectedAction: newActions,
      });
      originalLogs.filter((log) => {
        newActions.forEach((action) => {
          if (log.Accion === action) {
            if (!filteredLogs.includes(log)) {
              filteredLogs.push(log);
            }
          }
        });
      });
      setSorted(true);
      setLogs(filteredLogs);
      if (newActions.length === 0) {
        limpiarFiltros();
      }
    } else if (e.target.name === "table") {
      const newTables = [...selectedCol.selectedTable];
      if (newTables.includes(selectedItem)) {
        const index = newTables.indexOf(selectedItem);
        newTables.splice(index, 1);
      } else {
        if (!newTables.includes(selectedItem)) {
          newTables.push(selectedItem);
        }
      }
      setSelectedCol({
        ...selectedCol,
        table: true,
        selectedTable: newTables,
      });
      originalLogs.filter((log) => {
        newTables.forEach((table) => {
          if (log.Tabla === table) {
            if (!filteredLogs.includes(log)) {
              filteredLogs.push(log);
            }
          }
        });
      });
      setSorted(true);
      setLogs(filteredLogs);
      if (newTables.length === 0) {
        limpiarFiltros();
      }
    }
  }

  //Functions
  const formatDate = (creationDate) => {
    var date = new Date(creationDate);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    var formattedDate = date.toLocaleString("es-ES", options);
    return formattedDate;
  };

  const getCurrentLogs = () => {
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    return logs.slice(indexOfFirstLog, indexOfLastLog);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function downloadLogs(format) {
    const columns = [
      { title: "ID", dataKey: "ID" },
      { title: "Usuario", dataKey: "Usuario" },
      { title: "Accion", dataKey: "Accion" },
      { title: "Tabla", dataKey: "Tabla" },
      { title: "Info de Accion", dataKey: "Info_Accion" },
      { title: "Fecha", dataKey: "Fecha_Hora" },
    ];
  
    const rows = logs.map((log) => ({
      ID: log.ID,
      Usuario: log.Usuario,
      Accion: log.Accion,
      Tabla: log.Tabla,
      Info_Accion: log.Info_Accion,
      Fecha_Hora: formatDate(log.Fecha_Hora),
    }));
  
    if (format === "pdf") {
      const pdf = new jsPDF();
      pdf.autoTable({
        columns,
        body: rows,
        styles: {
          cellPadding: 2,
          align: 'center',
          fontSize: 10,
          rowHeight: 8,

        },
        headStyles: {
          fillColor: [17, 57, 70],
          textColor: [255, 255, 255],
        },
        columnStyles: {
          Usuario: { cellWidth: 30 },
          Info_Accion: { cellWidth: 50 },
        },
      });
  
      pdf.save("historial " + (formatDate(new Date())) + ".pdf");
    } else if (format === "excel") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        columns.map((column) => column.title).join(",") +
        "\n" +
        rows
          .map((row) => columns.map((column) => row[column.dataKey]).join(","))
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "historial "+(formatDate(new Date()))+".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <div className="historial-container">
      <Navbar userData={props.userData} />
      <div className="historial-box">
        <div className="historial-header">
          <span className="historial-title">Historial Administrativo</span>
          <div
            className="remove-filter-historial"
            onClick={() => {
              limpiarFiltros();
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <FontAwesomeIcon icon={faFilterCircleXmark} />
            {isHovering && sorted && (
              <span className="limpiar-filtro-div">Limpiar filtros</span>
            )}
            {isHovering && !sorted && (
              <span className="limpiar-filtro-div">
                No se han aplicado filtros
              </span>
            )}
          </div>
          <button className="boton-descargar-log" onClick={() => downloadLogs('pdf')}>
            Descargar Historial en PDF
          </button>
          <button className="boton-descargar-excel" onClick={() => downloadLogs('excel')}>
            Descargar Historial en Excel
          </button>
        </div>
        <table className="table table-bordered historial-table">
          <thead className="historial-table-header">
            <tr>
              <th>
                <div className="th-div-historial">
                  <CustomBtFilter type="id_user" />
                  Id
                </div>
              </th>
              <th>
                <div className="th-div-historial">
                  <CustomBtFilter type="user_log" />
                  Usuario
                </div>
              </th>
              <th>
                <div className="th-div-historial">
                  <CustomCbFilter type="action" />
                  Acción
                </div>
              </th>
              <th>
                <div className="th-div-historial">
                  <CustomCbFilter type="table" />
                  Tabla
                </div>
              </th>
              <th>Info de Acción</th>
              <th>
                <div className="th-div-historial">
                  <CustomBtFilter type="creation_date" />
                  Fecha
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentLogs().length > 0 && getCurrentLogs().map((dato) => (
              <tr className="row-table-historial" key={dato.ID}>
                <td className="td-items-historial">{dato.ID}</td>
                <td className="td-items-historial">{dato.Usuario}</td>
                <td className="td-items-historial">{dato.Accion}</td>
                <td className="td-items-historial">{dato.Tabla}</td>
                <td className="td-info-accion">{dato.Info_Accion}</td>
                <td className="td-items-historial">
                  {formatDate(dato.Fecha_Hora)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
        <span className="pagination-text">
            Mostrando {getCurrentLogs().length} de {logs.length} registros
          </span>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {Array.from(
            { length: Math.ceil(logs.length / logsPerPage) },
            (_, index) => {
              const page = index + 1;
              const isCurrentPage = currentPage === page;
              const shouldDisplay =
                page === 1 ||
                page === currentPage - 1 ||
                page === currentPage ||
                page === currentPage + 1 ||
                page === Math.ceil(logs.length / logsPerPage);

              return shouldDisplay ? (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={isCurrentPage ? "active" : ""}
                >
                  {page}
                </button>
              ) : null;
            }
          )}

          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={getCurrentLogs().length < logsPerPage}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuditLogs;
