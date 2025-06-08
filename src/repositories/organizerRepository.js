const db = require('../config/db');
const Organizadores = require('../models/organizerModel');

class organizerRepository {
    async findAll() {
        const result = await db.query('SELECT * FROM organizadores_eventos');
        return result.rows.map(row => new Organizadores(row));
    };

    async findByUsuario(id_usuario) {
        const result = await db.query('SELECT * FROM organizadores_eventos WHERE id_usuario = $1', [id_usuario]);
        if (result.rows.length === 0) return null;
        return new Organizadores(result.rows[0]);
    };

    async findByEvento(id_evento) {
        const result = await db.query(
            `SELECT 
                oe.id,
                oe.id_usuario,
                oe.papel,
                split_part(u.nome, ' ', 1) AS primeiro_nome,
                u.username
             FROM organizadores_eventos oe
             JOIN usuarios u ON oe.id_usuario = u.id
             WHERE oe.id_evento = $1`,
            [id_evento]
        );
        if (result.rows.length === 0) return null;
        return result.rows;
    };

    async create(organizador) {
        const { id_usuario, id_evento, papel } = organizador;
        console.log(organizador)
        const result = await db.query(
            'INSERT INTO organizadores_eventos (id_usuario, id_evento, papel) VALUES ($1, $2, $3) RETURNING *',
            [id_usuario, id_evento, papel]
        );
        return new Organizadores(result.rows[0]);
    };

    async updatePapel (id_usuario, id_evento, novoPapel) {
        const result = await db.query(
            'UPDATE organizadores_eventos SET papel = $1 WHERE id_usuario = $2 AND id_evento = $3 RETURNING *',
            [novoPapel, id_usuario, id_evento]
        );
        if (result.rows.length === 0) return null;
        return new Organizadores(result.rows[0]);
    };

    async deleteByUsuarioAndEvent(id_usuario, id_evento) {
        await db.query('DELETE FROM organizadores_eventos WHERE id_usuario = $1 AND id_evento = $2',
            [id_usuario, id_evento]
        );
    };
}

module.exports = new organizerRepository();