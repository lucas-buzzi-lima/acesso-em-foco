# Checklist de testes

Registro dos testes feitos antes da entrega. Os testes de 23/11/2026 foram executados em um servidor local que serve o site em um subdiretório (`/acesso-em-foco/`), como no GitHub Pages, usando um navegador baseado em Chromium.

Legenda: ✅ passou · ⚠️ passou com observação · ⬜ pendente (fazer depois de publicar)

## 1. Testes automáticos

| Teste | Ferramenta | Resultado |
| --- | --- | --- |
| Violações de acessibilidade (WCAG 2.0/2.1/2.2 A e AA + boas práticas) nas 7 páginas, nos modos claro, escuro e alto contraste (21 combinações) | axe-core 4.10.2 | ✅ 0 violações |
| Itens que o axe não conseguiu medir sozinho: contraste do texto no topo das páginas, sobre fundo em degradê | cálculo manual (fórmula de contraste da WCAG) no ponto mais escuro do degradê | ✅ menor razão: 5,58:1 (claro) e 6,80:1 (escuro) |
| Lighthouse: Acessibilidade, Boas práticas e SEO nas 7 páginas | Lighthouse 12.2.1 | ✅ 100 / 100 / 100 em todas |
| Validação de HTML nas 7 páginas | html-validate 8.24.1 (regras `standard`) | ✅ sem erros |
| Links internos, âncoras (`#`), atributos `for`/`aria-controls`/`aria-labelledby`, ids duplicados, um `h1` por página, sem salto de nível de título, `alt` em todas as imagens | script de verificação próprio | ✅ sem problemas |
| Erros no console do navegador | ferramentas do desenvolvedor | ✅ nenhum erro |
| Links externos das referências | requisição HTTP | ⚠️ 7 de 9 responderam 200. Os dois links do Planalto (Leis 13.146/2015 e 10.436/2002) não responderam a acesso automatizado; abrir manualmente no navegador para confirmar |

### Contraste das cores principais (razão mínima exigida: 4,5:1)

| Par de cores | Claro | Escuro | Alto contraste |
| --- | --- | --- | --- |
| Texto sobre fundo | 14,80:1 | 15,31:1 | 21:1 |
| Texto secundário sobre fundo | 7,39:1 | 10,27:1 | 21:1 |
| Links sobre fundo | 7,54:1 | 11,28:1 | 19,56:1 |
| Texto de botão sobre botão | 11,67:1 | 11,14:1 | 19,56:1 |
| Indicador de foco sobre fundo (mínimo 3:1) | 5,41:1 | 10,37:1 | 16,75:1 |
| Mensagem de sucesso / erro | 5,84:1 / 6,60:1 | 8,72:1 / 9,00:1 | ✅ |

## 2. Navegação e páginas

| Teste | Resultado |
| --- | --- |
| As 7 páginas abrem e o menu leva a todas elas | ✅ |
| Menu idêntico em todas as páginas, com a atual marcada por estilo e `aria-current="page"` | ✅ |
| Logo/nome leva ao Início | ✅ |
| Links do rodapé, do sumário “Nesta página”, da trilha e de “Continue lendo” | ✅ (verificação automática de links e âncoras) |
| Mapa do site no Guia prático | ✅ |
| Funciona em subdiretório (caminhos relativos) | ✅ testado em `/acesso-em-foco/` |

## 3. Teclado e foco

| Teste | Resultado |
| --- | --- |
| Primeiro `Tab` mostra “Pular para o conteúdo”; `Enter` move o foco para o `<main>` | ✅ |
| Depois de pular, o próximo `Tab` vai para o primeiro link do conteúdo | ✅ |
| A−/A+/Padrão funcionam com `Enter` e com `Espaço` | ✅ |
| Modo escuro e Alto contraste funcionam com `Enter` | ✅ |
| Menu móvel abre com `Enter`, recebe foco com `Tab` e fecha com `Esc`, com o foco voltando ao botão | ✅ |
| Itens do checklist marcados com `Espaço` | ✅ |
| Quiz enviado com `Enter` | ✅ |
| Indicador de foco visível nos três modos de cor | ✅ |

## 4. Preferências de leitura

| Teste | Resultado |
| --- | --- |
| A+ aumenta até 150%; ao passar do limite, anuncia “O texto já está no tamanho máximo.” e marca o botão com `aria-disabled` | ✅ |
| A− diminui até 87,5%; Padrão volta a 100% | ✅ |
| Valor exibido ao lado dos botões e anunciado na região `role="status"` | ✅ |
| Modo escuro e alto contraste mudam `aria-pressed` e mostram ✓ no botão ativo | ✅ |
| Preferências continuam ao trocar de página e ao recarregar (`localStorage`) | ✅ |
| Sem preferência salva, o modo escuro segue a configuração do sistema | ✅ |
| Sem JavaScript, a barra de preferências e o botão Menu ficam ocultos e o menu aparece completo | ✅ (pelo código: atributo `hidden` removido só pelo `app.js`) |

## 5. Responsividade, zoom e reflow

| Teste | Resultado |
| --- | --- |
| Largura de 320 px, texto em 150% e alto contraste: sem rolagem horizontal (`scrollWidth` = `clientWidth` = 320) e nenhum elemento ultrapassando a tela | ✅ |
| Exemplos de código quebram linha em vez de criar rolagem lateral | ✅ |
| Grade de cartões, sumário e rodapé passam a uma coluna em telas pequenas | ✅ |
| Zoom de 200% no navegador em desktop | ⬜ repetir manualmente no site publicado (`Ctrl` + `+`) |

## 6. Checklist e quiz

| Teste | Resultado |
| --- | --- |
| Marcar 2 itens mostra “2 de 8 itens verificados (25%).” e atualiza a barra | ✅ |
| Marcações ficam salvas ao recarregar; “Desmarcar todos os itens” zera texto, barra e armazenamento | ✅ |
| Quiz com respostas faltando: resumo com o número de perguntas, links para cada uma, mensagem em cada pergunta e foco no resumo | ✅ |
| Quiz completo: “Resultado: você acertou 4 de 5 perguntas”, “✔ Resposta correta.” / “✘ Resposta incorreta…” e explicação em cada pergunta | ✅ |
| “Recomeçar o quiz” limpa respostas, correções e mensagens | ✅ |

## 7. Testes pendentes (fazer depois de publicar)

- ⬜ Abrir a URL do GitHub Pages no computador e no celular e conferir páginas, imagens e estilos.
- ⬜ Testar zoom de 200% no navegador do computador.
- ⬜ Testar com um leitor de tela real: NVDA no Windows (gratuito) ou TalkBack/VoiceOver no celular. Conferir a leitura do menu, dos botões de preferência, do checklist e do quiz.
- ⬜ Testar em outro navegador (Firefox ou Safari).
- ⬜ Abrir manualmente os dois links do Planalto nas referências.

## Limitações conhecidas

- Os testes automáticos encontram só parte dos problemas de acessibilidade. Não houve auditoria formal nem testes com pessoas com deficiência, por isso o site **não declara conformidade total** com a WCAG 2.2 ou o eMAG.
- As ilustrações SVG têm cores fixas e ficam sobre um fundo claro também nos modos escuro e alto contraste, para continuarem legíveis.
- As preferências ficam salvas só no navegador usado. Em janela anônima, ou com o armazenamento bloqueado, elas valem até fechar a página.
