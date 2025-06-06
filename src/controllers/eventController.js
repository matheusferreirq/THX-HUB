const eventService = require('../services/eventService');
const guestService = require('../services/guestService');
const messageService = require('../services/messageService');

const getAll = async (req, res) => {
    const events = await eventService.getAll();
    res.json(events);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const event = await eventService.getById(id);
    if (event) res.json(event);
    else res.status(404).json( {message: 'Evento não encontrado'});
};

const create = async (req, res) => {
    const event = await eventService.create(req.body);
    res.redirect('/eventos')
}

const update = async (req, res) => {
    const { id } = req.params;
    const event = await eventService.update(id, req.body);
    res.json(event);
}

const remove = async (req, res) => {
    const { id } = req.params;
    await eventService.delete(id);
    res.status(204).send();
}

const listView = async (req, res) => {
    try {
        const eventos = await eventService.getAll();
        res.render('eventos', { eventos: eventos });
    } catch (error) {
        res.status(500).send('Erro ao carregar eventos: ' + error.message);
    }
};

const viewCreate = async (req, res) => {
    try {
        res.render('criarEvento');
        
    } catch (error) {
        res.status(500).send('Erro ao carregar eventos: ' + error.message);
    }
};

const viewDetails = async (req, res) => {
    try {
        const { id } = req.params
        const convidados = await guestService.getAllByEvento(id)
        const mensagens = await messageService.getAllMensagens(id)
        const evento = await eventService.getById(id)
        res.render('detalhesEvento', {evento: evento, convidados: convidados, mensagens: mensagens});
    } catch (error){
        res.status(500).send('Erro ao carregar detalhes do evento: ' + error.message);
    }
}

module.exports = { 
    getAll,
    getById, 
    create, 
    update, 
    remove,
    listView,
    viewCreate,
    viewDetails
}