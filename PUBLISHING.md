# Como publicar o Lista de tarefas no GitHub

Este roteiro envia o **código-fonte** do app para um repositório GitHub. Você precisa de uma conta GitHub, [Git 2.28 ou posterior](https://git-scm.com/downloads) e [GitHub CLI](https://cli.github.com/) para autenticar pelo navegador.

## 1. Faça o primeiro commit no computador

Abra um terminal **dentro da pasta `03-projeto-tarefas`**, onde ficam `App.js`, `package.json` e `.gitignore`. Execute:

```sh
git --version
git init -b main
git rev-parse --show-toplevel
```

A raiz indicada pelo último comando deve ser a pasta do app. Se ela já era um repositório do projeto, pule o `git init` e confirme a branch com `git branch --show-current`. O exemplo abaixo usa `main`.

Se o Git pedir a identidade do autor, configure-a para este repositório. Use seu nome e o e-mail associado à conta GitHub ou o endereço `noreply` fornecido por ela.

```sh
git config user.name "Seu Nome"
git config user.email "SEU_EMAIL"
```

Adicione os arquivos e confira o que entrará antes de fazer o commit. O `.gitignore` exclui `node_modules/`, `.expo/`, `dist/` e arquivos locais de ambiente. Mantenha `package-lock.json` no Git. Revise a lista para evitar incluir credenciais ou arquivos pessoais.

```sh
git add .
git status --short
git commit -m "Adiciona lista de tarefas"
```

## 2. Crie o repositório e envie os arquivos

1. Acesse [Novo repositório no GitHub](https://github.com/new). Selecione o proprietário, dê um nome como `lista-de-tarefas` e escolha a visibilidade. Um repositório privado limita o acesso às pessoas autorizadas.
2. Deixe as opções de README, `.gitignore` e licença sem marcar para começar com um remoto vazio. Clique em **Create repository** e copie a URL **HTTPS** da página de configuração.
3. Autentique no navegador e configure a CLI como auxiliar de credenciais do Git.

   ```sh
   gh auth login --hostname github.com --git-protocol https --web
   gh auth setup-git --hostname github.com
   gh auth status
   ```

4. No terminal do projeto, troque `URL_DO_REPO` pela URL HTTPS copiada. Confira a linha de `push` em `git remote -v` antes de enviar.

   ```sh
   git remote add origin URL_DO_REPO
   git remote -v
   git push -u origin main
   ```

5. Atualize a página no GitHub. Na branch `main`, confira `App.js`, `package.json`, `README.md` e a mensagem do commit. O `-u` vincula a branch local a `origin/main`. Nos próximos envios, faça `git add`, `git commit` e `git push`.

Se **origin já existe**, confira `git remote -v`. Se a URL já está certa, pule o `git remote add`. Se pretende apontar este projeto para outro repositório, atualize o endereço com `git remote set-url origin URL_DO_REPO` e confira antes de enviar. Se o GitHub recusar o primeiro envio porque o remoto já tem commits, use um remoto vazio para este exercício ou integre os históricos antes de tentar novamente.

[Documentação de importação com Git](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) · [Autenticação pela GitHub CLI](https://docs.github.com/en/github-cli/github-cli/authenticating-with-github-cli) · [E-mail de commits no GitHub](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)
