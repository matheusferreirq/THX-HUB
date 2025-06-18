const Joi = require('joi');
const userRepository = require('../repositories/userRepository');
const userModel = require('../models/userModel');

class userService {
  async getAll() {
    const users = await userRepository.findAll();
    const { error, value } = Joi.array().items(userModel.schema).validate(users);
    if (error) throw new Error(`Erro de validação: ${error.message}`);
    return value;
  }

  async getById(id) {
    const { error } = Joi.number().integer().positive().validate(id);
    if (error) return null;
    return userRepository.findById(id);
  }

  async findByEmail(email) {
    const { error } = Joi.string().email().required().validate(email);
    if (error) throw new Error(`Email inválido: ${error.message}`);

    return userRepository.findByEmail(email);
  }

  async create(data) {
    const { error, value } = userModel.schema.validate(data);
    if (error) {
      throw new Error(`Erro de validação: ${error.message}`);
    }

    return userRepository.create(value);
  }

  async updateNome(id, nome) {
    const { error } = userModel.schema.extract('nome').validate(nome);
    if (error) throw new Error(`Nome inválido: ${error.message}`);

    return userRepository.updateNome(id, nome);
  }

  async updateSenha(id, senha) {
    const { error } = userModel.schema.extract('senha').validate(senha);
    if (error) throw new Error(`Senha inválida: ${error.message}`);

    return userRepository.updateSenha(id, senha);
  }

  async updateEmail(id, email) {
    const { error } = userModel.schema.extract('email').validate(email);
    if (error) throw new Error(`Email inválido: ${error.message}`);

    return userRepository.updateEmail(id, email);
  }

  async updateApelido(id, apelido_eventual) {
    const { error } = userModel.schema.extract('apelido_eventual').validate(apelido_eventual);
    if (error) throw new Error(`Apelido inválido: ${error.message}`);

    return userRepository.updateApelido(id, apelido_eventual);
  }

  async delete(id) {
    const { error } = Joi.number().integer().positive().validate(id);
    if (error) throw new Error(`ID inválido: ${error.message}`);

    return userRepository.delete(id);
  }

  async findByUsername(username) {
    const { error } = Joi.string().required().validate(username);
    if (error) throw new Error(`Username inválido: ${error.message}`);
    return userRepository.findByUsername(username);
  }
}

module.exports = new userService();