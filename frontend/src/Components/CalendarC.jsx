import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import calendarServices from "../Utilities/calendar-services";

function CalendarC() {
  /* const handleDateChange = ({ startStr, endStr }) => {
        console.log(`New date range: ${startStr} to ${endStr}`);
      };*/

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = calendarServices.getEvents();
      response.then((res) => {
        console.log(res.data);
        setEvents(res.data);
      });
    };

    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      height="auto"
      locale={esLocale}
      timeZone="local"
      nowIndicator={true}
      dayMaxEvents={true}
      //datesSet={handleDateChange}
      events={events}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,list",
      }}
      slotLabelFormat={[
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          meridiem: "short",
        },
      ]}
    />
  );
}

/*class CalendarC extends React.Component {
    calendarRef = React.createRef();
    const handleDateChange = ({ startStr, endStr }) => {
        console.log(`New date range: ${startStr} to ${endStr}`);
      };
  
    render() {
      return (
        <FullCalendar
          ref={this.calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          height="auto"
          locale={esLocale}
          timeZone="local"
          nowIndicator={true}
          dayMaxEvents={true}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,list'
          }}
          slotLabelFormat={[{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            meridiem: 'short'
          }]}
        />
      );
    }
  
    someMethod() {
      let calendarApi = this.calendarRef.current.calendarApi;


      // Now you can use calendarApi to call methods on the FullCalendar instance.
    }
  }*/

export default CalendarC;
