const db = require('../config/db')
const Eventos = require('../models/eventModel');

class EventosRepository {
    async findAll() {
        const result = await db.query('SELECT * FROM eventos')
        return result.rows.map(row => new Eventos(row));
    };

    async findById(id) {
        const result = await db.query('SELECT * FROM eventos WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return new Eventos(result.rows[0]);
    }

    async create(evento) {
        const {titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados} = evento;
        const result = await db.query(
            'INSERT INTO eventos (titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
            [titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados]
        );
        return new Eventos(result.rows[0]);
    };

    async update(id, evento) {
        const { titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados } = evento;
        const result = await db.query(
            'UPDATE eventos SET titulo = $1, descricao = $2, local = $3, data_hora_inicio = $4, data_hora_fim = $5, limite_convidados = $6 WHERE id = $7 RETURNING *',
            [titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados, id]
        );
        return new Eventos(result.rows[0]);
    };

    async delete(id) {
        await db.query('DELETE FROM eventos WHERE id = $1', [id]);
    }
}

module.exports = new EventosRepository()