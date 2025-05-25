class Organizadores {
    constructor( {id = null, papel, id_usuario, id_evento}) {
        this.id = id;
        this.papel = papel;
        this.id_usuario = id_usuario;
        this.id_evento = id_evento;
    }
}

module.exports = Organizadores