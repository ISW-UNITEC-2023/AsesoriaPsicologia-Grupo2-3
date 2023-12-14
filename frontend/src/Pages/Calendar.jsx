import NavigationBar from "../Components/Navbar";
import "../Styles/CSS/Calendar.css";
import CalendarC from "../Components/CalendarC";
import React from "react";

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
        <div style={{paddingLeft: "2.5%"}}>

        <CalendarC>
            
       
            </CalendarC> 
        </div>
        </div>
    </div>
    );
};
export default Calendar;

/* events={[
                                        //yyyy-mm-dd
                { title: 'event 1', start: '2023-11-11T00:30:00', end: '2023-11-15T12:30:00', url:"https://www.google.com" },]} */