const db = require('../config/db');

class EventModel {
    static async findAll() {
        const result = await db.query('SELECT * FROM eventos');
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM eventos WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create( {titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados} ) {
        const result = await db.query(
            'INSERT INTO eventos (titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados]
        );
        return result.rows[0];
    }

    static async update(id, {titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados} ) {
        const result = await db.query(
            'UPDATE eventos SET titulo = $1, descricao = $2, local = $3, data_hora_inicio = $4, data_hora_fim = $5, limite_convidados = $6 WHERE id = $7 RETURNING *',
            [titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM eventos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = EventModel;