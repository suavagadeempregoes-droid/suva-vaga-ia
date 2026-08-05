# GUIA DE RESTAURAÇÃO — Currículo Irresistível IA

Procedimento de emergência para restaurar o sistema.

## 1. Recuperar Banco de Dados
- Se a planilha for apagada, restaure-a via lixeira do Google Drive ou crie uma nova e importe o backup (se houver).
- Atualize o `SHEET_ID` no Apps Script se criar uma nova planilha.

## 2. Recuperar Backend
- Crie um novo script e cole o código de `backend-controle-acesso.gs`.
- Refaça a implantação e atualize a URL no frontend e no Hotmart.

## 3. Recuperar Proxy
- Crie um novo Worker e cole o código de `proxy-cloudflare-worker.js`.
- Reinsira a `ANTHROPIC_API_KEY`.
- Atualize a URL no frontend.
