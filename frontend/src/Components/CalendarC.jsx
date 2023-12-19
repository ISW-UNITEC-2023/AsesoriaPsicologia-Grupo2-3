import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import calendarServices from "../Utilities/calendar-services";

function CalendarC() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = calendarServices.getEventsByClinicId(localStorage.getItem("id_clinic"));
      response.then((res) => {
        setEvents(res.data);
      });
    }; 

    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      timeZone="local"
      nowIndicator={true}
      dayMaxEvents={true}
      aspectRatio={2.5}
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

export default CalendarC;
