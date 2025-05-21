const UsuarioModel = require('../models/userModel');

const getAllUsers = () => UsuarioModel.findAll();

const getUserById = (id) => UsuarioModel.findById(id);

const createUser = (data) => UsuarioModel.create(data);

const updateUser = (id, data) => UsuarioModel.update(id, data);

const deleteUser = (id) => UsuarioModel.delete(id);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
