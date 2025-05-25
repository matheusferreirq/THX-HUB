const userRepository = require('../repositories/userRepository');

class userService {
  getAll() {
    return userRepository.findAll();
  }

  getById(id) {
    return userRepository.findById(id)
  }

  create(data) {
    return userRepository.create(data);
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