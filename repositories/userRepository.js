const db = require('../config/db');
const Usuarios = require('../models/userModel')

class userRepository {
    async findAll() {
        const result = await db.query('SELECT * FROM usuarios');
        return result.rows.map(row => new Usuarios(row));
    };

    async findById(id) {
        const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return new Usuarios(result.rows[0]);
    };

    async create(usuario) {
        const { nome, email, senha } = usuario;
        const result = await db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senha]
        );
        return new Usuarios(result.rows[0])
    };

    async updateNome(id, novoNome) {
        const result = await db.query(
        'UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *',
        [novoNome, id]
        );
        if (result.rows.length === 0) return null;
        return new Usuarios(result.rows[0]);
    }

    async updateSenha(id, novaSenha) {
        const result = await db.query(
        'UPDATE usuarios SET senha = $1 WHERE id = $2 RETURNING *',
        [novaSenha, id]
        );
        if (result.rows.length === 0) return null;
        return new Usuarios(result.rows[0]);
    }

    async updateEmail(id, novoEmail) {
        const result = await db.query(
        'UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING *',
        [novoEmail, id]
        );
        if (result.rows.length === 0) return null;
        return new Usuarios(result.rows[0]);
    }

    async updateApelido(id, novoApelido) {
        const result = await db.query(
        'UPDATE usuarios SET apelido_eventual = $1 WHERE id = $2 RETURNING *',
        [novoApelido, id]
        );
        if (result.rows.length === 0) return null;
        return new Usuarios(result.rows[0]);
    }

    async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    }
}

module.exports = new userRepository();