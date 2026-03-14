# Tutorial para Novo Colaborador - Davos.io

## Passo 1: Setup Inicial (Primeira vez)

### 1.1 Clonar o Repositório
```bash
# Abra o terminal/PowerShell
# Clone o repositório
git clone https://github.com/leandrosuza/davos.git

# Entre na pasta do projeto
cd davos
```

### 1.2 Verificar Branches
```bash
# Ver todas as branches disponíveis
git branch -a

# Saída esperada:
# * main
#   remotes/origin/main
#   remotes/origin/development
```

### 1.3 Instalar Dependências
```bash
# Instalar dependências do projeto
npm install

# Instalar dependências do servidor
cd server
npm install
cd ..
```

### 1.4 Mudar para Branch de Desenvolvimento
```bash
# Mudar para branch development (trabalho principal)
git checkout development

# Verificar que está na branch correta
git branch
# * development
#   main
```

### 1.5 Testar Localmente
```bash
# Iniciar o projeto
npm run dev

# Deve aparecer:
# [0] Web server running on port 8080
# [1] Available on: http://127.0.0.1:3000

# Abra o navegador em: http://localhost:3000
# Pressione Ctrl+C para parar
```

## Passo 2: Fluxo de Trabalho Diário

### 2.1 Antes de Começar a Codar
```bash
# Sempre comece atualizando sua branch
git checkout development
git pull origin development

# Crie uma nova branch para sua tarefa
git checkout -b feature/sua-tarefa

# Exemplo:
git checkout -b feature/adicionar-sistema-de-clans
```

### 2.2 Durante o Desenvolvimento
```bash
# Verifique em que branch está
git branch

# Faça suas alterações nos arquivos
# Ex: Edite client/index.html, server/src/GameServer.js, etc.

# Veja o que mudou
git status

# Adicione os arquivos modificados
git add client/index.html
git add server/src/GameServer.js

# Ou adicione tudo
git add .

# Faça um commit descritivo
git commit -m "feat: adiciona sistema de clans ao jogo"

# Envie sua branch para o GitHub
git push origin feature/adicionar-sistema-de-clans
```

### 2.3 Exemplo Prático Completo
```bash
# === MANHÃ - Começo do dia ===
git checkout development
git pull origin development
git checkout -b feature/melhorar-interface-menu

# === TRABALHANDO ===
# Edite arquivos...
# client/assets/css/menu.css
# client/assets/js/menu.js
# client/index.html

# Verifique mudanças
git status
# Saída: modified: client/assets/css/menu.css
#        modified: client/assets/js/menu.js

# Commit 1
git add client/assets/css/menu.css
git commit -m "feat: melhora design do menu principal"

# Continue trabalhando...
# Edite mais arquivos...

# Commit 2
git add .
git commit -m "feat: adiciona animações nos botões do menu"

# Envie para GitHub
git push origin feature/melhorar-interface-menu
```

## Passo 3: Pull Request (PR)

### 3.1 Criar Pull Request
1. Vá para: https://github.com/leandrosuza/davos
2. Clique em "Pull requests"
3. Clique em "New pull request"
4. Selecione:
   - Base: `development`
   - Compare: `feature/melhorar-interface-menu`
5. Clique em "Create pull request"
6. Descreva suas mudanças
7. Clique em "Create pull request"

### 3.2 Após Aprovação do PR
```bash
# Volte para development
git checkout development
git pull origin development

# Delete sua branch local (opcional)
git branch -d feature/melhorar-interface-menu

# Delete sua branch remota (opcional)
git push origin --delete feature/melhorar-interface-menu
```

## Passo 4: Sincronização com Outro Desenvolvedor

### 4.1 Se Outra Pessoa Também Está Trabalhando
```bash
# ANTES de começar a trabalhar
git checkout development
git pull origin development

# Sua branch está atualizada com o trabalho do outro
git checkout feature/sua-tarefa
git rebase development

# Agora pode trabalhar sem conflitos
```

### 4.2 Se Houver Conflitos
```bash
# Durante git pull ou git rebase
# Git avisará sobre conflitos

# Ver conflitos
git status
# Saída: both modified: client/index.html

# Edite o arquivo e resolva conflitos manualmente
# Procure por: <<<<<<< HEAD, =======, >>>>>>> branch

# Depois de resolver:
git add client/index.html
git rebase --continue

# Ou se quiser cancelar:
git rebase --abort
```

## Passo 5: Comandos Úteis

### 5.1 Verificar Status
```bash
git status                    # Ver arquivos modificados
git log --oneline --graph     # Ver histórico de commits
git diff                      # Ver diferenças nos arquivos
```

### 5.2 Desfazer Mudanças
```bash
# Desfazer mudanças em um arquivo
git checkout -- client/index.html

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças)
git reset --hard HEAD~1
```

### 5.3 Mudar de Branch
```bash
# Ver branches
git branch

# Mudar para outra branch
git checkout main
git checkout development
git checkout feature/outra-tarefa

# Criar nova branch
git checkout -b feature/nova-funcionalidade
```

## Passo 6: Problemas Comuns

### 6.1 "Permission denied"
```bash
# Configure seu nome e email no Git
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"

# Se ainda der erro, pode precisar de autenticação no GitHub
```

### 6.2 "Everything up-to-date"
```bash
# Significa que não há mudanças para enviar
# Faça algumas mudanças e comite-as antes de push
```

### 6.3 "Failed to push"
```bash
# Puxe as mudanças mais recentes primeiro
git pull origin development

# Depois tente push novamente
git push origin development
```

## Checklist Diário

### ☐ Manhã (Começo do dia)
1. `git checkout development`
2. `git pull origin development`
3. `git checkout -b feature/nova-tarefa`
4. `npm run dev` (testar se funciona)

### ☐ Durante o dia
1. Fazer mudanças nos arquivos
2. `git add .`
3. `git commit -m "mensagem descritiva"`
4. `git push origin feature/nova-tarefa`

### ☐ Fim do dia
1. `git push origin feature/nova-tarefa`
2. Criar Pull Request no GitHub
3. Aguardar review e merge

## Exemplo Real: Adicionando Novo Botão

```bash
# === SETUP ===
git checkout development
git pull origin development
git checkout -b feature/botao-de-configuracoes

# === CODANDO ===
# Edite client/index.html
# Adicione: <button id="config-btn">Config</button>

# Edite client/assets/css/index.css
# Adicione estilos para #config-btn

# Edite client/assets/js/main_out.js
# Adicione evento de clique

# === TESTANDO ===
npm run dev
# Abra http://localhost:3000
# Teste o novo botão

# === COMMITANDO ===
git add client/index.html client/assets/css/index.css client/assets/js/main_out.js
git commit -m "feat: adiciona botão de configurações no menu"
git push origin feature/botao-de-configuracoes

# === PULL REQUEST ===
# Vá para GitHub e crie PR
# Aguarde aprovação
```

---

**Lembre-se**: Sempre trabalhe em feature branches, nunca diretamente em `development`!
