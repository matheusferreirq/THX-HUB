const Joi = require('joi');

class Mensagens {
    static get schema() {
        return Joi.object({
            id_evento: Joi.number().integer().required(),
            id_usuario: Joi.number().integer().required(),
            conteudo: Joi.string().max(1000).required(),
            data_envio: Joi.date().required()
        });
    }
}

module.exports = Mensagens;