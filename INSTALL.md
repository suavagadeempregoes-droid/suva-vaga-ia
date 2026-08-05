# GUIA DE INSTALAÇÃO — Currículo Irresistível IA

Siga estes passos para instalar o ecossistema completo do zero.

## 1. Banco de Dados (Google Sheets)
- Crie uma planilha no Google Sheets.
- Renomeie a primeira aba para `acessos`.
- Adicione os cabeçalhos: `email | codigo | data_compra | data_expiracao | creditos_restantes | status`.

## 2. Backend (Google Apps Script)
- Na planilha, vá em Extensões > Apps Script.
- Cole o conteúdo de `backend-controle-acesso.gs`.
- Insira o ID da sua planilha na variável `SHEET_ID`.
- Implante como "Aplicativo da Web" (Executar como: Eu / Acesso: Qualquer pessoa).

## 3. Proxy (Cloudflare Workers)
- Crie um Worker no Cloudflare.
- Cole o conteúdo de `proxy-cloudflare-worker.js`.
- Adicione a variável de ambiente `ANTHROPIC_API_KEY` nas configurações do Worker.

## 4. Frontend (Hospedagem)
- No arquivo `curriculo-irresistivel-ia.html`, insira a URL do Apps Script e a URL do Worker.
- Hospede os arquivos `.html` no GitHub Pages ou similar.

## 5. Integração Hotmart
- Cadastre a URL do Apps Script no Webhook da Hotmart para o evento "Compra Aprovada".
- Configure o e-mail de entrega usando o modelo `email-entrega.md`.
