//********************************************** */
//declacarações de variáveis para manipular o DOM
const telaCadastro = document.getElementById('tela_cadastro');
const telaRelatorioOcupadas = document.getElementById(
  'tela_relatorio_ocupadas'
);
const telaRelatorioLivres = document.getElementById('tela_relatorio_livres');
const quantidadeVagasDisponiveis = document.getElementById(
  'quantidade_vagas_disponiveis'
);
const placaVeiculo = document.getElementById('placa_veiculo');
const nomeProprietario = document.getElementById('nome_proprietario');
const numeroApartamento = document.getElementById('numero_apartamento');
const modeloVeiculo = document.getElementById('modelo_veiculo');
const corVeiculo = document.getElementById('cor_veiculo');
const botaoCadastrar = document.getElementById('botao_cadastrar');
const vagaEscolhida = document.getElementById('vaga_escolhida');

//********************************************** */
//**MODELOS E ENTIDADES SOBRE O DOMÍNIO */

//classe com modelo para armazenar os dados da reserva
class DadosReserva {
  constructor(placa, proprietario, apartamento, modelo, cor, numeroVaga) {
    this.placa = placa;
    this.proprietario = proprietario;
    this.apartamento = apartamento;
    this.modelo = modelo;
    this.cor = cor;
    this.vaga = Number.parseInt(numeroVaga);
  }

  toString() {
    return `placa: ${this.placa}\nproprietario: ${this.proprietario}\napartamento: ${this.apartamento}\nmodelo: ${this.modelo}\ncor: ${this.cor}\nvaga: ${this.vaga}`;
  }

  dadosValidos() {
    console.log(isNaN(this.numeroVaga));
    if (
      !this.placa ||
      !this.proprietario ||
      !this.apartamento ||
      !this.modelo ||
      !this.cor ||
      isNaN(this.vaga)
    ) {
      return false;
    }
    return true;
  }
}

//classe com modelo para gerenciar as vagas do estacionamento
class Vagas {
  _statusDaVaga = [];
  _vagasReservadas = [];

  constructor(quantidadeVagas) {
    if (isNaN(quantidadeVagas) || quantidadeVagas < 1) {
      throw new Error('Quantidade de vagas inválida');
    }
    for (let i = 0; i < quantidadeVagas; i++) {
      this._statusDaVaga.push(false);
    }
  }

  estaDisponivel(numeroVaga) {
    return !this._statusDaVaga[numeroVaga];
  }

  reservarVaga(dadosReserva) {
    console.log('dados validos:' + dadosReserva.dadosValidos());
    if (!this.estaDisponivel(dadosReserva.vaga)) {
      alert('Vaga já reservada');
      return false;
    }
    if (!dadosReserva.dadosValidos()) {
      alert('Por favor preencha todos os campos do formulário');
      return false;
    }
    this._statusDaVaga[dadosReserva.vaga] = true;
    this._vagasReservadas.push(dadosReserva);
    return true;
  }

  listaVagasDisponiveis() {
    let vagasDisponiveis = [];
    for (let i = 0; i < this._statusDaVaga.length; i++) {
      if (!this._statusDaVaga[i]) {
        vagasDisponiveis.push(i);
      }
    }
    return vagasDisponiveis;
  }

  listaDeVagasReservadas() {
    return this._vagasReservadas.sort((a, b) => a.vaga - b.vaga);
  }

  apagarReserva(indice) {
    console.log('apagando reserva:' + indice);
    this._statusDaVaga[this._vagasReservadas[indice].vaga] = false;
    this._vagasReservadas.splice(indice, 1);
    console.log(this.listaDeVagasReservadas());
  }

  status() {
    return this._statusDaVaga;
  }
}

//********************************************** */
//** INICIALIZAÇÃO DO APP*/

//cria instancia de vagas de garagem com 10posições para veículos
let vagas = new Vagas(10);

inicializaDadosExemplo();
atualizarVagasDisponiveis(vagas);
atualizarQuantidadeVagasDisponiveis(vagas);

//********************************************** */
//** EVENT LISTENERS */

//cria event listener para o botão de cadastrar
botao_cadastrar.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('clicou em botao_cadastrar');
  let dado = new DadosReserva(
    placaVeiculo.value,
    nomeProprietario.value,
    numeroApartamento.value,
    modeloVeiculo.value,
    corVeiculo.value,
    vagaEscolhida.value
  );
  let reservaRealizada = vagas.reservarVaga(dado);
  if (reservaRealizada) {
    alert('Reserva realizada com sucesso');
    atualizarVagasDisponiveis(vagas);
    atualizarRelatorioVagasOcupadas(vagas);
    atualizarQuantidadeVagasDisponiveis(vagas);
    console.log(dado.toString());
    limparFormulario();
  }
});

