/* ==========================================================================
   Acesso em Foco — JavaScript do site
   Carregado com "defer" em todas as páginas. Partes:
   1. Armazenamento seguro (localStorage pode estar indisponível)
   2. Anúncios para leitores de tela (região aria-live)
   3. Tamanho do texto (A−, A+, Padrão)
   4. Modo escuro e alto contraste (aria-pressed)
   5. Menu em telas pequenas (aria-expanded)
   6. Checklist com progresso
   7. Quiz com correção e explicações
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');

  /* 1. Armazenamento ------------------------------------------------------ */
  function ler(chave) {
    try {
      return window.localStorage.getItem(chave);
    } catch (erro) {
      return null;
    }
  }

  function gravar(chave, valor) {
    try {
      window.localStorage.setItem(chave, valor);
    } catch (erro) {
      /* Sem armazenamento: a preferência vale só até recarregar a página. */
    }
  }

  /* 2. Anúncios ----------------------------------------------------------- */
  var regiaoAnuncio = document.getElementById('anuncios');

  function anunciar(texto) {
    if (!regiaoAnuncio) {
      return;
    }
    // Limpa antes para que a mesma frase seja lida de novo se repetida.
    regiaoAnuncio.textContent = '';
    window.setTimeout(function () {
      regiaoAnuncio.textContent = texto;
    }, 60);
  }

  /* 3. Tamanho do texto --------------------------------------------------- */
  var NIVEIS_FONTE = [87.5, 100, 112.5, 125, 137.5, 150];
  var NIVEL_PADRAO = 1;
  var nivelFonte = parseInt(ler('aef-fonte'), 10);

  if (isNaN(nivelFonte) || nivelFonte < 0 || nivelFonte >= NIVEIS_FONTE.length) {
    nivelFonte = NIVEL_PADRAO;
  }

  var botaoDiminuir = document.querySelector('[data-fonte="diminuir"]');
  var botaoAumentar = document.querySelector('[data-fonte="aumentar"]');
  var botaoPadrao = document.querySelector('[data-fonte="padrao"]');
  var valorFonte = document.getElementById('valor-fonte');

  function aplicarFonte() {
    var percentual = NIVEIS_FONTE[nivelFonte];
    raiz.style.fontSize = percentual + '%';
    if (valorFonte) {
      valorFonte.textContent = String(percentual).replace('.', ',') + '%';
    }
    // aria-disabled mantém o botão focável e informa o limite atingido.
    if (botaoDiminuir) {
      botaoDiminuir.setAttribute('aria-disabled', String(nivelFonte === 0));
    }
    if (botaoAumentar) {
      botaoAumentar.setAttribute('aria-disabled', String(nivelFonte === NIVEIS_FONTE.length - 1));
    }
  }

  function mudarFonte(novoNivel) {
    if (novoNivel < 0) {
      anunciar('O texto já está no tamanho mínimo.');
      return;
    }
    if (novoNivel >= NIVEIS_FONTE.length) {
      anunciar('O texto já está no tamanho máximo.');
      return;
    }
    nivelFonte = novoNivel;
    gravar('aef-fonte', String(nivelFonte));
    aplicarFonte();
    anunciar('Tamanho do texto: ' + String(NIVEIS_FONTE[nivelFonte]).replace('.', ',') + '%.');
  }

  aplicarFonte();

  if (botaoDiminuir && botaoAumentar && botaoPadrao) {
    botaoDiminuir.addEventListener('click', function () {
      mudarFonte(nivelFonte - 1);
    });
    botaoAumentar.addEventListener('click', function () {
      mudarFonte(nivelFonte + 1);
    });
    botaoPadrao.addEventListener('click', function () {
      mudarFonte(NIVEL_PADRAO);
    });
  }

  /* 4. Modo escuro e alto contraste -------------------------------------- */
  var botaoEscuro = document.getElementById('botao-escuro');
  var botaoContraste = document.getElementById('botao-contraste');

  var temaSalvo = ler('aef-tema');
  var escuroAtivo = temaSalvo
    ? temaSalvo === 'escuro'
    : Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var contrasteAtivo = ler('aef-contraste') === 'alto';

  function aplicarTemas() {
    if (escuroAtivo) {
      raiz.setAttribute('data-theme', 'dark');
    } else {
      raiz.removeAttribute('data-theme');
    }
    if (contrasteAtivo) {
      raiz.setAttribute('data-contrast', 'high');
    } else {
      raiz.removeAttribute('data-contrast');
    }
    if (botaoEscuro) {
      botaoEscuro.setAttribute('aria-pressed', String(escuroAtivo));
    }
    if (botaoContraste) {
      botaoContraste.setAttribute('aria-pressed', String(contrasteAtivo));
    }
  }

  aplicarTemas();

  if (botaoEscuro) {
    botaoEscuro.addEventListener('click', function () {
      escuroAtivo = !escuroAtivo;
      gravar('aef-tema', escuroAtivo ? 'escuro' : 'claro');
      aplicarTemas();
      anunciar(escuroAtivo ? 'Modo escuro ativado.' : 'Modo escuro desativado.');
    });
  }

  if (botaoContraste) {
    botaoContraste.addEventListener('click', function () {
      contrasteAtivo = !contrasteAtivo;
      gravar('aef-contraste', contrasteAtivo ? 'alto' : 'normal');
      aplicarTemas();
      anunciar(contrasteAtivo ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
    });
  }

  // A barra só aparece quando o JavaScript funciona: assim nenhum botão
  // aparenta funcionar sem de fato funcionar.
  var barraPreferencias = document.getElementById('preferencias');
  if (barraPreferencias) {
    barraPreferencias.hidden = false;
  }

  /* 5. Menu em telas pequenas -------------------------------------------- */
  var botaoMenu = document.querySelector('.menu-botao');
  var menuPrincipal = document.getElementById('menu-principal');

  function definirMenu(aberto) {
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    menuPrincipal.classList.toggle('aberto', aberto);
  }

  if (botaoMenu && menuPrincipal) {
    botaoMenu.hidden = false;
    definirMenu(false);

    botaoMenu.addEventListener('click', function () {
      definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
    });

    // Esc fecha o menu e devolve o foco ao botão.
    menuPrincipal.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
        definirMenu(false);
        botaoMenu.focus();
      }
    });
  }

  /* 6. Checklist ---------------------------------------------------------- */
  var checklist = document.getElementById('checklist');

  if (checklist) {
    var itens = checklist.querySelectorAll('input[type="checkbox"]');
    var textoProgresso = document.getElementById('checklist-status');
    var barraProgresso = document.getElementById('checklist-barra');
    var salvos = [];

    try {
      salvos = JSON.parse(ler('aef-checklist') || '[]');
    } catch (erro) {
      salvos = [];
    }

    Array.prototype.forEach.call(itens, function (item) {
      item.checked = salvos.indexOf(item.value) !== -1;
    });

    var atualizarChecklist = function () {
      var marcados = [];
      Array.prototype.forEach.call(itens, function (item) {
        if (item.checked) {
          marcados.push(item.value);
        }
      });
      var total = itens.length;
      var feitos = marcados.length;
      var percentual = Math.round((feitos / total) * 100);
      var frase = feitos + ' de ' + total + ' itens verificados (' + percentual + '%).';
      if (feitos === total) {
        frase += ' Checklist completo — ótimo trabalho!';
      }
      barraProgresso.value = feitos;
      barraProgresso.max = total;
      gravar('aef-checklist', JSON.stringify(marcados));
      // O parágrafo tem role="status": o leitor de tela lê cada atualização.
      textoProgresso.textContent = frase;
    };

    checklist.addEventListener('change', atualizarChecklist);

    checklist.addEventListener('reset', function () {
      // O evento reset acontece antes de os campos serem limpos.
      window.setTimeout(atualizarChecklist, 0);
    });

    atualizarChecklist();
  }

  /* 7. Quiz --------------------------------------------------------------- */
  var quiz = document.getElementById('quiz');

  var GABARITO = {
    q1: {
      correta: 'b',
      textoCorreto: '<button>',
      explicacao: 'O elemento <button> já é focável, responde a Enter e Espaço e é anunciado como botão. Uma <div> com evento de clique não oferece nada disso sem trabalho extra.'
    },
    q2: {
      correta: 'a',
      textoCorreto: 'alt="" (atributo vazio)',
      explicacao: 'O alt vazio indica que a imagem é decorativa, e o leitor de tela a ignora. Sem o atributo alt, alguns leitores leem o nome do arquivo.'
    },
    q3: {
      correta: 'b',
      textoCorreto: '4,5:1',
      explicacao: 'No nível AA da WCAG, texto em tamanho normal precisa de contraste mínimo de 4,5:1 com o fundo. Texto grande pode usar 3:1.'
    },
    q4: {
      correta: 'c',
      textoCorreto: 'Orientar o deslocamento de quem usa bengala ou percebe o piso pelos pés',
      explicacao: 'O piso tátil direcional forma uma linha-guia; o de alerta avisa sobre mudanças, como o início de uma escada ou a borda de uma travessia.'
    },
    q5: {
      correta: 'b',
      textoCorreto: 'As falas e também os sons relevantes, como risadas, música e alarmes',
      explicacao: 'A legenda para surdos e ensurdecidos (LSE) descreve os sons que ajudam a entender a cena, além de identificar quem fala.'
    }
  };

  function limparQuiz() {
    Object.keys(GABARITO).forEach(function (nome) {
      var grupo = document.getElementById(nome + '-grupo');
      var erro = document.getElementById(nome + '-erro');
      var retorno = document.getElementById(nome + '-retorno');
      grupo.classList.remove('com-erro');
      erro.hidden = true;
      retorno.hidden = true;
      retorno.textContent = '';
      retorno.className = 'feedback';
      Array.prototype.forEach.call(grupo.querySelectorAll('input'), function (opcao) {
        opcao.removeAttribute('aria-describedby');
      });
    });
  }

  function criarElemento(tag, texto) {
    var elemento = document.createElement(tag);
    if (texto) {
      elemento.textContent = texto;
    }
    return elemento;
  }

  if (quiz) {
    var resultado = document.getElementById('quiz-resultado');

    quiz.addEventListener('submit', function (evento) {
      evento.preventDefault();
      limparQuiz();
      resultado.textContent = '';

      var semResposta = [];
      var acertos = 0;
      var nomes = Object.keys(GABARITO);

      nomes.forEach(function (nome) {
        if (!quiz.querySelector('input[name="' + nome + '"]:checked')) {
          semResposta.push(nome);
        }
      });

      // Falta resposta: mostra resumo com links e mensagem em cada pergunta.
      if (semResposta.length > 0) {
        resultado.className = 'mensagem mensagem--erro';
        var tituloErro = semResposta.length === 1
          ? 'Falta responder 1 pergunta'
          : 'Faltam respostas em ' + semResposta.length + ' perguntas';
        resultado.appendChild(criarElemento('h3', tituloErro));
        resultado.appendChild(criarElemento('p', 'Escolha uma alternativa em cada pergunta abaixo e envie novamente:'));
        var lista = criarElemento('ul');

        semResposta.forEach(function (nome) {
          var grupo = document.getElementById(nome + '-grupo');
          var erro = document.getElementById(nome + '-erro');
          var primeiraOpcao = grupo.querySelector('input');
          grupo.classList.add('com-erro');
          erro.hidden = false;
          Array.prototype.forEach.call(grupo.querySelectorAll('input'), function (opcao) {
            opcao.setAttribute('aria-describedby', erro.id);
          });

          var item = criarElemento('li');
          var link = criarElemento('a', grupo.querySelector('legend').textContent);
          link.href = '#' + primeiraOpcao.id;
          link.addEventListener('click', function (cliqueEvento) {
            cliqueEvento.preventDefault();
            primeiraOpcao.focus();
          });
          item.appendChild(link);
          lista.appendChild(item);
        });

        resultado.appendChild(lista);
        resultado.focus();
        return;
      }

      // Todas respondidas: corrige cada pergunta e mostra explicação.
      nomes.forEach(function (nome) {
        var escolhida = quiz.querySelector('input[name="' + nome + '"]:checked').value;
        var dados = GABARITO[nome];
        var retorno = document.getElementById(nome + '-retorno');
        var acertou = escolhida === dados.correta;
        if (acertou) {
          acertos += 1;
        }
        retorno.className = 'feedback ' + (acertou ? 'feedback--certo' : 'feedback--errado');
        retorno.appendChild(criarElemento('strong', acertou
          ? '✔ Resposta correta.'
          : '✘ Resposta incorreta. A alternativa certa é: ' + dados.textoCorreto + '.'));
        retorno.appendChild(criarElemento('span', dados.explicacao));
        retorno.hidden = false;
      });

      resultado.className = 'mensagem mensagem--sucesso';
      resultado.appendChild(criarElemento('h3', 'Resultado: você acertou ' + acertos + ' de ' + nomes.length + ' perguntas'));
      var comentario = acertos === nomes.length
        ? 'Excelente! Você dominou os conceitos principais.'
        : 'Leia a explicação abaixo de cada pergunta para revisar os pontos em que errou. Você pode mudar as respostas e enviar de novo.';
      resultado.appendChild(criarElemento('p', comentario));
      resultado.focus();
    });

    quiz.addEventListener('reset', function () {
      limparQuiz();
      resultado.textContent = '';
      resultado.className = 'mensagem';
      anunciar('Quiz reiniciado. Todas as respostas foram apagadas.');
    });
  }
})();
