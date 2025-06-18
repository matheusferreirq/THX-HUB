const Joi = require('joi');
const messageRepository = require('../repositories/messageRepository');
const userRepository = require('../repositories/userRepository');
const eventRepository = require('../repositories/eventRepository');
const organizerRepository = require('../repositories/organizerRepository');
const messageModel = require('../models/messageModel');
const userService = require('./userService');

class messageService {
    async getAllMensagens(id_evento) {
        this.validateId(id_evento);

        const evento = await eventRepository.findById(id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        return messageRepository.getAllMensagens(id_evento);
    }

    async create({ conteudo, id_evento, id_usuario }) {
        this.validateId(id_evento);
        this.validateId(id_usuario);

        const { error } = messageModel.schema.extract('conteudo').validate(conteudo);
        if (error) throw new Error(`Conteúdo inválido: ${error.message}`);

        const evento = await eventRepository.findById(id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        const user = await userService.getById(id_usuario);
        if (!user) throw new Error('Usuário não encontrado');

        return messageRepository.create({ conteudo, id_evento, id_usuario });
    }

    async deleteMessage(id_mensagens_evento, id_evento, id_usuario) {
        this.validateId(id_mensagens_evento);
        this.validateId(id_evento);
        this.validateId(id_usuario);

        const evento = await eventRepository.findById(id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        const user = await userRepository.findById(id_usuario);
        if (!user) throw new Error('Usuário não encontrado');

        const organizadores = await organizerRepository.getByEvento(id_evento);
        const isOrganizer = organizadores.some(o => o.id_usuario === id_usuario);

        if (!isOrganizer) {
            throw new Error('Apenas o organizador pode deletar mensagens');
        }

        return messageRepository.deleteMessage(id_mensagens_evento);
    }

    validateId(id) {
        const { error } = Joi.number().integer().positive().validate(id);
        if (error) throw new Error(`ID inválido: ${error.message}`);
    }
}

module.exports = new messageService();
