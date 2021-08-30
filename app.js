const quadrante1 = $('#um');
const quadrante2 = $('#dois');
const quadrante3 = $('#tres');
const quadrante4 = $('#quatro');
const quadrante5 = $('#cinco');
const quadrante6 = $('#seis');
const quadrante7 = $('#sete');
const quadrante8 = $('#oito');
const quadrante9 = $('#nove');

const sequencia = [];

const validador = {
   row1: {
      1: '1',
      2: '2',
      3: '3'
   },
   row2: {
      4: '4',
      5: '5',
      6: '6'
   },
   row3: {
      7: '7',
      8: '8',
      9: '9'
   }
};


function marcarQuadrante(posicao) {
   // inicializaVariaveis();
   let renderDiv = verificaPosicao(posicao); //identifica a div que será renderizado o 'X' ou a 'O'
   let bolinhaOuX = verificarSequencia(sequencia); //identifica se é pra renderizar um 'X' ou uma 'O'
   let row = verificaRow(posicao); //identifica qual a row do obj 'validador' será trocado o valor

   alterarHTML(renderDiv, bolinhaOuX); // renderiza o 'X' ou a 'O' no quadrante correto
   sequencia.push(bolinhaOuX); //adiciona na última posição o 'X' ou a 'O'

   validador[row][posicao] = bolinhaOuX; //altera o valor
   let fimJogo = verificarVitoria(); //verifica se ocorreu fim de jogo

   if (fimJogo) {
      alert('vitoria do: ' + bolinhaOuX);
   }
   if (sequencia.length == 9) {
      alert('Empate');
   }
}

function verificaPosicao(posicao) {
   if (posicao == '1') {
      return quadrante1;
   }
   else if (posicao == '2') {
      return quadrante2;
   }
   else if (posicao == '3') {
      return quadrante3;
   }
   else if (posicao == '4') {
      return quadrante4;
   }
   else if (posicao == '5') {
      return quadrante5;
   }
   else if (posicao == '6') {
      return quadrante6;
   }
   else if (posicao == '7') {
      return quadrante7;
   }
   else if (posicao == '8') {
      return quadrante8;
   }
   else {
      return quadrante9;
   }
}

function verificarSequencia(sequencia) {
   tamanho = sequencia.lenght;
   if (tamanho == 0) {
      return 'x'; //caso seja a primeira jogada
   }
   else if (sequencia[tamanho] == 'x') {
      return 'o'; //se a ultima jogada foi x
   }
   else if (sequencia[tamanho] == 'o') {
      return 'x'; //se a ultima jogada foi o
   }

}

function verificaRow(posicao) {
   if (posicao == '1' || posicao == '2' || posicao == '3') {
      return 'row1';
   }
   else if (posicao == '4' || posicao == '5' || posicao == '6') {
      return 'row2';
   }
   else {
      return 'row3';
   }
}

function verificarVitoria() {
   //vitoria pelas linhas
   if (validador.row1[1] == validador.row1[2] && validador.row1[1] == validador.row1[3]) { //primeira linha
      return true;
   }
   else if (validador.row2[4] == validador.row2[5] && validador.row2[4] == validador.row2[6]) { //segunda linha
      return true;
   }
   else if (validador.row3[7] == validador.row3[8] && validador.row3[7] == validador.row3[9]) { //terceira linha
      return true;
   }
   //vitoria pelas colunas
   else if (validador.row1[1] == validador.row2[4] && validador.row1[1] == validador.row3[7]) { //primeira coluna
      return true;
   }
   else if (validador.row1[2] == validador.row2[5] && validador.row1[2] == validador.row3[8]) { //segunda coluna
      return true;
   }
   else if (validador.row1[3] == validador.row2[6] && validador.row1[3] == validador.row3[9]) { //terceira coluna
      return true;
   }
   //vitoria pelas diagonais
   else if (validador.row1[1] == validador.row2[5] && validador.row1[1] == validador.row3[9]) { //diagonal descendo
      return true;
   }
   else if (validador.row1[3] == validador.row2[5] && validador.row1[3] == validador.row3[7]) { //diagonal subindo
      return true;
   }
   //não acabou
   else {
      return false;
   }
}

function alterarHTML(renderDiv, bolinhaOuX) {
   let divX = $('#X');
   let divO = $('#O');

   if (bolinhaOuX == 'x') {
      $(renderDiv).html(divX);
   }
   else {
      $(renderDiv).html(divO);
   }
}