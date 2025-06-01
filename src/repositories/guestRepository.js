const db = require('../config/db')
const Convidados = require ('../models/guestModel')

class GuestRepository {
    async getAllByEvento(id_evento) {
        const result = await db.query(`
            SELECT SPLIT_PART(u.nome, ' ', 1) AS primeiro_nome, u.username, ce.confirmado
            FROM convidados_evento ce
            JOIN usuarios u ON u.id = ce.id_convidado
            WHERE ce.id_evento = $1`, [id_evento]);
        return result.rows.map(row => new Convidados(row))
    }

    async getAllConfirmados(id_evento) {
        const result = await db.query(
            `SELECT u.nome FROM convidados_evento ce JOIN usuarios u ON u.id = ce.id_convidado WHERE ce.id_evento = $1 AND ce.confirmado = TRUE`,
            [id_evento]
        );
        return result.rows.map(row => new Convidados(row));
    }

    async invite(id_convidado, id_evento) {
        const result = await db.query('INSERT INTO convidados_evento (id_convidado, id_evento) VALUES ($1, $2) RETURNING *',
            [id_convidado, id_evento]
        );
        return new Convidados(result.rows[0]);
    }

    async confirmAttendence(id_convidado, id_evento) {
        const result = await db.query(
            'UPDATE convidados_evento SET confirmado = true, data_confirmacao = CURRENT_TIMESTAMP WHERE id_convidado = $1 AND id_evento = $2 RETURNING *',
            [id_convidado, id_evento]
        );
        if (result.rows.length === 0) return null;
        return new Convidados(result.rows[0]);
    }

    async deleteGuest(id_convidado, id_evento) {
        await db.query(
            'DELETE FROM convidados_evento WHERE id_convidado = $1 AND id_evento = $2',
            [id_convidado, id_evento]
        );
    };
}

module.exports = new GuestRepository()