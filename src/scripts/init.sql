CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  apelido_eventual TEXT
);

CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(50) NOT NULL,
  descricao TEXT,
  local TEXT NOT NULL,
  data_hora_inicio TIMESTAMP NOT NULL,
  data_hora_fim TIMESTAMP NOT NULL,
  limite_convidados INTEGER NOT NULL 
);

CREATE TABLE IF NOT EXISTS organizadores_eventos (
  id SERIAL PRIMARY KEY,
  papel VARCHAR(20),
  id_usuario INT,
  id_evento INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_evento) REFERENCES eventos(id)
);

CREATE TABLE IF NOT EXISTS convidados_evento (
  id SERIAL PRIMARY KEY,
  confirmado BOOLEAN DEFAULT FALSE,
  data_confirmacao TIMESTAMP,
  id_evento INT,
  id_convidado INT,
  FOREIGN KEY (id_evento) REFERENCES eventos(id),
  FOREIGN KEY (id_convidado) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS inscricoes (
  id SERIAL PRIMARY KEY,
  codigo_inscricao TEXT,
  checkin_realizado BOOLEAN DEFAULT FALSE,
  data_checkin TIMESTAMP,
  id_evento INT,
  id_convidado INT,
  FOREIGN KEY (id_evento) REFERENCES eventos(id),
  FOREIGN KEY (id_convidado) REFERENCES usuarios(id)
)

