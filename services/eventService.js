const eventosRepository = require('../repositories/eventRepository')

class EventoService {
    getAll() {
        return eventosRepository.findAll();
    };

    getById(id) {
        return eventosRepository.findById(id);
    }

    create(data) {
        return eventosRepository.create(data);
    }

    update(id, data) {
        return eventosRepository.update(id,data);
    }

    delete(id) {
        return eventosRepository.delete(id)
    }
}

module.exports = new EventoService();