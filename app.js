quadrante1 = $('#um');
quadrante2 = $('#dois');
quadrante3 = $('#tres');
quadrante4 = $('#quatro');
quadrante5 = $('#cinco');
quadrante6 = $('#seis');
quadrante7 = $('#sete');
quadrante8 = $('#oito');
quadrante9 = $('#nove');

sequencia = [];
historicoDeJogadas = [];

validador = {
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
   let renderDiv = verificaPosicao(posicao); //identifica a div que será renderizado o 'X' ou a 'O'
   // let bolinhaOuX = verificarSequencia(); //identifica se é pra renderizar um 'X' ou uma 'O'
   let bolinhaOuX = 'x';
   let row = verificaRow(posicao); //identifica qual a row do obj 'validador' será trocado o valor

   jogadaValida = verificaHistoricoJogadas(posicao);
   if (!jogadaValida) {
      alert('Jogada Inválida');
      return;
   }

   alterarHTML(renderDiv, bolinhaOuX); // renderiza o 'X' ou a 'O' no quadrante correto
   sequencia.push(bolinhaOuX); //adiciona na última posição o 'X' ou a 'O'

   validador[row][posicao] = bolinhaOuX; //altera o valor
   let fimJogo = verificarVitoria(); //verifica se ocorreu fim de jogo

   if (fimJogo) {
      terminarJogo(bolinhaOuX);
   }
   if (!fimJogo && sequencia.length == 9) {
      empate();
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

function verificarSequencia() {
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
      // $(renderDiv).html(divX);
      $(renderDiv).html('x');
      // $(renderDiv).css('background: url(img/x.png) no-repeat center;');
   }
   else {
      // $(renderDiv).html(divO);
      $(renderDiv).html('o');
      // $(renderDiv).css('background: url(img/O.jpg) no-repeat center;');
   }
}

function verificaHistoricoJogadas(posicao) {
   if (historicoDeJogadas.indexOf(posicao) != -1) {
      return false;
   }
   else {
      historicoDeJogadas.push(posicao);
      return true;
   }
}

function terminarJogo(vencedor) {
   let title = 'Parabéns, vitória do ' + vencedor;
   let icon = 'success';
   let textoConfirmacao = 'Reiniciar';
   let textoCancelamento = 'Sair';

   exibirAlertas(title, icon, true, textoConfirmacao, textoCancelamento);
}

function empate() {
   let title = 'Empate';
   let icon = 'warning';
   let textoConfirmacao = 'Reiniciar';
   let textoCancelamento = 'Sair';

   exibirAlertas(title, icon, true, textoConfirmacao, textoCancelamento);
}

function exibirAlertas(title, icon, showDenyButton = false, confirmButtonText, denyButtonText = '') {
   Swal.fire({
      title,
      icon,
      showDenyButton,
      confirmButtonText,
      denyButtonText,
   })
      .then((result) => {
         if (result.isConfirmed) {
            location.reload();
         }
      })
}