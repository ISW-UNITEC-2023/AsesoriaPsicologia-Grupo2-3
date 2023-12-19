const HTTPCodes = require("../Utils/HTTPCodes");
const calendarServices = require("../Service/calendar-services");

const { outlook, google, yahoo } = require("calendar-link");


//Post
async function createEvent(req, res) {
    const {id_event, title, url, start, end, id_clinic} = req.body;

    try {
        const errorMessages = [];

        if (errorMessages.length) {
            res.status(HTTPCodes.BAD_REQUEST).send({error: errorMessages});
        } else {

            let newEvent = null;
            newEvent = calendarServices.createEvent({
                id_event: id_event,
                title: title,
                url: url,
                start: start,
                end: end,
                id_clinic: id_clinic    
            });
          
            
            res.send({
                success: true,
                newEvent,
                
            });
        
        } 
}catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudo crear el evento.",
        });
        console.log(e);
    }
}

async function updateEventById(req, res){
    try {
        const events = await calendarServices.updateEventById(req.data);
        res.send("Se actualizo el evento");
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudieron obtener los eventos.",
        });
    }
}

//Get
async function getEvents(req, res) {
    try {
        const events = await calendarServices.getEvents();
        res.send(events);
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudieron obtener los eventos.",
            e
        });
    }
}

async function getEventsByClinicId(req, res){
    try {
        const events = await calendarServices.getEventsByClinicId(req.data);
        res.send(events);
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudieron obtener los eventos.",
        });
    }
}

//Delete
async function deleteEventById(req, res){


    try {
        const {id} = req.params;

        await calendarServices.deleteEventById(id);
        res.send("Se elimino el evento");
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudo eliminar el evento.",
        });
    }
}


async function generateEventLinks(req, res)
{
    const event = {
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
      };

    const eventUrl = {
        "google": google(event),
        "outlook": outlook(event),
        "yahoo": yahoo(event),

    }


    res.send({
        success: true,
        eventUrl,
    });
}


module.exports = {
    createEvent,
    getEvents,
    getEventsByClinicId,
    updateEventById,
    deleteEventById
};
