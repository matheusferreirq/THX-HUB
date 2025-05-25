class Usuarios {
    constructor( { id = null, nome, email, senha, apelido_eventual} ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.apelido_eventual = apelido_eventual;
    }
};

module.exports = Usuarios