const userService = require('../services/userService');

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuário não encontrado' });
};

const create = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
};

const updateNome = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const user = await userService.updateNome(id, nome);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar nome', error: error.message });
  }
};

const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await userService.updateEmail(id, email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o email', error: error.message });
  }
};

const updateSenha = async (req, res) => {
  const { id } = req.params;
  const { senha } = req.body;

  try {
    const user = await userService.updateSenha(id, senha);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar sua senha', error: error.message });
  }
};

const updateApelido = async (req, res) => {
  const { id } = req.params;
  const { apelido_eventual } = req.body;

  try {
    const user = await userService.updateApelido(id, apelido_eventual);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar apelido', error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(204).send();;
};

module.exports = {
  getAll,
  getById,
  create,
  updateNome,
  updateEmail,
  updateApelido,
  updateSenha, 
  remove
};
