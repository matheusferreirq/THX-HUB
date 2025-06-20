const db = require('../config/db');

class UserRepository {
    async findAll() {
        const result = await db.query('SELECT * FROM usuarios');
        return result.rows;
    };

    async findById(id) {
        const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) return null; 
        return result.rows[0];
    }

    async findByEmail(email) {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    };

    async findByUsername(username) {
        const result = await db.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        return result.rows[0] || null;
    }

    async create(usuario) {
        const { username, nome, email, senha } = usuario;
        const result = await db.query(
            'INSERT INTO usuarios (username, nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, nome, email, senha]
        );
        return result.rows[0];
    };

    async updateNome(id, novoNome) {
        const result = await db.query(
        'UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING *',
        [novoNome, id]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    async updateSenha(id, novaSenha) {
        const result = await db.query(
        'UPDATE usuarios SET senha = $1 WHERE id = $2 RETURNING *',
        [novaSenha, id]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    async updateEmail(id, novoEmail) {
        const result = await db.query(
        'UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING *',
        [novoEmail, id]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    async updateApelido(id, novoApelido) {
        const result = await db.query(
        'UPDATE usuarios SET apelido_eventual = $1 WHERE id = $2 RETURNING *',
        [novoApelido, id]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    }
}

module.exports = new UserRepository();