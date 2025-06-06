const Joi = require('joi');
const userRepository = require('../repositories/userRepository');
const userModel = require('../models/userModel')
const userArraySchema = Joi.array().items(userModel.schema);

class userService {
  async getAll() {
    const users = await userRepository.findAll();
    const { error, value } = userArraySchema.validate(users);
    if (error) {
      throw new Error(`Erro de validação: ${error.message}`);
    }
    return value;
  }


  getById(id) {
    return userRepository.findById(id)
  }

  create(data) {
    const { error, value } = userModel.schema.validate(data);
    if (error) {
      throw new Error(`Erro de validação: ${error.message}`);
    }
    return userRepository.create(value);
  }

  updateNome(id, nome) {
    return userRepository.updateNome(id, nome);
  }

  updateSenha(id, senha) {
    return userRepository.updateSenha(id, senha);
  }

  updateEmail(id, email) {
    return userRepository.updateEmail(id, email);
  }

  updateApelido(id, apelido_eventual) {
    return userRepository.updateApelido(id, apelido_eventual);
  }

  delete(id) {
    return userRepository.delete(id)
  }
}

module.exports = new userService();