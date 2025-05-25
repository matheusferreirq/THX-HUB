const organizerService = require('../services/organizerService');

const getAll = async (req, res) => {
    const organizers = await organizerService.getAll();
    res.json(organizers);
}

const getByUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    const organizer = await organizerService.getByUsuario(id_usuario);
    if (organizer) res.json(organizer);
    else res.status(404).json( { message: 'Usuário não encontrado'});
}

const getByEvento = async (req, res) => {
    const { id_evento } = req.params;
    const evento = await organizerService.getByEvento(id_evento);
    if (evento) res.json(evento)
    else res.status(404).json( { message: "Evento não encontrado"});
}

const create = async (req, res) => {
    const organizer = await organizerService.create(req.body);
    res.status(201).json(organizer);
}

const updatePapel = async (req, res) => {
    const { id_usuario, id_evento} = req.params
    const { papel } = req.body

    try {
        const result = await organizerService.updatePapel(id_usuario, id_evento, papel)
        if (result) res.json(result) 
            else res.status(404).json({ message: "Usuário ou evento não encontrado"})
    }   catch(error) {res.status(500).json({ message: 'Erro ao atualizar seu apelido', error: error.message })};
}

const deleteByUsuarioAndEvent = async (req, res) => {
    const { id_evento, id_usuario} = req.params;
    await organizerService.deleteByUsuarioAndEvent(id_usuario, id_evento);
    res.status(204).send();
}

module.exports = {
    getAll,
    getByUsuario,
    getByEvento,
    create,
    updatePapel,
    deleteByUsuarioAndEvent
}
