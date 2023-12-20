import NavigationBar from "../Components/Navbar";
import "../Styles/CSS/Calendar.css";
import CalendarC from "../Components/CalendarC";
import React from "react";

function Calendar(props) {
  function havePrivilege(privilege) {
    // console.log("Esto es lo que voy a comparar", props.verifyRef);
    if (privilege) {
      return props.verifyRef.current.privileges.includes(privilege);
    } else {
      return false;
    }
  }

  return (
    <div className='style-db-container'>
      <NavigationBar userData={props.userData} />
      <div style={{ width: "90%" }}>
        <h1 className='style-title' style={{ width: "400%" }}>
          Calendario
        </h1>
        <div className='style-calendar-container'>
          {havePrivilege(69) ? (
            <CalendarC />
          ) : (
            <div>No tienes permisos para ver el calendario</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Calendar;

/* events={[
                                        //yyyy-mm-dd
                { title: 'event 1', start: '2023-11-11T00:30:00', end: '2023-11-15T12:30:00', url:"https://www.google.com" },]} */
