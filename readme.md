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

- Dessa forma, a tarefa consiste em construir duas telas: listar vagas e cadastro de reserva. Na tela de listar, podem ser utilizadas informações fictícias.
- A tela de cadastro deve conter um formulário com as informações descritas no começo e um botão de salvar. Ao clicar nesse botão, as informações do formulário deverão ser exibidas em um console.log, e um pop-up com a mensagem de confirmação de cadastro realizado com sucesso.

**_ Oque está implementado _** <br>

- A idéia foi criar um sistema SPA simples sem frameworks, utilizando divs para isolar as telas que serão roteadas com o auxílio de um menu superior sempre presente no app. O arquivo HTML, neste caso único, representa a camada de views.
- Os estilos estão organizados em um arquivo CSS.
- Em js temos uma classe DadosReserva que administra os dados de uma reserva e uma classe Vagas que administra o conjunto de vagas (esta seria a camada de modelos/entidades)
- Uma série de listeners controlam as ações de mudar de tela e de realizar o cadastro de uma vaga ou apagar uma vaga cadastrada (esta seria a camada de controllers).
- Na tela de cadastro o campo "Número da Vaga" apresenta apenas a lista de vagas livres.
- O relatório de vagas ocupadas permite apagar uma reserva de vaga

**_ Como executar o aplicativo _** <br>

- Download dos arquivos do repositório em uma única pasta
- Abrir o arquivo index.html no navegador (na etapa de desenvolvimento utiizamos o Chrome para os testes)
- Apenas como exemplo o app inicia com duas vagas já cadastradas para popular os relatórios
