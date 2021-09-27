# api-market-list
API para projeto de faculdade. CRUD de uma lista de mercado

# Banco Utilizado
- PostgresSQL (Primeiramente será necessário instalar o mesmo em sua máquina)

# Config do Banco de Dados Utilizadas
```
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
```

# Criando Schema
CREATE SCHEMA market AUTHORIZATION postgres;

# Criando Tabela 
CREATE TABLE market.market_list (
	id serial NOT NULL,
	nome varchar(150) NOT NULL,
	valor numeric(7,2) NOT NULL
);

# Inicializando a API
No diretório raiz executar 
``` 
npm install 
npm start
```

