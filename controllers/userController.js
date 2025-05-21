const userService = require('../services/userService');

const getAll = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuário não encontrado' });
};

const create = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);
  res.json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUser(id);
  res.json(user);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
