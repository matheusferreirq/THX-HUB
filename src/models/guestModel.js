class Convidados {
    constructor( {id=null, confirmado, data_confirmacao, id_evento, id_convidado} ) {
        this.id = id;
        this.confirmado = confirmado;
        this.data_confirmacao = data_confirmacao;
        this.id_evento = id_evento;
        this.id_convidado = id_convidado;
    }
}

module.exports = Convidados