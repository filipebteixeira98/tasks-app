# Lista de tarefas

Projeto de Programação de Aplicativos para o 2º semestre de Desenvolvimento de Sistemas, SENAI Dendezeiros. A tela permite adicionar, concluir, reabrir e remover tarefas. Os dados ficam na memória durante a execução do app.

## Executar

Use Node.js 24 LTS (24.3 ou posterior). Abra um terminal na pasta do projeto.

```sh
npm ci
npm run web
```

Abra o endereço local indicado pelo Expo. Para testar no celular, rode `npm start` e use o Expo Go compatível com o SDK 58. Coloque os dispositivos na mesma rede e siga o fluxo da plataforma. [Ambiente Expo](https://docs.expo.dev/get-started/set-up-your-environment/)

Para abrir a demonstração sem instalar dependências, abra `04-demo-offline/Lista-de-tarefas.html` no navegador. O arquivo está na pasta ao lado deste projeto.

## Ler o código na ordem da aula

1. Em `src/screens/TaskScreen.js`, leia `initialTasks`. Cada tarefa tem `id`, `title` e `done`.
2. Encontre `draft` e `tasks` em `useState`. Siga o campo de texto até `setDraft`.
3. Leia `addTask`, `toggleTask` e `removeTask`. Observe como cada operação produz uma nova lista.
4. Encontre `tasks.map`, que desenha as linhas, e `pendingCount`, calculado a partir da lista.
5. Se houver tempo, exiba `tasks.length` e compare com o número de pendências.

`App.js` aponta para a tela e `index.js` registra o app no Expo. A lógica e os estilos ficam junto da única tela em `src/screens/`. O `useRef` mantém o próximo id entre renderizações. A lista e o campo de texto usam `useState`.

[Guia de publicação no GitHub](PUBLISHING.md) · [Estado no React](https://react.dev/reference/react/useState) · [Arrays no estado](https://react.dev/learn/updating-arrays-in-state)
