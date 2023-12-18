import axios from "axios";

const host = process.env.REACT_APP_API_BASE_URL;

async function getEvents() {
    const options = {
        method: "GET",
        url: "http://localhost:8000/calendar/events/get",
        data: {},
    };
    let events = await axios.request(options);
    return events;
}

async function getEventsByClinicId(id_clinic) {
    const options = {
        method: "GET",
        url: "http://localhost:8000/calendar/events/getByClinicId",
        data: {id_clinic: id_clinic},
    };
    let events = await axios.request(options);
    return events;
}

async function createEvent(event) {
    const options = {
        method: "POST",
        url: "http://localhost:8000/calendar/events/create",
        data: {
            id: event.id,
            title: event.title,
            url: event.url,
            start: event.start,
            end: event.end,
            id_clinic: event.id_clinic,
        },
    };
    let events = await axios.request(options);
    return events.data;
}

export default {
getEvents,
createEvent
}
