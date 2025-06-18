    const db = require('./src/config/db');

    async function seed() {
    try {

        // Usuários
        await db.query(`
        INSERT INTO usuarios (username, nome, email, senha, apelido_eventual) VALUES
        ('ana.costa', 'Ana Paula Costa', 'ana@example.com', '$2b$10$qrstuvwxyzabcdefghijk', NULL),
        ('joao.souza', 'João Souza', 'joao@example.com', '$2b$10$mnopqrstuabcdefhijklm', null),
        ('mariana;lima', 'Mariana Lima', 'mariana@example.com', '$2b$10$zxcvbnmasdfghjklqwer', null),
        ('carlos.edu', 'Carlos Eduardo', 'carlos@example.com', '$2b$10$lkjhgfdsapoiuytrewq', NULL);
        `);

        // Eventos
        await db.query(`
        INSERT INTO eventos (titulo, descricao, local, data_hora_inicio, data_hora_fim, limite_convidados) VALUES
        ('Festa de Aniversário', 'Festa surpresa para Matheus', 'Rua das Flores, 123', '2025-07-01 20:00:00-03', '2025-07-02 02:00:00-03', 50),
        ('Churrasco no Condomínio', 'Churrasco anual do condomínio', 'Área de lazer do condomínio', '2025-07-15 13:00:00-03', '2025-07-15 19:00:00-03', 100),
        ('Encontro de Programadores', 'Palestras e networking', 'Centro de Convenções', '2025-08-05 09:00:00-03', '2025-08-05 18:00:00-03', 200);
        `);

        // Organizadores
        await db.query(`
        INSERT INTO organizadores_eventos (papel, id_usuario, id_evento) VALUES
        ('Dono da casa', 1, 1),
        ('Organizador', 2, 1),
        ('Dono da casa', 1, 2),
        ('Organizador', 3, 3);
        `);

        // Convidados
        await db.query(`
        INSERT INTO convidados_evento (confirmado, data_confirmacao, id_evento, id_convidado) VALUES
        (TRUE, '2025-06-10 14:00:00-03', 1, 2),
        (TRUE, '2025-06-11 09:30:00-03', 1, 3),
        (FALSE, NULL, 2, 4),
        (TRUE, '2025-06-20 16:45:00-03', 3, 5);
        `);

        // Mensagens
        await db.query(`
        INSERT INTO mensagens_evento (id_evento, id_usuario, conteudo, data_envio) VALUES
        (1, 1, 'Bem-vindos à festa! Conto com a presença de todos.', '2025-06-25 18:00:00-03'),
        (1, 2, 'Obrigado pelo convite, estou confirmando minha presença!', '2025-06-26 10:00:00-03'),
        (3, 3, 'Alguém sabe se vai ter material das palestras depois?', '2025-06-27 15:30:00-03'),
        (2, NULL, 'Local incrível, não vejo a hora!', '2025-06-28 20:00:00-03');
        `);

        console.log('Seeds inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir seeds:', error);
    } finally {
        db.end();
    }
    }

    seed();
