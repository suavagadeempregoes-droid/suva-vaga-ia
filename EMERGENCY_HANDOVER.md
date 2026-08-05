# EMERGENCY_HANDOVER — SUA VAGA DE EMPREGO

Este documento permite a continuidade imediata do projeto por qualquer agente de IA.

## 1. Estado Atual
O projeto está em fase de **Deploy no GitHub**. As URLs e IDs reais já foram injetados nos arquivos `curriculo-irresistivel-ia.html` e `backend-controle-acesso.gs`.

## 2. Arquivos Existentes
- `curriculo-irresistivel-ia.html` (Frontend - ATUALIZADO)
- `proxy-cloudflare-worker.js` (Proxy IA)
- `backend-controle-acesso.gs` (Google Apps Script - ATUALIZADO)
- `pagina-vendas.html` (Landing Page)
- `email-entrega.md` (Modelo Hotmart)
- `README.md`, `CHANGELOG.md`, `PROJECT_MEMORY.md`, `DEPLOY_STATUS.md`

## 3. Arquivos Faltantes
- Nenhum.

## 4. Estrutura de Pastas
- `/home/ubuntu/` (Raiz).

## 5. Tecnologias
- Frontend: HTML/CSS/JS (Vanilla).
- Backend: Google Apps Script + Google Sheets.
- Proxy: Cloudflare Workers (Anthropic API).
- Deploy: GitHub Pages.

## 6. Variáveis de Ambiente (Injetadas)
- `SHEET_ID`: xxxxxxxxxxxxxxxx
- `SCRIPT_URL`: /exec
- `PROXY_URL`: https://xxxx.workers.dev

## 7. URLs Necessárias
- URL do Google Apps Script: /exec
- URL do Cloudflare Worker: https://xxxx.workers.dev
- URL do GitHub Repository: https://github.com/...

## 8. Pendências
- Realizar o Push no GitHub.
- Ativar GitHub Pages.

## 9. Próxima Tarefa
- Executar os comandos Git para criação do repositório e upload dos arquivos.

## 10. Última Tarefa Concluída
- Injeção de configurações oficiais no código-fonte.

## 11. Checklist de Deploy
- [X] Extrair códigos.
- [X] Gerar documentação.
- [X] Injetar URLs.
- [ ] Criar Repo GitHub.
- [ ] Upload de arquivos.
- [ ] Ativar GitHub Pages.

## 12. Checklist de Testes
- [ ] Validar Webhook Hotmart.
- [ ] Testar consumo de créditos na planilha.
- [ ] Validar geração de PDF.

## 13. Como Continuar
1. Use o `GITHUB_TOKEN` fornecido para autenticar no GitHub CLI.
2. Execute `gh repo create` e faça o push inicial.
3. Informe ao usuário as URLs finais.
