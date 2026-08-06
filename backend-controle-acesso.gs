/**
 * BACKEND DE CONTROLE DE ACESSO — Currículo Irresistível IA
 * Stack: Google Apps Script + Google Sheets (grátis)
 *
 * ===================== COMO IMPLANTAR =====================
 * 1. Crie uma Planilha Google nova.
 * 2. Renomeie a primeira aba para: acessos
 * 3. Na linha 1, coloque os cabeçalhos (uma coluna cada):
 *    email | codigo | data_compra | data_expiracao | creditos_restantes | status
 * 4. Na planilha: Extensões > Apps Script.
 * 5. Apague o código padrão e cole ESTE arquivo inteiro.
 * 6. Troque SHEET_ID abaixo pelo ID da sua planilha
 *    (fica na URL: docs.google.com/spreadsheets/d/ESTE_TRECHO/edit)
 * 7. Clique em Implantar > Nova implantação > tipo "Aplicativo da Web".
 *    - Executar como: Eu (seu e-mail)
 *    - Quem pode acessar: Qualquer pessoa
 * 8. Copie a URL gerada (termina em /exec). Essa é a SCRIPT_URL
 *    que você vai colar no arquivo HTML da ferramenta.
 * 9. No Hotmart: Ferramentas > Webhook (Postback) > cadastre essa
 *    mesma URL para o evento "Compra Aprovada".
 *    IMPORTANTE: o formato exato do JSON que o Hotmart envia pode
 *    variar por versão do Postback. Depois de configurar, faça uma
 *    compra de teste e olhe em Execuções (no editor do Apps Script)
 *    o conteúdo de "payload recebido" nos logs — ajuste a função
 *    extrairEmailHotmart() abaixo se o caminho do e-mail for diferente.
 * ============================================================
 */

const SHEET_ID = 'xxxxxxxxxxxxxxxx';
const SHEET_NAME = 'acessos';
const DIAS_VALIDADE = 30;
const CREDITOS_INICIAIS = 100;
const CUSTO_POR_GERACAO = 20;

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'validar') {
    return validar(e.parameter.email, e.parameter.codigo);
  }
  return jsonResponse({ ok: false, motivo: 'ação inválida' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, motivo: 'corpo inválido' });
  }

  if (body.action === 'consumir_credito') {
    return consumirCredito(body.email, body.codigo);
  }

  // Caso contrário, assume que é o webhook do Hotmart avisando de uma compra aprovada
  Logger.log('payload recebido: ' + JSON.stringify(body));
  const email = extrairEmailHotmart(body);
  if (!email) return jsonResponse({ ok: false, motivo: 'email não encontrado no payload' });
  return registrarCompra(email);
}

function extrairEmailHotmart(body) {
  // Tenta os caminhos mais comuns do Postback do Hotmart. Ajuste aqui se necessário
  // depois de olhar o log de uma compra de teste.
  return (
    (body.data && body.data.buyer && body.data.buyer.email) ||
    (body.buyer && body.buyer.email) ||
    body.email ||
    null
  );
}

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function gerarCodigo() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function registrarCompra(emailBruto) {
  const email = emailBruto.toLowerCase().trim();
  const sheet = getSheet();
  const codigo = gerarCodigo();
  const hoje = new Date();
  const expira = new Date(hoje.getTime() + DIAS_VALIDADE * 24 * 60 * 60 * 1000);

  sheet.appendRow([email, codigo, hoje, expira, CREDITOS_INICIAIS, 'ativo']);

  try {
    MailApp.sendEmail(
      email,
      'Seu acesso ao Currículo Irresistível IA',
      'Olá!\n\nSeu código de acesso é: ' + codigo +
      '\n\nUse seu e-mail (' + email + ') + este código na ferramenta.' +
      '\nVocê tem 100 créditos, e cada currículo gerado consome 20 créditos (ou seja, até 5 currículos).' +
      '\nVálido por 30 dias.\n\nBoa sorte na sua candidatura!'
    );
  } catch (err) {
    Logger.log('Falha ao enviar e-mail: ' + err);
  }

  return jsonResponse({ ok: true, codigo: codigo });
}

function encontrarLinha(email, codigo) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase().trim() === email && String(data[i][1]).toUpperCase().trim() === codigo) {
      return { linha: i + 1, dados: data[i] };
    }
  }
  return null;
}

function validar(emailBruto, codigoBruto) {
  const email = (emailBruto || '').toLowerCase().trim();
  const codigo = (codigoBruto || '').toUpperCase().trim();
  if (!email || !codigo) return jsonResponse({ ok: false, motivo: 'dados_incompletos' });

  const achado = encontrarLinha(email, codigo);
  if (!achado) return jsonResponse({ ok: false, motivo: 'nao_encontrado' });

  const [, , , dataExpiracao, creditos, status] = achado.dados;

  if (status !== 'ativo') return jsonResponse({ ok: false, motivo: 'cancelado' });
  if (new Date() > new Date(dataExpiracao)) return jsonResponse({ ok: false, motivo: 'expirado' });
  if (creditos < CUSTO_POR_GERACAO) return jsonResponse({ ok: false, motivo: 'sem_creditos' });

  return jsonResponse({
    ok: true,
    creditos_restantes: creditos,
    expira_em: new Date(dataExpiracao).toISOString()
  });
}

function consumirCredito(emailBruto, codigoBruto) {
  const email = (emailBruto || '').toLowerCase().trim();
  const codigo = (codigoBruto || '').toUpperCase().trim();

  const achado = encontrarLinha(email, codigo);
  if (!achado) return jsonResponse({ ok: false, motivo: 'nao_encontrado' });

  const [, , , dataExpiracao, creditos, status] = achado.dados;
  if (status !== 'ativo') return jsonResponse({ ok: false, motivo: 'cancelado' });
  if (new Date() > new Date(dataExpiracao)) return jsonResponse({ ok: false, motivo: 'expirado' });
  if (creditos < CUSTO_POR_GERACAO) return jsonResponse({ ok: false, motivo: 'sem_creditos' });

  const novoSaldo = creditos - CUSTO_POR_GERACAO;
  getSheet().getRange(achado.linha, 5).setValue(novoSaldo);

  return jsonResponse({ ok: true, creditos_restantes: novoSaldo });
}
