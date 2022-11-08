<h1 align="center">
  API de autenticação utilizando TDD
</h1>


## 💻 O que é
  Uma API simples de autenticação utilizando TDD (Test Driven Development)
   

## 🔧 Tecnologias utilizadas
  Nesse projeto utilizei Node.js, Jest, JsonWebToken, Sequelize e PostgreSQL
   

## 🔖 Descrição
  Aplicação feita em Node com o proposito de estudar e aperfeiçoar meus conhecimentos com testes unitários, automatizados e coverage de testes com uma das maiores bibliotecas de testes do javascript: o [Jest](https://jestjs.io/pt-BR/)
  

## ⚡️ Endpoints:

	GET /dashboard - home dashboard (apenas para usuários autenticados)
  	POST /sessions - autenticação com nome, email e senha
  
## ✍️ Exemplo de autenticação:
	name: 'teste',
	email: 'teste@teste.com',
	password: '123456'
