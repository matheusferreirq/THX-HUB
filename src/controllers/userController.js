const bcrypt = require('bcrypt');
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

const register = async (req, res) => {
  try {
    const { username, nome, email, senha } = req.body;
    
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const userData = {
      username,
      nome,
      email,
      senha: hashedPassword
    };

    const user = await userService.create(userData);
    
    const { senha: _, ...userWithoutPassword } = user;
    
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    req.session.user = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    const { senha: _, ...userWithoutPassword } = user;

    res.json({ 
      message: 'Login realizado com sucesso',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao fazer logout' });
    }
    res.redirect('/');
  });
};

const showRegisterPage = (req, res) => {
  res.render('register', { title: 'Cadastro - THX Hub' });
};

const showLoginPage = (req, res) => {
  res.render('login', { title: 'Login - THX Hub' });
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    
    const user = await userService.updateSenha(id, hashedPassword);
    if (user) {
      const { senha: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
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
  await userService.delete(id);
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  register,
  login,
  logout,
  showRegisterPage,
  showLoginPage,
  updateNome,
  updateEmail,
  updateApelido,
  updateSenha, 
  remove
};

