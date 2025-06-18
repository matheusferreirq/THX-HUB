const Joi = require('joi');
const guestRepository = require('../repositories/guestRepository');
const guestModel = require('../models/guestModel');
const userRepository = require('../repositories/userRepository');
const eventRepository = require('../repositories/eventRepository');

class GuestService {
    async getAllByEvento(id_evento) {
        this.validateId(id_evento);
        return guestRepository.getAllByEvento(id_evento);
    }

    async getAllConfirmados(id_evento) {
        this.validateId(id_evento);
        return guestRepository.getAllConfirmados(id_evento);
    }

    async invite({ id_convidado, id_evento }) {
        this.validateId(id_convidado);
        this.validateId(id_evento);

        const user = await userRepository.findById(id_convidado);
        if (!user) throw new Error('Usuário não encontrado');

        const evento = await eventRepository.findById(id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        const convidadosAtuais = await guestRepository.getAllByEvento(id_evento);
        const jaConvidado = convidadosAtuais.find(c => c.username === user.username);
        if (jaConvidado) throw new Error('Usuário já está convidado para este evento');

        if (convidadosAtuais.length >= evento.limite_convidados) {
            throw new Error('Limite de convidados atingido');
        }

        return guestRepository.invite(id_convidado, id_evento);
    }

    async confirmAttendence(id_convidado, id_evento) {
        this.validateId(id_convidado);
        this.validateId(id_evento);

        const convidado = await guestRepository.findByEventoAndConvidado(id_evento, id_convidado);
        if (!convidado) throw new Error('Usuário não foi convidado para este evento');
        

        const confirmados = await guestRepository.getAllConfirmados(id_evento);
        const evento = await eventRepository.findById(id_evento);
        if (!evento) throw new Error('Evento não encontrado');

        if (confirmados.length >= evento.limite_convidados) {
            throw new Error('Não é possível confirmar. Limite de convidados atingido');
        }

        return guestRepository.confirmAttendence(id_convidado, id_evento);
    }

    async removeGuest(id_convidado, id_evento) {
        this.validateId(id_convidado);
        this.validateId(id_evento);

        const convidados = await guestRepository.getAllByEvento(id_evento);
        const existe = convidados.find(c => c.username && c.id === id_convidado);
        if (!existe) throw new Error('Convidado não pertence a este evento');

        return guestRepository.deleteGuest(id_convidado, id_evento);
    }

    validateId(id) {
        const { error } = Joi.number().integer().positive().validate(id);
        if (error) throw new Error(`ID inválido: ${error.message}`);
    }
}

module.exports = new GuestService();
