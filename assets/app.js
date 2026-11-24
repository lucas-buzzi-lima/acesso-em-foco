/* ==========================================================
   Acesso em Foco - JavaScript
   1. Avisos para leitores de tela
   2. Tamanho do texto (A-, A+, Padrão)
   3. Modo escuro e alto contraste
   4. Menu em telas pequenas
   5. Checklist
   6. Quiz
   ========================================================== */

// Avisa o CSS de que o JavaScript está funcionando
document.documentElement.classList.add('js');

/* 1. Avisos ------------------------------------------------- */
// O parágrafo #anuncios tem role="status": o leitor de tela lê o que for escrito nele.
function anunciar(texto) {
  var regiao = document.getElementById('anuncios');
  regiao.textContent = '';
  setTimeout(function () {
    regiao.textContent = texto;
  }, 100);
}

// A barra de preferências começa escondida (hidden) e só aparece com JavaScript,
// assim ninguém vê botões que não funcionariam.
document.getElementById('preferencias').hidden = false;

/* 2. Tamanho do texto --------------------------------------- */
var tamanhos = [87.5, 100, 112.5, 125, 137.5, 150];
var posicaoPadrao = 1; // 100%
var posicao = Number(localStorage.getItem('aef-fonte'));

if (!localStorage.getItem('aef-fonte') || !tamanhos[posicao]) {
  posicao = posicaoPadrao;
}

var botaoDiminuir = document.querySelector('[data-fonte="diminuir"]');
var botaoAumentar = document.querySelector('[data-fonte="aumentar"]');
var botaoPadrao = document.querySelector('[data-fonte="padrao"]');

function textoDoTamanho() {
  return String(tamanhos[posicao]).replace('.', ',') + '%';
}

function aplicarTamanho() {
  document.documentElement.style.fontSize = tamanhos[posicao] + '%';
  document.getElementById('valor-fonte').textContent = textoDoTamanho();
  // aria-disabled avisa que o limite chegou, sem tirar o foco do botão
  botaoDiminuir.setAttribute('aria-disabled', posicao === 0);
  botaoAumentar.setAttribute('aria-disabled', posicao === tamanhos.length - 1);
}

function mudarTamanho(novaPosicao) {
  if (novaPosicao < 0) {
    anunciar('O texto já está no tamanho mínimo.');
  } else if (novaPosicao >= tamanhos.length) {
    anunciar('O texto já está no tamanho máximo.');
  } else {
    posicao = novaPosicao;
    localStorage.setItem('aef-fonte', posicao);
    aplicarTamanho();
    anunciar('Tamanho do texto: ' + textoDoTamanho());
  }
}

botaoDiminuir.addEventListener('click', function () {
  mudarTamanho(posicao - 1);
});

botaoAumentar.addEventListener('click', function () {
  mudarTamanho(posicao + 1);
});

botaoPadrao.addEventListener('click', function () {
  mudarTamanho(posicaoPadrao);
});

aplicarTamanho();

/* 3. Modo escuro e alto contraste --------------------------- */
var botaoEscuro = document.getElementById('botao-escuro');
var botaoContraste = document.getElementById('botao-contraste');
var escuroLigado = localStorage.getItem('aef-tema') === 'escuro';
var contrasteLigado = localStorage.getItem('aef-contraste') === 'alto';

function aplicarCores() {
  if (escuroLigado) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (contrasteLigado) {
    document.documentElement.setAttribute('data-contrast', 'high');
  } else {
    document.documentElement.removeAttribute('data-contrast');
  }

  // aria-pressed informa ao leitor de tela se o botão está ligado
  botaoEscuro.setAttribute('aria-pressed', escuroLigado);
  botaoContraste.setAttribute('aria-pressed', contrasteLigado);
}

botaoEscuro.addEventListener('click', function () {
  escuroLigado = !escuroLigado;
  localStorage.setItem('aef-tema', escuroLigado ? 'escuro' : 'claro');
  aplicarCores();
  anunciar(escuroLigado ? 'Modo escuro ativado.' : 'Modo escuro desativado.');
});

botaoContraste.addEventListener('click', function () {
  contrasteLigado = !contrasteLigado;
  localStorage.setItem('aef-contraste', contrasteLigado ? 'alto' : 'normal');
  aplicarCores();
  anunciar(contrasteLigado ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
});

aplicarCores();

/* 4. Menu em telas pequenas --------------------------------- */
var botaoMenu = document.querySelector('.menu-botao');
var menu = document.getElementById('menu-principal');

botaoMenu.hidden = false;

function abrirOuFecharMenu(abrir) {
  botaoMenu.setAttribute('aria-expanded', abrir);
  if (abrir) {
    menu.classList.add('aberto');
  } else {
    menu.classList.remove('aberto');
  }
}

botaoMenu.addEventListener('click', function () {
  var estaAberto = botaoMenu.getAttribute('aria-expanded') === 'true';
  abrirOuFecharMenu(!estaAberto);
});

// A tecla Esc fecha o menu e devolve o foco para o botão
menu.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') {
    abrirOuFecharMenu(false);
    botaoMenu.focus();
  }
});

/* 5. Checklist (só existe no Guia prático) ------------------ */
var checklist = document.getElementById('checklist');

