const HTTPCodes = require("../Utils/HTTPCodes");
const calendarServices = require("../Service/calendar-services");

const { outlook, google, yahoo } = require("calendar-link");

const jwt = require("jsonwebtoken");

//Post
async function createEvent(req, res) {
    const {title, url, start, end, id_clinic} = req.body;
    console.log(req);

    try {
        const errorMessages = [];

        if (errorMessages.length) {
            res.status(HTTPCodes.BAD_REQUEST).send({error: errorMessages});
        } else {

            let newEvent = null;    
            newEvent = calendarServices.createEvent({
                "title": title,
                "url": url,
                "start": start,
                "end": end,
                //"id_clinic": id_clinic    
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

async function deleteEventById(req, res){
    
}

//Get
async function getEvents(req, res) {
    try {
        const events = await calendarServices.getEvents();
        res.send(events);
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudieron obtener los eventos.",
        });
    }
}


async function getEventByID(req, res) {
    const {id} = req.query;

    try {
        const name = await userServices.getUserCredentialsByid(id);
        res.send(name);

    } catch (error) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudo obtener el nombre del usuario",
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

};
