const messageService = require('../services/messageService');

const getAllMensagens = async (req, res) => {
    const { id_evento} = req.params;
    const mensagens = await messageService.getAllMensagens(id_evento);
    res.json(mensagens);
}

const create = async (req, res ) => {
    const { id_evento } = req.params;
    const { conteudo, id_usuario } = req.body;
    const message = await messageService.create( {conteudo, id_evento, id_usuario} )
    if (message) res.json(message);
    else res.status(404).json( { message: "Evento ou usuário não encontrados"} );
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