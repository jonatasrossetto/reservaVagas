# Readme

UNISENAI <br>
DESENVOLVIMENTO WEB <br>
DESAFIO 1 <br>
SETEMBRO/2023 <br>
JONATAS ROSSETTO

**_ Objetivo _** <br>

Desenvolver um sistema de Frontend para um sistema de estacionamento com pelo menos 2 telas:

- tela para cadastro de veículos e vagas
- tela para exibir relatório de vagas

Limitado ao uso de HTML, CSS e JavaScript Vannila.

- Dessa forma, a tarefa consiste em construir duas telas: listar vagas e cadastro de reserva. Na tela de listar, podem ser utilizadas informações fictícias, uma vez que nossa aplicação front-end não Desenvolvimento de Webpossui um back-end para implementação dos cadastros em banco de dados e retorno de informações cadastradas.
- A tela de cadastro deve conter um formulário com as informações descritas no começo e um botão de salvar. Ao clicar nesse botão, as informações do formulário deverão ser exibidas em um console.log, e um pop-up com a mensagem de confirmação de cadastro realizado com sucesso.

**_ Oque será implementado _** <br>

- A idéia é fazer um sistema SPA sem frameworks, utilizando divs para isolar as páginas que serão roteadas com o auxílio de um menu superior sempre presente no app.
- Os estilos serão organizados em um arquivo CSS.
- Um controller em javascript será responsável por controlar o display das rotas.
- Um controller em javascript será responsável por gerenciar os dados da tela de cadastro, vamos utilizar o session storage para persistência dos dados.
- Um controller em javascript será responsável pela exibição do relatório.