const db = require('../config/db');

class UsuarioModel {
  static async findAll() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ nome, email, senha, apelido_eventual }) {
    const result = await db.query(
      'INSERT INTO usuarios (nome, email, senha, apelido_eventual) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, senha, apelido_eventual]
    );
    return result.rows[0];
  }

  static async update(id, { nome, email, senha, apelido_eventual }) {
    const result = await db.query(
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3, apelido_eventual = $4 WHERE id = $5 RETURNING *',
      [nome, email, senha, apelido_eventual, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = UsuarioModel;
