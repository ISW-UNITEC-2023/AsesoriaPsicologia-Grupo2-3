import "../Styles/CSS/Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faCalendar,
    faCalendarDays,
    faChevronDown,
    faChevronUp,
    faFileLines,
    faGaugeHigh,
    faMoneyBill,
    faMoneyCheck,
    faRightFromBracket,
    faUserCircle,
    faUserGear,
    faUserGroup,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {deleteCookies} from "../Utilities/login-services";
import {Button, Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";

function MyNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        deleteCookies().then(r => r);
        navigate("/InicioSesion");
    };

    const logs = () => {
        navigate("/AuditLogs");
    };

    return (
        <div className="background-navbar">
            <div className="parent-container">
                <div className="body-navbar-plataforma">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="nb-navbar-user-icon"
                    />
                    <div className="nb-custom-dropdown">
                        <div className="nb-dropdown-header" onClick={toggleDropdown}>
                            Cuenta
                            {isOpen ? (
                                <FontAwesomeIcon icon={faChevronUp} className="nb-drop-arrow"/>
                            ) : (
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="nb-drop-arrow"
                                />
                            )}
                        </div>
                        {isOpen && (
                            <div className="nb-dropdown-items">
                                <div
                                    className="nb-dropdown-item"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                        className="nb-dropdown-icon"
                                    />
                                    Cerrar Sesión
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/Dashboard" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faGaugeHigh}
                            className="navbar-plataforma-icon"
                        />
                        Tablero
                    </Link>
                    <Link to="/Zoomv" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faVideo}
                            className="navbar-plataforma-icon"
                        />
                        Zoom
                    </Link>

                    <Link to="/Calendar" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="navbar-plataforma-icon"
                        />
                        Calendario
                    </Link>

                    <Link to="/Pacientes" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faUserGroup}
                            className="navbar-plataforma-icon"
                        />
                        Pacientes
                    </Link>

                    <Link to="/Cuentas" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            className="navbar-plataforma-icon"
                        />
                        Cuentas
                    </Link>

                    <Link to="/AuditLogs" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faFileLines}
                            className="navbar-plataforma-icon"
                        />
                        Logs
                    </Link>

                    <Link to="/Roles" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faUserGear}
                            className="navbar-plataforma-icon"
                        />
                        Roles
                    </Link>

                    <Link to="/Chequeo" className="link-navbar-plataforma">
                        <FontAwesomeIcon
                            icon={faMoneyCheck}
                            className="navbar-plataforma-icon"
                        />
                        Chequeo
                    </Link>
                    <Popover placement="right-start">
                        <PopoverHandler>
                            <Button variant="text" className="hover:bg-transparent">
                                <div className="flex flex-col items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faMoneyBill}
                                        className="navbar-plataforma-icon text-white mr-2"
                                    />
                                    <div className="text-white">
                                        Analíticas
                                    </div>
                                </div>
                            </Button>

                        </PopoverHandler>
                        <PopoverContent className="w-auto">
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Analiticas
                            </Typography>
                            <div className="flex flex-row gap-5">
                                <Link to="/Estadisticas" className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={faMoneyBill}
                                        className="navbar-plataforma-icon mr-2"
                                    />
                                    Estadísticas
                                </Link>
                                <Link to="/Estadisticas" className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        className="navbar-plataforma-icon mr-2"
                                    />
                                    Reportes
                                </Link>
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default MyNavbar;
