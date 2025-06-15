const Joi = require('joi');
const organizerRepository = require('../repositories/organizerRepository');
const userRepository = require('../repositories/userRepository');
const eventRepository = require('../repositories/eventRepository');
const organizerModel = require('../models/organizerModel');

class OrganizerService {
    async getAll() {
        return organizerRepository.findAll();
    }

    async getByUsuario(id_usuario) {
        this.validateId(id_usuario);
        return organizerRepository.findByUsuario(id_usuario);
    }

    async getByEvento(id_evento) {
        this.validateId(id_evento);
        return organizerRepository.findByEvento(id_evento);
    }

    async create(data) {
        const { error, value } = organizerModel.schema.validate(data);
        if (error) throw new Error(`Erro de validação: ${error.message}`);

        const usuario = await userRepository.findById(value.id_usuario);
        if (!usuario) throw new Error('Usuário não encontrado');

        const evento = await eventRepository.findById(value.id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        const organizadores = await organizerRepository.findByEvento(value.id_evento);
        const jaOrganizador = organizadores?.find(o => o.id_usuario === value.id_usuario);

        if (jaOrganizador) {
            throw new Error('Usuário já é organizador deste evento');
        }

        return organizerRepository.create(value);
    }

    async updatePapel(id_usuario, id_evento, novoPapel) {
        this.validateId(id_usuario);
        this.validateId(id_evento);

        const { error } = Joi.string().max(100).required().validate(novoPapel);
        if (error) throw new Error(`Papel inválido: ${error.message}`);

        const organizadores = await organizerRepository.findByEvento(id_evento);
        const existe = organizadores?.find(o => o.id_usuario === id_usuario);

        if (!existe) throw new Error('Usuário não é organizador deste evento');

        return organizerRepository.updatePapel(id_usuario, id_evento, novoPapel);
    }

    async deleteByUsuarioAndEvent(id_usuario, id_evento) {
        this.validateId(id_usuario);
        this.validateId(id_evento);

        const organizadores = await organizerRepository.findByEvento(id_evento);
        const existe = organizadores?.find(o => o.id_usuario === id_usuario);

        if (!existe) throw new Error('Usuário não é organizador deste evento');

        return organizerRepository.deleteByUsuarioAndEvent(id_usuario, id_evento);
    }

    validateId(id) {
        const { error } = Joi.number().integer().positive().validate(id);
        if (error) throw new Error(`ID inválido: ${error.message}`);
    }
}

module.exports = new OrganizerService();
