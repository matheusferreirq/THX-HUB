const Joi = require('joi');

class EventModel {
    static get schema() {
        return Joi.object({
            titulo: Joi.string().max(255).required(),
            descricao: Joi.string().allow('').optional(),
            local: Joi.string().max(255).required(),
            data_hora_inicio: Joi.date().required(),
            data_hora_fim: Joi.date().required(),
            limite_convidados: Joi.number().integer().min(1).required()
        });
    }
}

module.exports = EventModel;
