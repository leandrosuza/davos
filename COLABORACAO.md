# Guia de Colaboração - Davos.io

## Setup Inicial

### 1. Clonar Repositório
```bash
git clone https://github.com/leandrosuza/davos.git
cd davos
```

### 2. Configurar Branches
```bash
# Ver branches disponíveis
git branch -a

# Mudar para development (trabalho principal)
git checkout development

# Criar feature branch para cada tarefa
git checkout -b feature/nome-da-tarefa
```

## Workflow de Trabalho

### Para 2 Pessoas Trabalharem Juntas

#### Método 1: Feature Branches (Recomendado)
```bash
# Pessoa 1
git checkout development
git checkout -b feature/frontend-atualizacoes

# Pessoa 2
git checkout development  
git checkout -b feature/backend-melhorias

# Cada um trabalha na sua feature
git add .
git commit -m "feat: implementada funcionalidade X"
git push origin feature/frontend-atualizacoes
```

#### Método 2: Divisão por Área
- **Pessoa 1**: Frontend (`client/`)
- **Pessoa 2**: Backend (`server/`)

#### Método 3: VS Code Live Share
1. Instalar extensão "Live Share"
2. Iniciar sessão de compartilhamento
3. Convidar outra pessoa via link
4. Trabalhar em tempo real

## Sincronização

### Antes de Começar a Trabalhar
```bash
# Atualizar development
git checkout development
git pull origin development

# Voltar para sua feature
git checkout feature/sua-tarefa
git rebase development
```

### Evitando Conflitos

#### 1. Comunicação Constante
- Use Discord/Slack para avisar: "Vou editar arquivo X"
- Issues no GitHub para rastrear tarefas
- Nunca edite o mesmo arquivo simultaneamente

#### 2. Commits Pequenos e Frequentes
```bash
git add .
git commit -m "feat: adiciona botão de configuração"
git push
```

#### 3. Pull Requests
1. Criar PR: `feature/*` → `development`
2. GitHub resolve conflitos automaticamente
3. Code review e aprovação
4. Merge em `development`

#### 4. Merge para Produção
```bash
git checkout main
git pull origin main
git merge development
git push origin main
```

## Boas Práticas

### ✅ Faça
- Use feature branches
- Commits descritivos
- Sincronize com development frequentemente
- Comunique-se com a equipe
- Use VS Code Live Share para sessões conjuntas

### ❌ Não Faça
- Trabalhar diretamente em development com múltiplas pessoas
- Fazer commits grandes
- Deixar de sincronizar por muito tempo
- Editar o mesmo arquivo sem comunicação

## Comandos Úteis

### Ver Status
```bash
git status
git log --oneline --graph
```

### Resolver Conflitos
```bash
# Ver conflitos
git diff

# Aceitar sua versão
git checkout --ours arquivo.js

# Aceitar versão remota
git checkout --theirs arquivo.js

# Marcar como resolvido
git add arquivo.js
git commit -m "resolve merge conflicts"
```

### Limpeza
```bash
# Remover branches locais mescladas
git branch -d feature/nome-da-branch

# Remover branches remotas
git push origin --delete feature/nome-da-branch
```

## Estrutura Sugerida

```
davos/
├── client/          # Frontend - Pessoa 1
│   ├── assets/
│   ├── css/
│   └── js/
├── server/          # Backend - Pessoa 2
│   ├── src/
│   └── modules/
├── docs/            # Documentação compartilhada
└── COLABORACAO.md  # Este arquivo
```

## Ferramentas de Colaboração

1. **GitHub Issues**: Rastrear bugs e features
2. **GitHub Projects**: Kanban board
3. **Discord/Slack**: Comunicação rápida
4. **VS Code Live Share**: Programação em tempo real
5. **GitHub Desktop**: Interface visual para Git

## Exemplo de Fluxo Completo

```bash
# Dia 1 - Setup
git checkout development
git pull
git checkout -b feature/novo-sistema-de-clans

# Dia 1-3 - Desenvolvimento
git add .
git commit -m "feat: cria sistema de clans"
git push

# Dia 3 - Sincronização
git checkout development
git pull
git checkout feature/novo-sistema-de-clans
git rebase development
git push --force-with-lease

# Dia 4 - Pull Request
# Criar PR no GitHub
# Aguardar review
# Merge em development

# Dia 5 - Produção
git checkout main
git merge development
git push origin main
```

---

**Lembre-se**: A chave para uma colaboração eficiente é **comunicação constante** e **branches bem organizadas**!
