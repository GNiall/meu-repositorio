DROP TABLE enderecos;

DROP TABLE usuarios;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  data_nascimento DATE NOT NULL
);

CREATE TABLE enderecos (
	id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  logradouro TEXT NOT NULL,
  cep INTEGER NOT NULL,
  numero INTEGER NOT NULL,
  cidade TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES usuarios(id)
);