# ChatApp
Backend do aplicativo web de chat em tempo real desenvolvido para um desafio.
O app consiste basicamente de enviar e receber mensagens em tempo real em uma espécie de "grupo público", 
os usuários do tipo administrador podem, além de enviar e receber mensagens, filtrar e apagar mensagens de outros usuários.

![](https://github.com/jbsaraiva/chat-app-frontend/blob/master/public/screenshots/chatscreen.png)

# O projeto
- [frontend](https://github.com/jbsaraiva/chat-app-frontend)
- [backend](https://github.com/jbsaraiva/chat-app-backend)

# Instalação

```
> npm install
```

# Inicialização

```
> npm start
```

# Requisitos 
- [x] Cadastro como participante ou administrador.
- [x] Cadastro com password
- [x] Autenticação via jwt 
### Participante
- [x] Enviar e receber mensagens
- [x] Visualizar os usuários online
### Administrador
- [x] Enviar e receber mensagens.
- [x] Filtrar as mensagens por (autor, data de envio)
- [x] Ordenar as mensagens por data de envio
  - [x] Ordem crescente (padrão)
  - [x] Ordem decrescente.
  - [x] Apagar as mensagens do próprio ou de outros usuários.


# Próximas etapas
- [ ] Fazer um melhor gerenciamento de erros que ocorrem quando o servidor está off.
- [ ] Remover o token salvo no LocalStorage quando houver algum erro de autenticação.

# Author
José Vinícius - [josevsaraiva@gmail.com](josevsaraiva@gmail.com)

# Principais tecnologias utilizadas
- React js
- Redux
- Apollo Client
- GraphQL
