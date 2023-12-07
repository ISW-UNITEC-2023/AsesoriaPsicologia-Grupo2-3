
import NavigationB from "../Components/Navbar";
import "../Styles/CSS/Calendar.css";
  function Calendar(props) {
    return(
      <div className="style-db-container">
      <NavigationB userData={props.userData} />
      <div className="style-header-container">
      <div >
        <h1 className="style-header">
          CALENDARIO
        </h1>
      </div>
      </div>
      </div>
    );
  };

export default Calendar;