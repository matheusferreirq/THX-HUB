const organizerRepository = require('../repositories/organizerRepository');

class OrganizerService {
    getAll() {
        return organizerRepository.findAll();
    };

    getByUsuario(id_usuario) {
        return organizerRepository.findByUsuario(id_usuario);
    };

    getByEvento(id_evento) {
        return organizerRepository.findByEvento(id_evento)
    }

    create(data) {
        return organizerRepository.create(data);
    };

    updatePapel(id_usuario, id_evento, novoPapel) {
        return organizerRepository.updatePapel(id_usuario, id_evento, novoPapel);
    };

    deleteByUsuarioAndEvent (id_usuario, id_evento) {
        return organizerRepository.deleteByUsuarioAndEvent(id_usuario, id_evento);
    };
}

module.exports = new OrganizerService();