// ─── QB · Format & shared utility helpers ─────────────────────────────
// Loaded after data.js — exposes window.QB_FMT

const MONTH_NAMES_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const MONTH_NAMES_ES_LONG = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function monthLabel(yyyymm, long=false) {
  const [y,m] = yyyymm.split('-');
  const arr = long ? MONTH_NAMES_ES_LONG : MONTH_NAMES_ES;
  return `${arr[parseInt(m,10)-1]} ${long ? y : y.slice(2)}`;
}

// Convertir kUSD → CLP miles (kCLP) usando TC del mes; si rango, usar promedio
function toCLP(kUSD, monthOrMonths) {
  const TC = window.QB_DATA.TC;
  if (Array.isArray(monthOrMonths)) {
    const avg = monthOrMonths.reduce((a,m)=>a + (TC[m]||940), 0) / monthOrMonths.length;
    return kUSD * avg / 1000; // kUSD * (CLP/USD) → kCLP (dividido 1000 porque kUSD ya es miles)
    // → resultado en MMCLP (millones de CLP)
  }
  return kUSD * (TC[monthOrMonths]||940) / 1000;
}

// Formatear número con separador de miles (es-CL: punto)
function fmtNum(n, decimals=0) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  const fixed = abs.toFixed(decimals);
  const [int, dec] = fixed.split('.');
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return sign + intFmt + (dec ? ',' + dec : '');
}

// Formatear como currency: 'USD' o 'CLP' o 'kUSD' o 'MMCLP'
function fmtMoney(kUSD, currency='USD', monthOrMonths=null, opts={}) {
  if (kUSD === null || kUSD === undefined || isNaN(kUSD)) return '—';
  const compact = opts.compact !== false;
  const showSign = opts.showSign === true;
  const sign = showSign && kUSD > 0 ? '+' : '';
  if (currency === 'USD') {
    // kUSD: si compact y >= 1000, mostrar en MUSD
    if (compact && Math.abs(kUSD) >= 1000) {
      return sign + fmtNum(kUSD/1000, 2) + ' MUSD';
    }
    return sign + fmtNum(kUSD, 0) + ' kUSD';
  } else {
    // CLP
    const mmCLP = monthOrMonths ? toCLP(kUSD, monthOrMonths) : kUSD * 0.940;
    if (compact && Math.abs(mmCLP) >= 1000) {
      return sign + fmtNum(mmCLP/1000, 2) + ' MMM CLP';
    }
    return sign + fmtNum(mmCLP, 0) + ' MM CLP';
  }
}

function fmtPct(n, decimals=1, showSign=false) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const sign = showSign && n > 0 ? '+' : '';
  return sign + fmtNum(n*100, decimals) + '%';
}

// Variación: dado real y base, devuelve objeto con abs y pct
function variance(real, base) {
  const abs = real - base;
  const pct = base !== 0 ? abs / Math.abs(base) : 0;
  return { abs, pct, isPositive: abs >= 0 };
}

// Para gastos, una varianza positiva (gasto > ppto) es MALA. Permite invertir el signo.
function varianceGasto(real, base) {
  const v = variance(real, base);
  v.isPositive = v.abs <= 0; // menos gasto = bueno
  return v;
}

window.QB_FMT = {
  MONTH_NAMES_ES, MONTH_NAMES_ES_LONG,
  monthLabel, toCLP, fmtNum, fmtMoney, fmtPct,
  variance, varianceGasto,
};
