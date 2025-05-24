class Eventos {
    constructor( { id = null, titulo, descricao, local, data_hora_inicio, data_hora_final, limite_convidados}) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.local = local;
        this.data_hora_inicio = data_hora_inicio;
        this.data_hora_final = data_hora_final;
        this.limite_convidados = limite_convidados
    }
}

module.exports = Eventos