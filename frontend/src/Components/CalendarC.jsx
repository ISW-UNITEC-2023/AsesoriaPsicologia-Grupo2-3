import React from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from '@fullcalendar/core/locales/es';

function CalendarC(){
    return(
            <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            height="auto"
            locale={esLocale}
            />
      
    )


}

export default CalendarC;