CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha TEXT NOT NULL,
  apelido_eventual TEXT
);

CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(50) NOT NULL,
  descricao TEXT,
  local TEXT NOT NULL,
  data_hora_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  data_hora_fim TIMESTAMP WITH TIME ZONE NOT NULL,
  limite_convidados INTEGER NOT NULL 
);

CREATE TABLE IF NOT EXISTS organizadores_eventos (
  id SERIAL PRIMARY KEY,
  papel VARCHAR(20),
  id_usuario INT,
  id_evento INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_evento) REFERENCES eventos(id) ON DELETE CASCADE,
  UNIQUE (id_usuario, id_evento)
);

CREATE TABLE IF NOT EXISTS convidados_evento (
  id SERIAL PRIMARY KEY,
  confirmado BOOLEAN DEFAULT FALSE,
  data_confirmacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  id_evento INT,
  id_convidado INT,
  FOREIGN KEY (id_evento) REFERENCES eventos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_convidado) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE (id_convidado, id_evento)
);

CREATE TABLE mensagens_evento (
  id SERIAL PRIMARY KEY,
  id_evento INT NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  id_usuario INT REFERENCES usuarios(id) ON DELETE SET NULL,
  conteudo TEXT NOT NULL,
  data_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

