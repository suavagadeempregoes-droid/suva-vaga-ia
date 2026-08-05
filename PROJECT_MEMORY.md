# PROJECT_MEMORY — SUA VAGA DE EMPREGO

Este documento registra as decisões técnicas e o contexto do desenvolvimento para futuras manutenções.

## Contexto do Projeto
O objetivo é criar uma solução de baixo custo operacional (utilizando serviços gratuitos como Google Sheets e GitHub Pages) para vender acesso a uma ferramenta de otimização de currículos por IA.

## Decisões Técnicas
- **Google Sheets como DB:** Escolhido pela facilidade de manutenção pelo proprietário e custo zero.
- **Cloudflare Workers:** Utilizado como camada de segurança para evitar que a `ANTHROPIC_API_KEY` seja exposta no frontend.
- **JavaScript Vanilla:** Optado para evitar dependências pesadas e garantir carregamento instantâneo em qualquer dispositivo.
- **Método A.R.T.E.®:** Estrutura de prompt focada em resultados práticos e não apenas em "embelezar" o texto.

## Fluxo de Dados
1. Compra no Hotmart -> Webhook -> Apps Script (Cria acesso na Planilha).
2. Apps Script envia e-mail com código de acesso.
3. Usuário entra na Ferramenta -> Valida e-mail/código -> Consome créditos.
4. Ferramenta chama Cloudflare Worker -> Worker chama Anthropic -> Retorna currículo.

## Pendências
- Configuração final das URLs após deploy.
- Cadastro manual da chave API no Cloudflare.
