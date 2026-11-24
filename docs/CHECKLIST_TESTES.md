# Checklist de testes

Registro dos testes feitos antes da entrega. Os testes de 23/11/2026 foram executados em um servidor local que serve o site em um subdiretório (`/acesso-em-foco/`), como no GitHub Pages, usando um navegador baseado em Chromium.

Legenda: ✅ passou · ⚠️ passou com observação · ⬜ pendente (fazer depois de publicar)

## 1. Testes automáticos

| Teste | Ferramenta | Resultado |
| --- | --- | --- |
| Violações de acessibilidade (WCAG 2.0/2.1/2.2 A e AA + boas práticas) nas 7 páginas, nos modos claro, escuro e alto contraste (21 combinações) | axe-core 4.10.2 | ✅ 0 violações |
| Lighthouse: Acessibilidade, Boas práticas e SEO nas 7 páginas | Lighthouse 12.2.1 | ✅ 100 / 100 / 100 em todas |
| Validação de HTML nas 7 páginas | html-validate 8.24.1 (regras `standard`) | ✅ sem erros |
| Links internos, âncoras (`#`), ids duplicados, um `h1` por página, títulos sem pular nível | script de verificação | ✅ sem problemas |
| Erros no console do navegador | ferramentas do desenvolvedor | ✅ nenhum erro |
| Links externos das referências | requisição HTTP | ⚠️ 7 de 9 responderam 200. Os dois links do Planalto (Leis 13.146/2015 e 10.436/2002) não responderam a acesso automatizado; abrir manualmente no navegador para confirmar |

**Correções feitas durante os testes:**

- O Lighthouse apontou um erro no console: o navegador procurava um `favicon.ico` que não existe. Foi adicionado `<link rel="icon" href="data:,">` em todas as páginas.
- Com tela de 320 px e texto em 150%, as perguntas do quiz passavam da largura da tela. A causa era o `fieldset`, que por padrão não encolhe; foi corrigido com `min-width: 0`.

### Contraste das cores principais (razão mínima exigida: 4,5:1)

| Par de cores | Claro | Escuro | Alto contraste |
| --- | --- | --- | --- |
| Texto sobre fundo | 14,80:1 | 15,31:1 | 21:1 |
| Texto secundário sobre fundo | 7,39:1 | 10,27:1 | 21:1 |
| Links sobre fundo | 7,54:1 | 11,28:1 | 19,56:1 |
| Texto de botão sobre botão | 11,67:1 | 11,14:1 | 19,56:1 |
| Indicador de foco sobre fundo (mínimo 3:1) | 5,41:1 | 10,37:1 | 16,75:1 |
| Mensagem de acerto / erro do quiz | 5,84:1 / 6,60:1 | 8,72:1 / 9,00:1 | ✅ |

## 2. Navegação e páginas

| Teste | Resultado |
| --- | --- |
| As 7 páginas abrem e o menu leva a todas elas | ✅ |
| Menu igual em todas as páginas, com a atual marcada por estilo e `aria-current="page"` | ✅ |
| Nome do site no topo leva ao Início | ✅ |
| Links do rodapé, do sumário “Nesta página”, da trilha e de “Continue lendo” | ✅ |
| Mapa do site no Guia prático | ✅ |
| Funciona em subdiretório (caminhos relativos) | ✅ testado em `/acesso-em-foco/` |

## 3. Teclado e foco

| Teste | Resultado |
| --- | --- |
| Primeiro `Tab` mostra “Pular para o conteúdo”; `Enter` move o foco para o `<main>` | ✅ |
| A−/A+/Padrão funcionam com `Enter` e com `Espaço` | ✅ |
| Modo escuro e Alto contraste funcionam com `Enter` | ✅ |
| Menu móvel abre com `Enter`, recebe foco com `Tab` e fecha com `Esc`, com o foco voltando ao botão | ✅ |
| Itens do checklist marcados com `Espaço` | ✅ |
| Quiz enviado com `Enter` | ✅ |
| Indicador de foco visível nos três modos de cor | ✅ |

## 4. Preferências de leitura

| Teste | Resultado |
| --- | --- |
| A+ vai até 150% e A− até 87,5%; passando do limite, aparece o aviso “O texto já está no tamanho máximo/mínimo.” e o botão fica com `aria-disabled` | ✅ |
| Padrão volta a 100% | ✅ |
| Valor exibido ao lado dos botões e anunciado na região `role="status"` | ✅ |
| Modo escuro e alto contraste mudam `aria-pressed` e mostram ✓ no botão ativo | ✅ |
| Preferências continuam ao trocar de página e ao recarregar (`localStorage`) | ✅ |
| Sem JavaScript, a barra de preferências e o botão Menu ficam ocultos e o menu aparece completo | ✅ (pelo código: o atributo `hidden` só é removido pelo `app.js`) |

## 5. Responsividade, zoom e reflow

| Teste | Resultado |
| --- | --- |
| Largura de 320 px, texto em 150% e alto contraste, nas 7 páginas: sem rolagem horizontal (largura da página = 320 px) | ✅ |
| Exemplos de código quebram linha em vez de criar rolagem lateral | ✅ |
| Cartões e rodapé passam a uma coluna em telas pequenas | ✅ |
| Zoom de 200% no navegador em desktop | ⬜ repetir manualmente no site publicado (`Ctrl` + `+`) |

## 6. Checklist e quiz

| Teste | Resultado |
| --- | --- |
| Marcar 2 itens mostra “2 de 8 itens verificados (25%).” e atualiza a barra | ✅ |
| Marcações ficam salvas ao recarregar; “Desmarcar todos os itens” zera texto, barra e armazenamento | ✅ |
| Quiz com respostas faltando: aviso com a lista das perguntas, mensagem em cada uma e foco no aviso | ✅ |
| Quiz completo: “Resultado: você acertou 4 de 5 perguntas”, “✔ Resposta correta.” / “✘ Resposta incorreta…” e explicação em cada pergunta | ✅ |
| “Recomeçar o quiz” limpa respostas, correções e mensagens | ✅ |

## 7. Testes pendentes (fazer depois de publicar)

- ⬜ Abrir a URL do GitHub Pages no computador e no celular e conferir páginas e estilos.
- ⬜ Testar zoom de 200% no navegador do computador.
- ⬜ Testar com um leitor de tela real: NVDA no Windows (gratuito) ou TalkBack/VoiceOver no celular. Conferir a leitura do menu, dos botões de preferência, do checklist e do quiz.
- ⬜ Testar em outro navegador (Firefox ou Safari).
- ⬜ Abrir manualmente os dois links do Planalto nas referências.

## Limitações conhecidas

- Os testes automáticos encontram só parte dos problemas de acessibilidade. Não houve auditoria formal nem testes com pessoas com deficiência, por isso o site **não declara conformidade total** com a WCAG 2.2 ou o eMAG.
- As preferências ficam salvas só no navegador usado. Em outro computador ou navegador, elas começam no padrão.
