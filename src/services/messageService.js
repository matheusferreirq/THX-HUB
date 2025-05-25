const messageRepository = require('../repositories/messageRepository');

class messageService {
    async getAllMensagens(id_evento) {
        return messageRepository.getAllMensagens(id_evento);
    };

    async create({conteudo, id_evento, id_usuario}) {
        return messageRepository.create({conteudo, id_evento, id_usuario})
    };

    async deleteMessage(id_mensagens_evento) {
        return messageRepository.deleteMessage(id_mensagens_evento);
    };
}

module.exports = new messageService();
