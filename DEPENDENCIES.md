# DEPENDENCIES — SUA VAGA DE EMPREGO (RC-1)

Mapa de interdependência entre os arquivos do projeto.

- **`curriculo-irresistivel-ia.html`**
  - Depende de: `backend-controle-acesso.gs` (via SCRIPT_URL).
  - Depende de: `proxy-cloudflare-worker.js` (via PROXY_URL).
- **`backend-controle-acesso.gs`**
  - Depende de: Google Sheets (via SHEET_ID).
- **`proxy-cloudflare-worker.js`**
  - Depende de: Anthropic API (via ANTHROPIC_API_KEY).
- **`pagina-vendas.html`**
  - Depende de: Checkout Hotmart (via link de compra).
- **`email-entrega.md`**
  - Depende de: `curriculo-irresistivel-ia.html` (via URL da ferramenta).
- **Documentação e Kits**
  - Dependem de: Todos os arquivos de código para precisão técnica.
