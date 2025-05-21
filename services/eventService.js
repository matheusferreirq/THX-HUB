const EventModel = require('../models/eventModel');

const getAllEvents = () => EventModel.findAll();

const getEventById = (id) => EventModel.findById(id);

const createEvent = (data) => EventModel.create(data);

const updateEvent = (id, data) => EventModel.update(id, data);

const deleteEvent = (id) => EventModel.delete(id)

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};