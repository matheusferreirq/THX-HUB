const Joi = require('joi');

class Usuarios {
  static get schema() {
    return Joi.object({
        username: Joi.string().max(50).required(),
        nome: Joi.string().max(100).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required(),
        apelido_eventual: Joi.optional().allow('')
    }).unknown(true); // Permite campos adicionais
  }
}

module.exports = Usuarios;
