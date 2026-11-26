/* Óticas Franco · recebe os agendamentos do site e grava na planilha do adm.
   Só quem é dono da planilha vê os dados. O site só consegue ADICIONAR linhas
   e consultar quantos horários estão ocupados (sem nome nem telefone). */
const SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA';
const CAP = 2;            // clientes por horário
const LIMITE_FONE = 3;    // pedidos por telefone a cada 6 horas

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.site) return out({ ok: false });                       // armadilha anti-robô
    const nome = String(d.nome || '').trim().slice(0, 80);
    const fone = String(d.whatsapp || '').replace(/\D/g, '').slice(0, 13);
    if (nome.length < 2 || fone.length < 10 ||
        !/^\d{4}-\d{2}-\d{2}$/.test(d.dia) || !/^\d{2}:\d{2}$/.test(d.hora)) return out({ ok: false, erro: 'dados' });
    const cache = CacheService.getScriptCache(), k = 'f' + fone, c = +(cache.get(k) || 0);
    if (c >= LIMITE_FONE) return out({ ok: false, erro: 'limite' });
    const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if ((ocupados(sh)[d.dia + '_' + d.hora.replace(':', '')] || 0) >= CAP) return out({ ok: false, erro: 'lotado' });
    sh.appendRow([new Date(), limpa(d.id), "'" + d.dia, "'" + d.hora, limpa(nome), "'" + fone,
      limpa((d.servicos || []).join(', ')), limpa((d.pecas || []).join(', ')), limpa(d.obs), 'novo', limpa(d.origem)]);
    cache.put(k, String(c + 1), 21600);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false });
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.slots) {
    return out({ slots: ocupados(SpreadsheetApp.openById(SHEET_ID).getSheets()[0]) });
  }
  return out({ ok: true });
}

function ocupados(sh) {
  const t = {};
  sh.getDataRange().getValues().slice(1).forEach(r => {
    if (String(r[9]).toLowerCase() === 'cancelado') return;
    const key = String(r[2]).replace(/^'/, '') + '_' + String(r[3]).replace(/^'/, '').replace(':', '');
    t[key] = (t[key] || 0) + 1;
  });
  return t;
}

// impede que um texto vire fórmula na planilha
function limpa(v) { let s = String(v == null ? '' : v).slice(0, 400); return /^[=+\-@]/.test(s) ? "'" + s : s; }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
