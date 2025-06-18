const eventService = require('../services/eventService');
const guestService = require('../services/guestService');
const messageService = require('../services/messageService');
const userService = require('../services/userService');
const organizerService = require('../services/organizerService')

const getAll = async (req, res) => {
    const events = await eventService.getAll();
    res.json(events);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const evento = await eventService.getById(id);
    const organizadores = await organizerService.getByEvento(id);
    res.render('detalhesEvento', {
        evento,
        organizadores: organizadores,
        usuarioLogado: req.session.user,
    });
}

const create = async (req, res) => {
    const usuarioId = req.session && req.session.user && req.session.user.id;
    if (!usuarioId) {
        return res.status(401).send('Usuário não autenticado.');
    }
    try {
        const evento = await eventService.create(req.body);
        
        await organizerService.create({
            id_usuario: usuarioId,
            id_evento: evento.id,
            papel: 'Criador'
        });
        res.redirect('/eventos');
    } catch (error) {
        console.error('Erro ao criar evento:', error);
        res.status(500).send('Erro ao criar evento.');
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const event = await eventService.update(id, req.body);
    res.json(event);
}

const remove = async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.session && req.session.user && req.session.user.id;

    const organizadores = await organizerService.getByEvento(id);
    const criador = organizadores.find(o => o.papel === 'Criador');

    if (!criador || criador.id_usuario !== usuarioId) {
        return res.status(403).send('Apenas o criador do evento pode deletá-lo.');
    }

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
        const { id } = req.params;
        const convidados = await guestService.getAllByEvento(id);
        const mensagens = await messageService.getAllMensagens(id);
        const evento = await eventService.getById(id);
        const usuarios = await userService.getAll();
        const organizadores = await organizerService.getByEvento(id); 
        evento.organizadores = organizadores;

        res.render('detalhesEvento', {
            evento: evento,
            convidados: convidados,
            mensagens: mensagens,
            usuarios: usuarios,
            usuarioLogado: req.session.user,
            organizadores: organizadores
        });
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