//cria event listener para os botões de navegação - tela de cadastro
telaCadastro.addEventListener('click', () => {
  console.log('clicou em tela_cadastro');
  atualizarQuantidadeVagasDisponiveis(vagas);
  limparFormulario();
  displayRota('block', 'none', 'none');
});

//cria event listener para os botões de navegação - tela de relatórios
telaRelatorioOcupadas.addEventListener('click', () => {
  console.log('clicou em tela_relatorio');
  atualizarQuantidadeVagasDisponiveis(vagas);
  displayRota('none', 'block', 'none');
  atualizarRelatorioVagasOcupadas(vagas);
  limparFormulario();
});

telaRelatorioLivres.addEventListener('click', () => {
  console.log('clicou em tela_relatorio_livres');
  atualizarQuantidadeVagasDisponiveis(vagas);
  displayRota('none', 'none', 'block');
  atualizarRelatorioVagasLivres(vagas);
  limparFormulario();
});

//********************************************** */
//** FUNÇÕES AUXILIARES */

//cria dados de exemplo para popular o relatório inicial
function inicializaDadosExemplo() {
  vagas.reservarVaga(
    new DadosReserva('ABC-1234', 'João', '101', 'Fiat Uno', 'Preto', 3)
  );
  vagas.reservarVaga(
    new DadosReserva('BBB-1234', 'Maria', '202', 'Hb20', 'Preto', 7)
  );
}

//atualiza o select de vagas disponíveis
function atualizarVagasDisponiveis(vagas) {
  const htmlVagasDisponiveis = document.getElementById('vagas_disponiveis');
  const listaDeVagasDisponiveis = vagas.listaVagasDisponiveis();
  htmlVagasDisponiveis.innerHTML = '';
  listaDeVagasDisponiveis.forEach((element) => {
    htmlVagasDisponiveis.innerHTML +=
      '<option value="' + element + '"></option>';
  });
}

//limpa os dados do formulário de cadastro
function limparFormulario() {
  placaVeiculo.value = '';
  nomeProprietario.value = '';
  numeroApartamento.value = '';
  modeloVeiculo.value = '';
  corVeiculo.value = '';
  vagaEscolhida.value = '';
}

//apaga uma reserva de vaga
function apagarReserva(indice) {
  vagas.apagarReserva(indice);
  atualizarQuantidadeVagasDisponiveis(vagas);
  atualizarVagasDisponiveis(vagas);
  limparFormulario();
  atualizarRelatorioVagasOcupadas(vagas);
}

//atualiza os dados apresentados no relatório de vagas
function atualizarRelatorioVagasOcupadas(vagas) {
  const htmlTabelaRelatorioVagas = document.getElementById(
    'tabela_relatorio_vagas'
  );
  htmlTabelaRelatorioVagas.innerHTML = '';
  htmlTabelaRelatorioVagas.innerHTML +=
    '<tr><th>Vaga</th><th>Proprietário</th><th>Apartamento</th><th>Placa</th><th>Ação</th></tr>';
  let vagasReservadas = vagas.listaDeVagasReservadas();
  vagasReservadas.forEach((element, index) => {
    htmlTabelaRelatorioVagas.innerHTML +=
      '<tr><td>' +
      element.vaga +
      '</td><td>' +
      element.proprietario +
      '</td><td>' +
      element.apartamento +
      '</td><td>' +
      element.placa +
      '</td><td> <button onclick="apagarReserva(' +
      index +
      ');" class="botao_pequeno">apagar</button></td></tr>';
  });
}

//atualiza os dados apresentados no relatório de vagas
function atualizarRelatorioVagasLivres(vagas) {
  const htmlTabelaRelatorioVagas = document.getElementById(
    'tabela_relatorio_vagas_livres'
  );
  htmlTabelaRelatorioVagas.innerHTML = '';
  htmlTabelaRelatorioVagas.innerHTML +=
    '<tr><th>Vaga</th><th>Situação</th></tr>';
  let status = vagas.status();
  status.forEach((element, index) => {
    htmlTabelaRelatorioVagas.innerHTML +=
      '<tr><td>' +
      index +
      '</td><td>' +
      (element ? 'ocupada' : 'livre') +
      '</td></tr>';
  });
}

//atualiza o display da quantidade de vagas disponíveis
function atualizarQuantidadeVagasDisponiveis(vagas) {
  quantidadeVagasDisponiveis.innerHTML =
    'Quantidade de vagas disponíveis: ' + vagas.listaVagasDisponiveis().length;
}

function displayRota(cadastro, relatorioOcupadas, relatorioLivres) {
  document.getElementById('cadastro_reserva').style.display = cadastro;
  document.getElementById('relatorio_ocupadas').style.display =
    relatorioOcupadas;
  document.getElementById('relatorio_livres').style.display = relatorioLivres;
}
