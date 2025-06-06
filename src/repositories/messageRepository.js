const db = require('../config/db');
const Mensagens = require('../models/messageModel');

class messageRepository {
    async getAllMensagens(id_evento) {
        const result = await db.query(
            `SELECT m.conteudo, m.data_envio, u.username
            FROM mensagens_evento m
            LEFT JOIN usuarios u ON u.id = m.id_usuario
            WHERE m.id_evento = $1
            ORDER BY m.data_envio ASC;
            `, 
            [id_evento]
        );
        return result.rows;
    };

    async create({conteudo, id_evento, id_usuario}) {
        const result = await db.query(
            'INSERT INTO mensagens_evento (conteudo, data_envio, id_evento, id_usuario) VALUES ($1, CURRENT_TIMESTAMP, $2, $3) RETURNING *',
            [conteudo, id_evento, id_usuario]
        )
        return new Mensagens(result.rows[0]);
    }

    async deleteMessage(id_mensagens_evento) {
        await db.query(
            'DELETE FROM mensagens_evento WHERE id = $1 RETURNING *',
            [id_mensagens_evento]
        );
    };
}

module.exports = new messageRepository();