if (checklist) {
  var itens = checklist.querySelectorAll('input[type="checkbox"]');
  var salvos = localStorage.getItem('aef-checklist') || '';

  // Marca de novo os itens que estavam salvos
  itens.forEach(function (item) {
    item.checked = salvos.includes(item.value);
  });

  function atualizarChecklist() {
    var marcados = [];
    itens.forEach(function (item) {
      if (item.checked) {
        marcados.push(item.value);
      }
    });

    var porcentagem = Math.round(marcados.length / itens.length * 100);
    var frase = marcados.length + ' de ' + itens.length + ' itens verificados (' + porcentagem + '%).';
    if (marcados.length === itens.length) {
      frase = frase + ' Checklist completo!';
    }

    // #checklist-status tem role="status", então a frase é lida automaticamente
    document.getElementById('checklist-status').textContent = frase;
    document.getElementById('checklist-barra').value = marcados.length;
    localStorage.setItem('aef-checklist', marcados.join(','));
  }

  checklist.addEventListener('change', atualizarChecklist);

  // O botão "Desmarcar" é do tipo reset: espera o formulário limpar e atualiza
  checklist.addEventListener('reset', function () {
    setTimeout(atualizarChecklist, 0);
  });

  atualizarChecklist();
}

/* 6. Quiz (só existe no Guia prático) ----------------------- */
var quiz = document.getElementById('quiz');

// Resposta certa e explicação de cada pergunta
var gabarito = {
  q1: { certa: 'b', explicacao: 'O elemento <button> já recebe foco, funciona com Enter e Espaço e é anunciado como botão. Uma <div> com clique não faz nada disso sozinha.' },
  q2: { certa: 'a', explicacao: 'O alt vazio indica que a imagem é decorativa, e o leitor de tela a ignora. Sem o atributo alt, alguns leitores leem o nome do arquivo.' },
  q3: { certa: 'b', explicacao: 'No nível AA da WCAG, texto em tamanho normal precisa de contraste mínimo de 4,5:1 com o fundo. Texto grande pode usar 3:1.' },
  q4: { certa: 'c', explicacao: 'O piso tátil direcional forma uma linha-guia. O piso de alerta avisa sobre mudanças, como o início de uma escada ou de uma travessia.' },
  q5: { certa: 'b', explicacao: 'A legenda para surdos e ensurdecidos descreve os sons que ajudam a entender a cena, além de mostrar quem está falando.' }
};

var perguntas = ['q1', 'q2', 'q3', 'q4', 'q5'];

function limparQuiz() {
  perguntas.forEach(function (nome) {
    document.getElementById(nome + '-grupo').classList.remove('com-erro');
    document.getElementById(nome + '-erro').hidden = true;
    var retorno = document.getElementById(nome + '-retorno');
    retorno.hidden = true;
    retorno.className = 'feedback';
    retorno.textContent = '';
  });
  var resultado = document.getElementById('quiz-resultado');
  resultado.className = 'mensagem';
  resultado.innerHTML = '';
}

if (quiz) {
  var resultado = document.getElementById('quiz-resultado');

  quiz.addEventListener('submit', function (evento) {
    evento.preventDefault(); // não recarrega a página
    limparQuiz();

    // 1º passo: descobrir quais perguntas ficaram sem resposta
    var faltando = [];
    perguntas.forEach(function (nome) {
      var marcada = quiz.querySelector('input[name="' + nome + '"]:checked');
      if (!marcada) {
        faltando.push(nome);
        document.getElementById(nome + '-grupo').classList.add('com-erro');
        document.getElementById(nome + '-erro').hidden = false;
      }
    });

    if (faltando.length > 0) {
      var lista = '';
      faltando.forEach(function (nome) {
        lista += '<li>' + document.querySelector('#' + nome + '-grupo legend').textContent + '</li>';
      });
      resultado.className = 'mensagem mensagem--erro';
      resultado.innerHTML = '<h3>Faltam ' + faltando.length + ' resposta(s)</h3>' +
        '<p>Responda estas perguntas e envie de novo:</p><ul>' + lista + '</ul>';
      resultado.focus(); // o leitor de tela lê a mensagem
      return;
    }

    // 2º passo: corrigir cada pergunta e mostrar a explicação
    var acertos = 0;
    perguntas.forEach(function (nome) {
      var escolhida = quiz.querySelector('input[name="' + nome + '"]:checked').value;
      var certa = gabarito[nome].certa;
      var textoCerto = document.querySelector('label[for="' + nome + '-' + certa + '"]').textContent;
      var retorno = document.getElementById(nome + '-retorno');
      var titulo = document.createElement('strong');
      var explicacao = document.createElement('span');

      if (escolhida === certa) {
        acertos++;
        retorno.className = 'feedback feedback--certo';
        titulo.textContent = '✔ Resposta correta.';
      } else {
        retorno.className = 'feedback feedback--errado';
        titulo.textContent = '✘ Resposta incorreta. A certa é: ' + textoCerto + '.';
      }

      explicacao.textContent = gabarito[nome].explicacao;
      retorno.appendChild(titulo);
      retorno.appendChild(explicacao);
      retorno.hidden = false;
    });

    resultado.className = 'mensagem mensagem--sucesso';
    resultado.innerHTML = '<h3>Resultado: você acertou ' + acertos + ' de ' + perguntas.length + ' perguntas</h3>' +
      '<p>Veja a explicação abaixo de cada pergunta.</p>';
    resultado.focus();
  });

  quiz.addEventListener('reset', function () {
    limparQuiz();
    anunciar('Quiz reiniciado.');
  });
}
