const Joi = require('joi');

class Usuarios {
    static get schema() {
        return Joi.object({
            nome: Joi.string().max(100).required(),
            email: Joi.string().email().required(),
            senha: Joi.string().min(6).required(),
            apelido_eventual: Joi.string().max(50).optional().allow('')
        });
    }
}

module.exports = Usuarios;