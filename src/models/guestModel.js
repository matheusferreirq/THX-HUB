const Joi = require('joi');

class Convidados {
    static get schema() {
        return Joi.object({
            confirmado: Joi.boolean().required(),
            data_confirmacao: Joi.date().optional(),
            id_evento: Joi.number().integer().required(),
            id_convidado: Joi.number().integer().required()
        });
    }
}

module.exports = Convidados;