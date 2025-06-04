const Joi = require('joi');

class Organizadores {
    static get schema() {
        return Joi.object({
            papel: Joi.string().max(100).required(),
            id_usuario: Joi.number().integer().required(),
            id_evento: Joi.number().integer().required()
        });
    }
}

module.exports = Organizadores;
