const messageService = require('../services/messageService');

const getAllMensagens = async (req, res) => {
    const { id_evento} = req.params;
    const mensagens = await messageService.getAllMensagens(id_evento);
    res.json(mensagens);
}

const create = async (req, res ) => {
    const { id_evento } = req.params;
    const { conteudo } = req.body;
    const id_usuario = req.session && req.session.user && req.session.user.id;

    if (!id_usuario) {
        return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const message = await messageService.create({ conteudo, id_evento, id_usuario });
    if (message) res.redirect(`/eventos/${id_evento}`);
    else res.status(404).json({ message: "Evento ou usuário não encontrados" });
}

const deleteMessage = async (req, res ) => {
    const { id_mensagens_evento } = req.params;
    await messageService.deleteMessage(id_mensagens_evento);
    res.status(204).send();
}

module.exports = {
    getAllMensagens,
    create,
    deleteMessage
}