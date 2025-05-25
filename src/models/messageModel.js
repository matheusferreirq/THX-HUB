class Mensagens {
    constructor( { id = null, id_evento, id_usuario, conteudo, data_envio}) {
        this.id = id;
        this.id_evento = id_evento;
        this.id_usuario = id_usuario;
        this.conteudo = conteudo;
        this.data_envio = data_envio;
    };
}

module.exports = Mensagens;