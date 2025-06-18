const guestService = require('../services/guestService');
const organizerService = require('../services/organizerService');

const getAllByEvento = async (req, res) => {
    const { id_evento } = req.params;
    const convidados = await guestService.getAllByEvento(id_evento);
    res.json(convidados);
}

const getAllConfirmados = async (req, res) => {
    const { id_evento } = req.params;
    const confirmados = await guestService.getAllConfirmados(id_evento);
    if (confirmados) res.json(confirmados);
    else res.status(404).json({ message: 'Evento não encontrado' });
}

const invite = async (req, res) => {
    const { id_evento } = req.params;
    const { id_convidado } = req.body;
    const usuarioId = req.session && req.session.user && req.session.user.id;
    const isOrganizer = await organizerService.isOrganizer(usuarioId, id_evento);
    if (!isOrganizer) {
        return res.status(403).json({ message: 'Apenas organizadores podem convidar pessoas.' });
    }
    const convite = await guestService.invite({ id_convidado, id_evento });
    if (convite) res.json(convite);
    else res.status(400).json({ message: 'Convite não pôde ser realizado.' });
}

const confirmAttendence = async (req, res) => {
    const { id_evento } = req.params;
    const id_convidado = req.session && req.session.user && req.session.user.id;
    if (!id_convidado) {
        return res.status(401).json({ message: "Usuário não autenticado" });
    }
    const confirmacao = await guestService.confirmAttendence(id_convidado, id_evento);
    if (confirmacao) res.json(confirmacao);
    else res.status(404).json({ message: "Evento ou usuário não encontrados" });
}


const removeGuest = async (req, res) => {
    const { id_convidado, id_evento } = req.params;
    await guestService.removeGuest(id_convidado, id_evento);
    res.status(204).send();
}

module.exports = {
    getAllByEvento,
    getAllConfirmados,
    invite,
    confirmAttendence,
    removeGuest
}
