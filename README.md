# Acesso em Foco

**Inclusão em cada detalhe.** Portal educativo com artigos sobre acessibilidade no cotidiano, feito somente com HTML5, CSS3 e JavaScript. Trabalho individual (TDE) da disciplina de Programação Web.

O site funciona sem login, sem banco de dados, sem build e sem dependências externas.

## Estrutura

```
acesso-em-foco/
├── index.html          Início: apresentação, temas e recursos de acessibilidade do portal
├── casa.html           Em casa
├── cidade.html         Na cidade
├── comunicacao.html    Comunicação
├── educacao.html       Educação
├── digital.html        Mundo digital (WCAG, HTML semântico, foco, contraste)
├── guia.html           Guia prático: checklist, quiz, recursos, mapa do site e referências
├── assets/
│   ├── styles.css      Estilos únicos de todas as páginas (tokens de cor, temas, componentes)
│   ├── app.js          Fonte A−/A+/Padrão, modo escuro, alto contraste, menu, checklist e quiz
│   └── *.svg           Logo e ilustrações originais
├── docs/
│   ├── ROTEIRO_VIDEO.md     Roteiro do vídeo de 3 a 5 minutos
│   └── CHECKLIST_TESTES.md  Testes executados, resultados e limitações
├── README.md
└── LINK_PUBLICACAO.txt  URL pública (preencher depois de publicar)
```

## Como abrir localmente

**Opção 1:** dê dois cliques em `index.html`. O site abre no navegador e tudo funciona, inclusive as preferências salvas.

**Opção 2 (servidor local, mais parecido com a hospedagem):** na pasta do projeto, rode um destes comandos e acesse o endereço exibido:

```
npx serve .
```

```
python -m http.server 8000
```

## Como publicar no GitHub Pages

1. Crie um repositório público no GitHub (por exemplo, `acesso-em-foco`).
2. Envie os arquivos desta pasta para a branch `main`, com o `index.html` na raiz:
   ```
   git remote add origin https://github.com/SEU-USUARIO/acesso-em-foco.git
   git push -u origin main
   ```
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Source: Deploy from a branch**, **Branch: main** e pasta **/(root)**. Clique em **Save**.
5. Aguarde alguns minutos. A URL aparece no topo da mesma tela, no formato `https://SEU-USUARIO.github.io/acesso-em-foco/`.
6. Abra a URL no computador e no celular e confira as sete páginas, os links do menu e do rodapé, as ilustrações e os botões de preferência.
7. Copie a URL real para o arquivo `LINK_PUBLICACAO.txt` e faça um novo commit.

Todos os caminhos internos são relativos (`casa.html`, `assets/styles.css`), por isso o site funciona dentro do subdiretório do GitHub Pages.

Guia oficial: <https://docs.github.com/en/pages/quickstart>

## Recursos de acessibilidade implementados

| Recurso | Onde está no código |
| --- | --- |
| HTML semântico (`header`, `nav`, `main`, `footer`), um `h1` por página, títulos em ordem, `lang="pt-BR"` | todas as páginas |
| Link “Pular para o conteúdo” | início do `<body>`; estilo `.skip-link` |
| Foco visível em todos os elementos | `:focus-visible` em `styles.css` |
| Página atual no menu com estilo e `aria-current="page"` | menu de cada página; `.menu a[aria-current]` |
| Botões A−, A+ e Padrão (87,5% a 150%), valor exibido e anunciado | `app.js`, parte 3 |
| Modo escuro e alto contraste com `aria-pressed` e `localStorage` | `app.js`, parte 4; temas em `styles.css` |
| Menu móvel com botão nativo, `aria-expanded` e tecla Esc | `app.js`, parte 5 |
| Checklist com 8 itens, progresso em texto (`role="status"`) e barra | `guia.html`; `app.js`, parte 6 |
| Quiz com 5 perguntas, `fieldset`/`legend`, resumo de erros, correção e explicações | `guia.html`; `app.js`, parte 7 |
| Contraste mínimo de 4,5:1 nos textos (claro, escuro e alto contraste) | tokens em `:root` |
| Layout responsivo sem rolagem horizontal a partir de 320 px | `@media` em `styles.css` |
| `prefers-reduced-motion` e `forced-colors` | final de `styles.css` |
| Imagens informativas com `alt` descritivo; decorativas com `alt=""` | ilustrações dos artigos e cartões |
| Controles que dependem de JavaScript só aparecem quando ele funciona | atributo `hidden` removido por `app.js` |

## Como testar

O roteiro completo e os resultados estão em [`docs/CHECKLIST_TESTES.md`](docs/CHECKLIST_TESTES.md). Resumo:

1. **Teclado:** recarregue a página, pressione `Tab` e confira o link “Pular para o conteúdo”. Navegue por tudo com `Tab`/`Shift+Tab`, `Enter` e `Espaço`.
2. **Preferências:** use A+, Modo escuro e Alto contraste, troque de página e recarregue: as escolhas continuam.
3. **Responsividade:** abra as ferramentas do desenvolvedor (`F12`), use o modo de dispositivo com 320 px de largura e aplique zoom de 200%.
4. **Guia prático:** marque itens do checklist; envie o quiz incompleto e depois completo.
5. **Ferramentas automáticas:** Lighthouse (aba *Lighthouse* do Chrome, categoria *Accessibility*) e a extensão axe DevTools.

## O que ainda falta fazer (pelo estudante)

- [ ] Publicar no GitHub Pages e conferir o site publicado no computador e no celular.
- [ ] Registrar a URL real em `LINK_PUBLICACAO.txt`.
- [ ] Gravar o vídeo de 3 a 5 minutos seguindo `docs/ROTEIRO_VIDEO.md`.
- [ ] Montar o ZIP final com os arquivos do site e o vídeo, e enviar ao AVA com o link público.

## Referências

- eMAG 3.1: <https://emag.governoeletronico.gov.br/>
- WCAG 2.2 (W3C): <https://www.w3.org/TR/WCAG22/>
- WCAG Quick Reference: <https://www.w3.org/WAI/WCAG22/quickref/>
- Avaliação de acessibilidade (W3C WAI): <https://www.w3.org/WAI/test-evaluate/>
- GitHub Pages: <https://docs.github.com/en/pages/quickstart>

> O portal foi testado com ferramentas automáticas e manualmente, mas não passou por auditoria formal. Ele não declara conformidade total com a WCAG 2.2 ou o eMAG.
