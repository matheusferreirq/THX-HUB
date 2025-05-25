const guestService = require('../services/guestService');

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
    const convite = await guestService.invite({ id_convidado, id_evento });
    if (convite) res.json(convite);
    else res.status(404).json({ message: "Evento ou usuário não encontrados" });
}


const confirmAttendence = async (req, res) => {
    const { id_convidado, id_evento } = req.params;
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
