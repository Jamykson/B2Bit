# B2Bit - Desafio Front-end

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Este projeto foi desenvolvido como parte do desafio técnico para a vaga de Desenvolvedor Front-end na B2Bit, utilizando ReactJS e TypeScript.

## ✨ Funcionalidades

O projeto implementa um fluxo completo de autenticação de usuário, incluindo:

-   **Tela de Login:** Interface para que o usuário insira suas credenciais.
-   **Conexão com API Real:** Realiza chamadas `POST` para autenticação.
-   **Feedback de Erros:** Exibe mensagens de erro específicas caso as credenciais estejam incorretas.
-   **Persistência de Sessão:** Utiliza `LocalStorage` para armazenar o token de acesso, mantendo o usuário conectado ao recarregar a página.
-   **Rotas Protegidas:** A página de perfil só é acessível para usuários autenticados.
-   **Página de Perfil:** Exibe os dados do usuário (`nome`, `e-mail` e `avatar`) buscados da API após o login ou ao carregar a página.
-   **Funcionalidade de Logout:** Permite que o usuário encerre sua sessão de forma segura.
-   **UI Interativa:** Animações sutis no botão de login e logout para feedback visual ao usuário.

## 🛠️ Tecnologias Utilizadas

-   **React** (com Hooks)
-   **TypeScript**
-   **Vite** como ambiente de desenvolvimento
-   **Tailwind CSS** para estilização
-   **React Router** para gerenciamento de rotas
-   **Axios** para as chamadas à API
-   **React Context API** para gerenciamento do estado de autenticação

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto. Como configuramos um proxy no Vite para evitar erros de CORS, o conteúdo dele será apenas:
    ```
    # Este arquivo não é necessário se a baseURL no axios for '/api'
    # Mas é uma boa prática tê-lo para outras variáveis no futuro.
    ```
    *Obs: A configuração do proxy já está no arquivo `vite.config.ts`.*

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou a porta que aparecer no seu terminal).

## 🌐 API

Este projeto consome os seguintes endpoints da API de homologação da CliqDrive:

-   **Login:** `POST /auth/login/`
-   **Perfil:** `GET /auth/profile/`

A `baseURL` utilizada é `https://api.homologation.cliqdrive.com.br`, acessada através de um proxy configurado no Vite para contornar políticas de CORS.

## 👨‍💻 Autor

Feito com ❤️ por **[SEU NOME AQUI]**

-   **LinkedIn:** [seu-linkedin]
-   **GitHub:** [seu-github]