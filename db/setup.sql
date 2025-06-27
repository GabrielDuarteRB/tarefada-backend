-- Criar enum para o status da tarefa
CREATE TYPE status_tarefa AS ENUM ('não concluída', 'pendente', 'concluida', 'recusada');

-- Tabela de usuários
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    foto TEXT
);

-- Tabela de semanas
CREATE TABLE semana (
    id_semana SERIAL PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_previsao_fim DATE,
    data_fim DATE,
    criado_por INTEGER NOT NULL,
    FOREIGN KEY (criado_por) REFERENCES usuario(id_usuario)
);

-- Tabela de tarefas
CREATE TABLE tarefa (
    id_tarefa SERIAL PRIMARY KEY,
    id_usuario_atribuido INTEGER,
    titulo VARCHAR(200) NOT NULL,
    data DATE NOT NULL,
    ponto INTEGER,
    status status_tarefa,
    comprovante TEXT
    FOREIGN KEY (id_usuario_atribuido) REFERENCES usuario(id_usuario),
);

-- Associação tarefa <-> semana
CREATE TABLE tarefa_semana (
    id_tarefa_semana SERIAL PRIMARY KEY,
    id_tarefa INTEGER NOT NULL,
    id_semana INTEGER NOT NULL,
    FOREIGN KEY (id_tarefa) REFERENCES tarefa(id_tarefa),
    FOREIGN KEY (id_semana) REFERENCES semana(id_semana)
);

-- Associação semana <-> usuário
CREATE TABLE semana_usuario (
    id_semana_usuario SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_semana INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_semana) REFERENCES semana(id_semana)
);
