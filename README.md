# 🗳️ Urna Simulada — Amazonas 2026

Simulação de urna eletrônica para pesquisa de campo.  
Deploy automático no Firebase Hosting via GitHub Actions. Funciona como PWA (instala como app).

---

## 📁 Estrutura do projeto  

```
urna-am-2026/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions: auto-deploy no push
├── public/
│   ├── index.html            ← App principal
│   ├── manifest.json         ← Configuração PWA
│   ├── sw.js                 ← Service Worker (offline)
│   ├── favicon.png
│   └── icon-*.png            ← Ícones do app (72 a 512px)
├── .firebaserc               ← ID do projeto Firebase
├── firebase.json             ← Configuração do Firebase Hosting
├── .gitignore
└── README.md
```

---

## 🚀 Passo a passo — configuração inicial (só uma vez)

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome sugerido: `urna-am-2026`
3. Visibilidade: **Private** (recomendado)
4. **NÃO** marque "Add README" (já existe aqui)
5. Clique em **Create repository**

---

### 2. Criar projeto no Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **Adicionar projeto** → dê um nome (ex: `urna-am-2026`)
3. Ative o **Google Analytics** se quiser (opcional)
4. Após criar, vá em **Hosting** → **Primeiros passos**
5. Copie o **ID do projeto** (aparece na URL: `console.firebase.google.com/project/SEU-ID/...`)

---

### 3. Editar o arquivo `.firebaserc`

Abra o arquivo `.firebaserc` e substitua `SEU_PROJETO_FIREBASE` pelo ID real do seu projeto:

```json
{
  "projects": {
    "default": "urna-am-2026-xxxxx"
  }
}
```

---

### 4. Gerar a Service Account do Firebase (para o GitHub Actions)

1. No Console Firebase → ⚙️ **Configurações do projeto** → **Contas de serviço**
2. Clique em **Gerar nova chave privada** → baixe o arquivo `.json`
3. Abra o arquivo `.json` e **copie todo o conteúdo**

---

### 5. Adicionar Secrets no GitHub

No repositório GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Crie os 2 secrets abaixo:

| Nome do Secret | Valor |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Cole o conteúdo completo do JSON baixado no passo 4 |
| `FIREBASE_PROJECT_ID` | ID do seu projeto Firebase (ex: `urna-am-2026-xxxxx`) |

---

### 6. Subir o projeto para o GitHub (primeira vez)

Abra o terminal na pasta `urna-am-2026/` e execute:

```bash
git init
git add .
git commit -m "primeiro commit — urna simulada AM 2026"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/urna-am-2026.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

---

## 🔄 Fluxo de trabalho diário (após a configuração inicial)

Sempre que fizer alterações nos arquivos:

```bash
git add .
git commit -m "descrição da alteração"
git push
```

O GitHub Actions detecta o push e faz o deploy automaticamente no Firebase.  
Em ~1 minuto o site já está atualizado em `https://SEU-PROJETO.web.app`

---

## 📲 Instalar como app (PWA)

### Android (Chrome)
- Acesse o site no Chrome
- Toque no menu (⋮) → **Adicionar à tela inicial**
- Ou aguarde o banner automático de instalação

### iOS (Safari)
- Acesse o site no Safari
- Toque no botão **Compartilhar** (□↑) → **Adicionar à Tela de Início**

### Desktop (Chrome/Edge)
- Acesse o site
- Clique no ícone de instalação (📥) na barra de endereços
- Ou menu → **Instalar Urna AM 2026**

---

## 🔐 Segurança

- **Senha do admin:** `Atlanta` (protegida por SHA-256 no código)
- **Bloqueio:** após 5 tentativas erradas, bloqueia por 60 segundos
- **Integridade dos votos:** cada voto é assinado com SHA-256

Para trocar a senha, gere o novo hash SHA-256 e substitua `ADMIN_HASH` no `index.html`:

```bash
# No terminal Linux/Mac:
echo -n "NovaSenha" | sha256sum

# Ou online: https://emn178.github.io/online-tools/sha256.html
```

---

## ⚙️ Monitorar deploys

Acesse: `https://github.com/SEU_USUARIO/urna-am-2026/actions`

Cada push aparece como um workflow. Verde = sucesso. Vermelho = erro (clique para ver o log).
