const Joi = require('joi');
const eventosRepository = require('../repositories/eventRepository');
const EventModel = require('../models/eventModel');

class EventoService {
    async getAll() {
        return eventosRepository.findAll();
    }

    async getById(id) {
        const { error } = Joi.number().integer().positive().validate(id);
        if (error) throw new Error(`ID inválido: ${error.message}`);

        return eventosRepository.findById(id);
    }

    async create(data) {
        const { error, value } = EventModel.schema.validate(data);
        if (error) throw new Error(`Erro de validação: ${error.message}`);

        return eventosRepository.create(value);
    }

    async update(id, data) {
        const { error: idError } = Joi.number().integer().positive().validate(id);
        if (idError) throw new Error(`ID inválido: ${idError.message}`);

        const { error, value } = EventModel.schema.validate(data);
        if (error) throw new Error(`Erro de validação: ${error.message}`);

        return eventosRepository.update(id, value);
    }

    async delete(id) {
        const { error } = Joi.number().integer().positive().validate(id);
        if (error) throw new Error(`ID inválido: ${error.message}`);

        return eventosRepository.delete(id);
    }
}

module.exports = new EventoService();
