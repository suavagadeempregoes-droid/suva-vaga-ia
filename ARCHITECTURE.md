# ARCHITECTURE — Currículo Irresistível IA

Descrição técnica da infraestrutura e fluxo de dados.

## Visão Geral
O sistema utiliza uma arquitetura **Serverless** e **Decoupled**, focada em custo zero de infraestrutura e alta segurança.

## Componentes
1. **Frontend (GitHub Pages):** Arquivos estáticos (HTML/CSS/JS).
2. **Backend (Google Apps Script):** Lógica de controle de acesso, créditos e integração Hotmart.
3. **Database (Google Sheets):** Armazenamento persistente de usuários e transações.
4. **Proxy IA (Cloudflare Workers):** Camada de segurança para chamadas à API da Anthropic.

## Fluxo de Autenticação
1. Usuário insere E-mail + Código.
2. Frontend chama Apps Script via `fetch` (GET).
3. Apps Script valida na Planilha e retorna JSON com saldo e expiração.

## Fluxo de Geração
1. Frontend chama Apps Script para descontar 20 créditos (POST).
2. Se OK, Frontend chama Cloudflare Worker com dados da vaga.
3. Worker injeta `ANTHROPIC_API_KEY` e chama Claude.
4. Resultado retorna ao Frontend e é exibido ao usuário.
