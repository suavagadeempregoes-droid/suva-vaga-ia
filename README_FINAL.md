# GUIA DE RESTAURAÇÃO — SUA VAGA DE EMPREGO

Este guia explica como restaurar o projeto **Currículo Irresistível IA** do zero utilizando os arquivos deste backup.

## 1. Estrutura do Backup
- `/` : Códigos-fonte (.html, .js, .gs)
- `/docs` : Manuais e documentação técnica.
- `EMERGENCY_HANDOVER.md` : Resumo do estado atual para IAs.

## 2. Passo a Passo para Restauração

### A. Banco de Dados (Google Sheets)
1. Crie uma planilha e renomeie a aba para `acessos`.
2. Cole os cabeçalhos: `email | codigo | data_compra | data_expiracao | creditos_restantes | status`.
3. Copie o ID da planilha.

### B. Backend (Google Apps Script)
1. Na planilha, abra o Apps Script.
2. Cole o conteúdo de `backend-controle-acesso.gs`.
3. Insira o ID da planilha na constante `SHEET_ID`.
4. Implante como Web App (Acesso: Qualquer pessoa).
5. Copie a URL `/exec`.

### C. Proxy (Cloudflare Worker)
1. Crie um Worker no Cloudflare.
2. Cole o conteúdo de `proxy-cloudflare-worker.js`.
3. Nas configurações do Worker, adicione a variável de ambiente `ANTHROPIC_API_KEY`.
4. Copie a URL do Worker.

### D. Frontend (Hospedagem)
1. No arquivo `curriculo-irresistivel-ia.html`, atualize as constantes `SCRIPT_URL` e `PROXY_URL` com os links obtidos nos passos anteriores.
2. Hospede este arquivo e a `pagina-vendas.html` no GitHub Pages ou qualquer servidor estático.

## 3. Configuração de Vendas (Hotmart)
1. No painel da Hotmart, cadastre a URL do Apps Script no Webhook (Postback) para "Compra Aprovada".
2. Configure o e-mail de entrega usando o modelo `email-entrega.md`.

## 4. Suporte
Este projeto foi desenvolvido para ser autossuficiente. Em caso de dúvidas, consulte o `PROJECT_MEMORY.md` para entender as decisões de arquitetura.
