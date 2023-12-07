import NavigationBar from "../Components/Navbar";
import "../Styles/CSS/Calendar.css";

function Calendar(props){
    return (
<div className="style-db-container">
    <NavigationBar userData={props.userData} />
    <div style={{width: "90%"}}>
        <div className="style-header-container" >
            <h1 className="style-title" style={{ width: "400%" }}>
        Calendario
            </h1>
        </div>
        </div>
    </div>
    );
};
export default Calendar;