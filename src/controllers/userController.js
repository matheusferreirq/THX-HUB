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
    console.log("pegando reqbody: ", req.body)
    
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      console.log('já tem usuario')
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    const saltRounds = 10;
    console.log('defini hash')
    const hashedPassword = await bcrypt.hash(senha, saltRounds);
    console.log('criptografei a senha')

    const userData = {
      username,
      nome,
      email,
      senha: hashedPassword
    };
    console.log('encapsulei os dados', userData)

    const user = await userService.create(userData);
    console.log('chamei a funçao de cadastrar')
    
    const { senha: _, ...userWithoutPassword } = user;
    
    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário por email
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Remover senha do retorno
    const { senha: _, ...userWithoutPassword } = user;

    res.json({ 
      message: 'Login realizado com sucesso',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

const showRegisterPage = (req, res) => {
  res.render('register', { title: 'Cadastro - THX Hub' });
};

// Renderizar página de login
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
    // Hash da nova senha
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
  showRegisterPage,
  showLoginPage,
  updateNome,
  updateEmail,
  updateApelido,
  updateSenha, 
  remove
};

