const guestRepository = require('../repositories/guestRepository');

class GuestService {
    getAllByEvento(id_evento) {
        return guestRepository.getAllByEvento(id_evento);
    }

    getAllConfirmados(id_evento) {
        return guestRepository.getAllConfirmados(id_evento);
    }

    invite(data) {
        const { id_convidado, id_evento } = data;
        return guestRepository.invite(id_convidado, id_evento);
    }

    confirmAttendence(id_convidado, id_evento) {
        return guestRepository.confirmAttendence(id_convidado, id_evento);
    }

    removeGuest(id_convidado, id_evento){ 
        return guestRepository.deleteGuest(id_convidado, id_evento);
    }
}

module.exports = new GuestService();