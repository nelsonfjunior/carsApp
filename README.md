# Bem-vindo ao CarsApp 👋

Este aplicativo foi desenvolvido como parte de um desafio de desenvolvedor mobile. O objetivo é criar uma aplicação simples que permite o login de usuários e, após a autenticação, exibe uma lista de marcas de carros. Ao selecionar uma marca, o usuário pode ver todos os modelos de carros dessa marca.

## Tecnologias Utilizadas

- **Expo**: Framework para desenvolvimento de aplicativos React Native.
- **Typescript**: Linguagem de tipagem estática para maior segurança no código.
- **Context API**: Usado para gerenciar os dados de login.
- **AsyncStorage**: Armazenamento local para manter as informações de login.
- **React Navigation**: Biblioteca para navegação entre as telas do aplicativo.
- **Nativewind**: Usado para estilização da interface.
- **Fetch API**: Para consumir as APIs de login e dados dos carros.

## Funcionalidades

1. **Tela de Login (SignIn)**: Permite ao usuário fazer login utilizando credenciais.
2. **Tela Principal (Home)**: Exibe a lista de marcas de carros.
3. **Tela de Modelos (Model)**: Ao clicar em uma marca, o usuário é direcionado para a tela de modelos dessa marca.

## Como Iniciar

### 1. Instalar dependências

No terminal, execute o comando abaixo para instalar as dependências do projeto:

   ```bash
   npm install
   ```

### 2. Iniciar o projeto utilizando expo

   ```bash
    npx expo start
   ```
