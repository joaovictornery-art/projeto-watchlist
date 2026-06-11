# Projeto Watchlist

Aplicação simples para organizar filmes e séries que quero assistir ou que já assisti. O projeto foi criado como um exercício prático de HTML, CSS, JavaScript, Git e GitHub Pages.

## O que a aplicação faz

- Adiciona filmes ou séries à lista.
- Marca títulos como assistidos.
- Edita o título e o tipo de um item salvo.
- Permite dar nota de 0 a 10.
- Remove títulos da lista.
- Filtra por tipo: todos, filmes ou séries.
- Filtra por status: todos, quero assistir ou assistidos.
- Salva os dados no navegador com `localStorage`.

## Como abrir localmente

Abra o arquivo `index.html` no navegador ou rode um servidor local na pasta do projeto.

Exemplo com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Estrutura

- `index.html`: estrutura da página.
- `style.css`: aparência visual.
- `script.js`: regras e interações da Watchlist.
- `CONTEXT.md`: glossário simples dos conceitos do produto.

## Próximos passos possíveis

- Separar melhor títulos assistidos e títulos para assistir.
- Criar uma busca por texto.
- Evoluir futuramente para login, backend ou recomendações com IA.
