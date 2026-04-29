// ─── QB · Variant A — Terminal (Bloomberg-style) ───────────────────────
// Dense monospace, dark, for CFO/Controller daily use
// Loaded after data.js + format.js

const {
  useState: useStateA,
  useMemo: useMemoA,
  useEffect: useEffectA,
  useRef: useRefA
} = React;
const DA = window.QB_DATA;
const FA = window.QB_FMT;

// localStorage-backed state hook
function usePersistA(key, initial) {
  const fullKey = 'qb.a.' + key;
  const [v, setV] = useStateA(() => {
    try {
      const raw = localStorage.getItem(fullKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffectA(() => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(v));
    } catch (e) {}
  }, [fullKey, v]);
  return [v, setV];
}

// ─── Color palette (terminal) ──────────────────────────────────────────
const TPAL_A = {
  bg: '#06070a',
  panel: '#0c0e13',
  panel2: '#10131a',
  border: '#1c2029',
  borderHi: '#2a2f3c',
  text: '#e7eaf0',
  textDim: '#7d8597',
  textMute: '#4a5061',
  amber: '#ffb000',
  // Bloomberg signature
  amberDim: '#7a5500',
  green: '#3df09a',
  greenDim: '#1f6e4a',
  red: '#ff4d6d',
  redDim: '#7a2030',
  cyan: '#5ad7ff',
  blue: '#3b82f6'
};

// ─── Header / Status bar ───────────────────────────────────────────────
function StatusBar({
  now,
  ticker
}) {
  const [time, setTime] = useStateA(new Date());
  useEffectA(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '10px 18px',
      borderBottom: `1px solid ${TPAL_A.border}`,
      background: TPAL_A.panel,
      fontFamily: 'DM Mono, monospace',
      fontSize: 11,
      color: TPAL_A.textDim,
      letterSpacing: 0.4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      background: TPAL_A.amber,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 600
    }
  }, "QB"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text
    }
  }, "QUIBORAX TERMINAL"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "v2.6.1")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "USR "), "g.gonzalez@quiborax.cl"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "SES "), hh, ":", mm, ":", ss), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "TC "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber
    }
  }, DA.TC['2026-03'])), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.green
    }
  }, "\u25CF LIVE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (confirm('¿Restablecer comentarios y acciones a los valores iniciales? Se perderán cambios locales.')) {
        ['comments', 'acciones', 'currency', 'period'].forEach(k => localStorage.removeItem('qb.a.' + k));
        location.reload();
      }
    },
    style: {
      background: 'transparent',
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.textMute,
      fontFamily: 'inherit',
      fontSize: 10,
      padding: '3px 8px',
      cursor: 'pointer',
      letterSpacing: 0.5
    },
    title: "Borrar cambios locales (comentarios, acciones)"
  }, "RESET"));
}

// ─── Command bar (selectores) ──────────────────────────────────────────
function CommandBar({
  view,
  setView,
  currency,
  setCurrency,
  period,
  setPeriod
}) {
  const tabs = [{
    id: 'main',
    label: 'EERR'
  }, {
    id: 'evol',
    label: 'EVOLUCIÓN'
  }, {
    id: 'var',
    label: 'VARIANZAS'
  }, {
    id: 'costo',
    label: 'COSTO'
  }, {
    id: 'mix',
    label: 'LÍNEAS'
  }, {
    id: 'tc',
    label: 'SENS. TC'
  }, {
    id: 'act',
    label: 'ACCIONES'
  }];
  const periods = [{
    id: 'mes',
    label: 'MES'
  }, {
    id: 'ytd',
    label: 'YTD'
  }, {
    id: 'fc',
    label: 'FC 3+9'
  }, {
    id: '12m',
    label: '12M'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      borderBottom: `1px solid ${TPAL_A.border}`,
      background: TPAL_A.bg,
      fontFamily: 'DM Mono, monospace',
      fontSize: 11.5,
      letterSpacing: 0.6
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setView(t.id),
    style: {
      padding: '12px 18px',
      background: view === t.id ? TPAL_A.panel : 'transparent',
      color: view === t.id ? TPAL_A.amber : TPAL_A.textDim,
      border: 'none',
      borderRight: `1px solid ${TPAL_A.border}`,
      borderBottom: view === t.id ? `2px solid ${TPAL_A.amber}` : '2px solid transparent',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      letterSpacing: 'inherit',
      cursor: 'pointer',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      marginRight: 6
    }
  }, String(i + 1).padStart(2, '0')), t.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      marginRight: 10
    }
  }, "PERIODO"), periods.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => setPeriod(p.id),
    style: {
      padding: '6px 11px',
      background: period === p.id ? TPAL_A.amberDim : TPAL_A.panel2,
      color: period === p.id ? '#000' : TPAL_A.textDim,
      border: `1px solid ${period === p.id ? TPAL_A.amber : TPAL_A.border}`,
      marginLeft: -1,
      fontFamily: 'inherit',
      fontSize: 10.5,
      letterSpacing: 0.5,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, p.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      padding: '0 12px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      marginRight: 10
    }
  }, "CCY"), ['USD', 'CLP'].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCurrency(c),
    style: {
      padding: '6px 11px',
      background: currency === c ? TPAL_A.amberDim : TPAL_A.panel2,
      color: currency === c ? '#000' : TPAL_A.textDim,
      border: `1px solid ${currency === c ? TPAL_A.amber : TPAL_A.border}`,
      marginLeft: -1,
      fontFamily: 'inherit',
      fontSize: 10.5,
      letterSpacing: 0.5,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, c))));
}

// ─── Helper: get months & label for period ─────────────────────────────
function getPeriodInfo(period) {
  if (period === 'mes') return {
    real: ['2026-03'],
    ppto: ['2026-03'],
    lastYear: ['2025-03'],
    label: 'MAR 2026'
  };
  if (period === 'ytd') return {
    real: DA.months2026Real,
    ppto: DA.months2026Real,
    lastYear: DA.months2026Real.map(m => '2025-' + m.split('-')[1]),
    label: 'YTD 2026 (ENE-MAR)'
  };
  if (period === 'fc') return {
    real: DA.months2026All,
    ppto: DA.months2026All,
    lastYear: DA.MONTHS_REAL.filter(m => m.startsWith('2025')),
    label: 'FC 3+9 · FY 2026',
    forecast: true
  };
  if (period === '12m') return {
    real: DA.monthsLast12,
    ppto: DA.monthsLast12,
    lastYear: [],
    label: 'ÚLTIMOS 12 MESES'
  };
  return {
    real: ['2026-03'],
    ppto: ['2026-03'],
    lastYear: ['2025-03'],
    label: 'MAR 2026'
  };
}
function getAggregates(period) {
  const info = getPeriodInfo(period);
  const real = DA.aggRange(info.real, info.forecast ? 'fc' : 'real');
  const ppto = DA.aggRange(info.ppto, 'ppto');
  const lastYr = info.lastYear.length ? DA.aggRange(info.lastYear, 'real') : null;
  return {
    real,
    ppto,
    lastYr,
    info
  };
}

// ─── KPI strip ─────────────────────────────────────────────────────────
function KpiStrip({
  period,
  currency
}) {
  const {
    real,
    ppto,
    lastYr,
    info
  } = getAggregates(period);
  const months = info.real;
  const kpis = [{
    k: 'INGRESOS',
    v: real.ingresos,
    base: ppto.ingresos,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.ingresos,
    fmt: 'money'
  }, {
    k: 'M.BRUTO',
    v: real.margenBruto,
    base: ppto.margenBruto,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.margenBruto,
    fmt: 'money'
  }, {
    k: 'M.BRUTO %',
    v: real.margenBrutoPct,
    base: ppto.margenBrutoPct,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.margenBrutoPct,
    fmt: 'pct'
  }, {
    k: 'EBITDA',
    v: real.ebitda,
    base: ppto.ebitda,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.ebitda,
    fmt: 'money'
  }, {
    k: 'EBITDA %',
    v: real.ebitdaPct,
    base: ppto.ebitdaPct,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.ebitdaPct,
    fmt: 'pct'
  }, {
    k: 'RES.OPER.',
    v: real.resOperacional,
    base: ppto.resOperacional,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.resOperacional,
    fmt: 'money'
  }, {
    k: 'UTILIDAD',
    v: real.utilidad,
    base: ppto.utilidad,
    ya: lastYr === null || lastYr === void 0 ? void 0 : lastYr.utilidad,
    fmt: 'money'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${kpis.length}, 1fr)`,
      gap: 1,
      background: TPAL_A.border,
      borderBottom: `1px solid ${TPAL_A.border}`
    }
  }, kpis.map(k => {
    const v = k.fmt === 'pct' ? k.base !== 0 ? k.v - k.base : 0 : FA.variance(k.v, k.base).abs;
    const pct = k.fmt === 'pct' ? v : FA.variance(k.v, k.base).pct;
    const isGood = v >= 0;
    const valStr = k.fmt === 'pct' ? FA.fmtPct(k.v, 1) : FA.fmtMoney(k.v, currency, months);
    const deltaStr = k.fmt === 'pct' ? FA.fmtPct(v, 1, true) + ' pp' : FA.fmtPct(pct, 1, true);
    return /*#__PURE__*/React.createElement("div", {
      key: k.k,
      style: {
        background: TPAL_A.panel,
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 9.5,
        color: TPAL_A.textMute,
        letterSpacing: 0.8,
        marginBottom: 6
      }
    }, k.k), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 18,
        color: TPAL_A.text,
        fontWeight: 600,
        letterSpacing: -0.3
      }
    }, valStr), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 10.5,
        color: isGood ? TPAL_A.green : TPAL_A.red,
        marginTop: 5,
        letterSpacing: 0.4
      }
    }, isGood ? '▲' : '▼', " ", deltaStr, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textMute
      }
    }, "vs PPTO")));
  }));
}

// ─── EERR Table ────────────────────────────────────────────────────────
function EerrTable({
  period,
  currency,
  comments,
  setComments
}) {
  const {
    real,
    ppto,
    lastYr,
    info
  } = getAggregates(period);
  const months = info.real;
  const [editing, setEditing] = useStateA(null);
  const fmt = v => FA.fmtMoney(v, currency, months);
  const fmtP = v => FA.fmtPct(v, 1);
  const showLY = !!lastYr;
  const lines = [{
    k: 'ingresos',
    label: 'Ingresos por ventas',
    real: real.ingresos,
    ppto: ppto.ingresos,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.ingresos,
    bold: true,
    bg: true,
    isExpense: false
  }, {
    k: 'costoVentas',
    label: '(–) Costo de ventas',
    real: -real.costoVentas,
    ppto: -ppto.costoVentas,
    ly: lastYr ? -lastYr.costoVentas : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'margenBruto',
    label: 'Margen Bruto',
    real: real.margenBruto,
    ppto: ppto.margenBruto,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.margenBruto,
    bold: true,
    bg: true,
    isExpense: false,
    sub: fmtP(real.margenBrutoPct)
  }, {
    k: 'gastosAdmin',
    label: '(–) Gastos Administración',
    real: -real.gastosAdmin,
    ppto: -ppto.gastosAdmin,
    ly: lastYr ? -lastYr.gastosAdmin : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'gastosVentas',
    label: '(–) Gastos de Venta',
    real: -real.gastosVentas,
    ppto: -ppto.gastosVentas,
    ly: lastYr ? -lastYr.gastosVentas : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'depreciacion',
    label: '(–) Depreciación',
    real: -real.depreciacion,
    ppto: -ppto.depreciacion,
    ly: lastYr ? -lastYr.depreciacion : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'resOperacional',
    label: 'Resultado Operacional',
    real: real.resOperacional,
    ppto: ppto.resOperacional,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.resOperacional,
    bold: true,
    bg: true,
    isExpense: false
  }, {
    k: 'ebitda',
    label: 'EBITDA',
    real: real.ebitda,
    ppto: ppto.ebitda,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.ebitda,
    bold: true,
    bg: true,
    isExpense: false,
    sub: fmtP(real.ebitdaPct)
  }, {
    k: 'difCambio',
    label: 'Diferencia de cambio',
    real: real.difCambio,
    ppto: ppto.difCambio,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.difCambio,
    bold: false,
    bg: false,
    isExpense: false,
    signed: true
  }, {
    k: 'gastosFin',
    label: '(–) Gastos Financieros',
    real: -real.gastosFin,
    ppto: -ppto.gastosFin,
    ly: lastYr ? -lastYr.gastosFin : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'rai',
    label: 'Resultado antes de impto.',
    real: real.rai,
    ppto: ppto.rai,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.rai,
    bold: false,
    bg: false,
    isExpense: false
  }, {
    k: 'impuesto',
    label: '(–) Impuesto a la renta',
    real: -real.impuesto,
    ppto: -ppto.impuesto,
    ly: lastYr ? -lastYr.impuesto : null,
    bold: false,
    bg: false,
    isExpense: true,
    invertSign: true
  }, {
    k: 'utilidad',
    label: 'UTILIDAD DEL EJERCICIO',
    real: real.utilidad,
    ppto: ppto.utilidad,
    ly: lastYr === null || lastYr === void 0 ? void 0 : lastYr.utilidad,
    bold: true,
    bg: true,
    isExpense: false,
    sub: fmtP(real.utilidadPct),
    final: true
  }];
  const headerCell = {
    padding: '10px 14px',
    fontFamily: 'DM Mono',
    fontSize: 10,
    color: TPAL_A.textMute,
    letterSpacing: 0.8,
    fontWeight: 500,
    textAlign: 'right',
    borderBottom: `1px solid ${TPAL_A.borderHi}`
  };
  const cell = {
    padding: '9px 14px',
    fontFamily: 'DM Mono',
    fontSize: 12.5,
    color: TPAL_A.text,
    textAlign: 'right',
    borderBottom: `1px solid ${TPAL_A.border}`,
    fontVariantNumeric: 'tabular-nums'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text,
      letterSpacing: 0.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600
    }
  }, "EERR"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber
    }
  }, info.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, currency === 'USD' ? 'kUSD' : 'MM CLP'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 10
    }
  }, "FUENTE: SAP/EXCEL JF \xB7 ACT MAR 2026")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: TPAL_A.panel2
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell,
      textAlign: 'left',
      width: '34%'
    }
  }, "L\xCDNEA"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell
    }
  }, "REAL"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell
    }
  }, "PPTO"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell,
      color: TPAL_A.amber
    }
  }, "VAR ABS"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell,
      color: TPAL_A.amber
    }
  }, "VAR %"), showLY && /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell
    }
  }, "A\xD1O ANT."), showLY && /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell
    }
  }, "VAR YA"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...headerCell,
      width: '24px'
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, lines.map(l => {
    const v = FA.variance(l.real, l.ppto);
    const isGood = l.invertSign ? v.abs >= 0 : v.abs >= 0;
    const vYA = l.ly !== null && l.ly !== undefined ? FA.variance(l.real, l.ly) : null;
    const isGoodYA = vYA ? l.invertSign ? vYA.abs >= 0 : vYA.abs >= 0 : null;
    const hasComment = !!comments[l.k];
    return /*#__PURE__*/React.createElement("tr", {
      key: l.k,
      style: {
        background: l.bg ? TPAL_A.panel2 : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        textAlign: 'left',
        color: l.bold ? TPAL_A.amber : TPAL_A.text,
        fontWeight: l.bold ? 700 : 400,
        letterSpacing: l.final ? 0.6 : 0,
        borderTop: l.final ? `1px solid ${TPAL_A.amberDim}` : undefined
      }
    }, l.label, l.sub && /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textMute,
        marginLeft: 8,
        fontSize: 11
      }
    }, l.sub)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        fontWeight: l.bold ? 700 : 400
      }
    }, fmt(l.real)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: TPAL_A.textDim
      }
    }, fmt(l.ppto)), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: isGood ? TPAL_A.green : TPAL_A.red
      }
    }, (v.abs >= 0 ? '+' : '') + FA.fmtMoney(v.abs, currency, months).replace('+', '')), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: isGood ? TPAL_A.green : TPAL_A.red
      }
    }, FA.fmtPct(v.pct, 1, true)), showLY && /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: TPAL_A.textDim
      }
    }, l.ly !== null && l.ly !== undefined ? fmt(l.ly) : '—'), showLY && /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        color: isGoodYA === null ? TPAL_A.textMute : isGoodYA ? TPAL_A.green : TPAL_A.red
      }
    }, vYA ? FA.fmtPct(vYA.pct, 1, true) : '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        ...cell,
        padding: '0 8px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditing(l.k),
      style: {
        background: 'transparent',
        border: `1px solid ${hasComment ? TPAL_A.amber : TPAL_A.border}`,
        color: hasComment ? TPAL_A.amber : TPAL_A.textMute,
        fontFamily: 'DM Mono',
        fontSize: 10,
        padding: '2px 6px',
        cursor: 'pointer'
      },
      title: hasComment ? comments[l.k] : 'Agregar nota'
    }, hasComment ? '●' : '+')));
  }))), editing && /*#__PURE__*/React.createElement(CommentEditor, {
    line: editing,
    value: comments[editing] || '',
    onSave: v => {
      setComments({
        ...comments,
        [editing]: v
      });
      setEditing(null);
    },
    onClose: () => setEditing(null)
  }));
}
function CommentEditor({
  line,
  value,
  onSave,
  onClose
}) {
  const [v, setV] = useStateA(value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 540,
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.amber}`,
      fontFamily: 'DM Mono'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.amber,
      fontSize: 11,
      letterSpacing: 0.6
    }
  }, '>', " NOTA \xB7 ", line.toUpperCase()), /*#__PURE__*/React.createElement("textarea", {
    value: v,
    onChange: e => setV(e.target.value),
    autoFocus: true,
    style: {
      width: '100%',
      height: 160,
      background: TPAL_A.bg,
      color: TPAL_A.text,
      border: 'none',
      padding: '14px',
      fontFamily: 'inherit',
      fontSize: 13,
      outline: 'none',
      resize: 'none'
    },
    placeholder: "Escribe tu an\xE1lisis aqu\xED..."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      borderTop: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      flex: 1,
      padding: '10px',
      background: 'transparent',
      border: 'none',
      borderRight: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.textDim,
      fontFamily: 'inherit',
      fontSize: 11,
      letterSpacing: 0.6,
      cursor: 'pointer'
    }
  }, "ESC \xB7 CANCELAR"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSave(v),
    style: {
      flex: 1,
      padding: '10px',
      background: TPAL_A.amber,
      border: 'none',
      color: '#000',
      fontFamily: 'inherit',
      fontSize: 11,
      letterSpacing: 0.6,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "\u21B5 GUARDAR"))));
}

// ─── Evolución mensual chart ───────────────────────────────────────────
function EvolucionPanel({
  currency
}) {
  const [showFC, setShowFC] = useStateA(true);
  const [showEvents, setShowEvents] = useStateA(true);

  // Real Ene 2025 → Mar 2026 + FC Apr-Dic 2026 (forecast)
  const realMonths = DA.MONTHS_REAL;
  const fcMonths = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'];
  const allMonths = showFC ? [...realMonths, ...fcMonths] : realMonths;
  const data = allMonths.map(m => {
    const isReal = realMonths.includes(m);
    const e = isReal ? DA.calcEERR(m, 'real') : DA.calcEERR(m, 'fc');
    const p = m.startsWith('2026') ? DA.calcEERR(m, 'ppto') : null;
    return {
      m,
      isReal,
      ingresos: (e === null || e === void 0 ? void 0 : e.ingresos) || 0,
      ebitda: (e === null || e === void 0 ? void 0 : e.ebitda) || 0,
      ebitdaPct: (e === null || e === void 0 ? void 0 : e.ebitdaPct) || 0,
      utilidad: (e === null || e === void 0 ? void 0 : e.utilidad) || 0,
      ppto: p === null || p === void 0 ? void 0 : p.ebitda,
      pptoIngresos: p === null || p === void 0 ? void 0 : p.ingresos
    };
  });
  const maxIng = Math.max(...data.map(d => Math.max(d.ingresos, d.pptoIngresos || 0)));
  const maxEbi = Math.max(...data.map(d => Math.max(d.ebitda, d.ppto || 0)));

  // Eventos calibrados (anclas en mes-año)
  const events = [{
    m: '2025-03',
    label: 'Cierre auditoría 2024',
    color: TPAL_A.cyan,
    icon: '◆'
  }, {
    m: '2025-07',
    label: 'Embarque récord Brasil',
    color: TPAL_A.green,
    icon: '▲'
  }, {
    m: '2025-09',
    label: 'Ajuste TC histórico (1006)',
    color: TPAL_A.amber,
    icon: '●'
  }, {
    m: '2025-12',
    label: 'Cierre fiscal 2025',
    color: TPAL_A.cyan,
    icon: '◆'
  }, {
    m: '2026-03',
    label: 'Mejor mes histórico',
    color: TPAL_A.green,
    icon: '▲'
  }, {
    m: '2026-04',
    label: 'Inicio FC 3+9',
    color: TPAL_A.amber,
    dashed: true,
    icon: '◇'
  }];

  // Stats strip (totales del rango visible)
  const sumIngReal = data.filter(d => d.isReal).reduce((a, d) => a + d.ingresos, 0);
  const sumIngFC = data.filter(d => !d.isReal).reduce((a, d) => a + d.ingresos, 0);
  const sumEbiReal = data.filter(d => d.isReal).reduce((a, d) => a + d.ebitda, 0);
  const sumEbiFC = data.filter(d => !d.isReal).reduce((a, d) => a + d.ebitda, 0);
  const sumPptoIng = data.reduce((a, d) => a + (d.pptoIngresos || 0), 0);
  const sumPptoEbi = data.reduce((a, d) => a + (d.ppto || 0), 0);
  const realIngMonths = data.filter(d => d.isReal).map(d => d.m);
  const fcIngMonths = data.filter(d => !d.isReal).map(d => d.m);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.textDim
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600,
      letterSpacing: 0.6
    }
  }, "EVOLUCI\xD3N HIST\xD3RICA + FORECAST"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showFC,
    onChange: e => setShowFC(e.target.checked),
    style: {
      accentColor: TPAL_A.amber
    }
  }), /*#__PURE__*/React.createElement("span", null, "Mostrar FC Abr-Dic 2026")), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: showEvents,
    onChange: e => setShowEvents(e.target.checked),
    style: {
      accentColor: TPAL_A.amber
    }
  }), /*#__PURE__*/React.createElement("span", null, "Mostrar eventos"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${showFC ? 4 : 2}, 1fr)`,
      gap: 10
    }
  }, [{
    label: `INGRESO REAL · ${realIngMonths.length}M`,
    v: sumIngReal,
    months: realIngMonths,
    color: TPAL_A.amber,
    sub: `vs Ppto: ${FA.fmtMoney(data.filter(d => d.isReal).reduce((a, d) => a + (d.pptoIngresos || 0), 0), currency, realIngMonths)}`
  }, {
    label: 'EBITDA REAL',
    v: sumEbiReal,
    months: realIngMonths,
    color: TPAL_A.green,
    sub: `Margen: ${FA.fmtPct(sumIngReal ? sumEbiReal / sumIngReal : 0)}`
  }, ...(showFC ? [{
    label: `INGRESO FC · ${fcIngMonths.length}M`,
    v: sumIngFC,
    months: fcIngMonths,
    color: TPAL_A.amberDim,
    sub: `Banda ±10%: ${FA.fmtMoney(sumIngFC * 0.9, currency, fcIngMonths)} – ${FA.fmtMoney(sumIngFC * 1.1, currency, fcIngMonths)}`
  }, {
    label: 'EBITDA FC',
    v: sumEbiFC,
    months: fcIngMonths,
    color: TPAL_A.greenDim,
    sub: `Margen: ${FA.fmtPct(sumIngFC ? sumEbiFC / sumIngFC : 0)}`
  }] : [])].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9.5,
      letterSpacing: 0.8,
      color: TPAL_A.textMute,
      marginBottom: 5
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 18,
      fontWeight: 600,
      color: s.color,
      fontVariantNumeric: 'tabular-nums'
    }
  }, FA.fmtMoney(s.v, currency, s.months)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9.5,
      color: TPAL_A.textDim,
      marginTop: 4
    }
  }, s.sub)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "INGRESOS \xB7 ", data.length, " MESES"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontSize: 11
    }
  }, "\u25A0 REAL"), showFC && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amberDim,
      fontSize: 11
    }
  }, "\u25A8 FORECAST"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.cyan,
      fontSize: 11
    }
  }, "\u25A1 PPTO")), /*#__PURE__*/React.createElement(BarChartV2, {
    data: data.map(d => ({
      x: d.m,
      y: d.ingresos,
      ppto: d.pptoIngresos,
      isReal: d.isReal
    })),
    maxY: maxIng,
    color: TPAL_A.amber,
    pptoColor: TPAL_A.cyan,
    events: showEvents ? events : [],
    currency: currency
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "EBITDA \xB7 REAL/FC vs PPTO"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.green,
      fontSize: 11
    }
  }, "\u25A0 REAL"), showFC && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.greenDim,
      fontSize: 11
    }
  }, "\u25A8 FC"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.cyan,
      fontSize: 11
    }
  }, "\u25A1 PPTO")), /*#__PURE__*/React.createElement(DualBarChartV2, {
    data: data,
    maxY: maxEbi,
    currency: currency,
    events: showEvents ? events : []
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "MARGEN EBITDA % \xB7 TENDENCIA"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 10.5
    }
  }, "Banda objetivo: 12\u201318%")), /*#__PURE__*/React.createElement(SparkLineV2, {
    data: data.map(d => d.ebitdaPct * 100),
    labels: data.map(d => d.m),
    isRealArr: data.map(d => d.isReal)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "INGRESO ACUMULADO 2026 \xB7 REAL/FC vs PPTO"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontSize: 10.5
    }
  }, "\u2501 Real"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amberDim,
      fontSize: 10.5
    }
  }, "\u2505 FC"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.cyan,
      fontSize: 10.5
    }
  }, "\u2504 Ppto")), /*#__PURE__*/React.createElement(CumulativeChart, {
    currency: currency,
    showFC: showFC,
    events: showEvents ? events : []
  })), showEvents && /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9.5,
      letterSpacing: 0.8,
      color: TPAL_A.textMute,
      marginBottom: 10
    }
  }, "EVENTOS \xB7 ANCLAS TEMPORALES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '8px 16px'
    }
  }, events.map((ev, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'DM Mono',
      fontSize: 11,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: ev.color,
      fontSize: 13,
      width: 14
    }
  }, ev.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      minWidth: 60
    }
  }, ev.m), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text
    }
  }, ev.label))))));
}
function BarChartV2({
  data,
  maxY,
  color,
  pptoColor,
  events,
  currency
}) {
  const H = 200;
  const PAD = 32;
  const W = 1000;
  const barW = (W - PAD * 2) / data.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H + 50}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, [0, 0.25, 0.5, 0.75, 1].map(t => /*#__PURE__*/React.createElement("g", {
    key: t
  }, /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    x2: W - PAD,
    y1: H - H * t + 10,
    y2: H - H * t + 10,
    stroke: TPAL_A.border,
    strokeWidth: 1,
    strokeDasharray: t === 0 ? '' : '2,3'
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD - 6,
    y: H - H * t + 14,
    fill: TPAL_A.textMute,
    fontSize: 9,
    fontFamily: "DM Mono",
    textAnchor: "end"
  }, Math.round(maxY * t / 1000), "M"))), (() => {
    const idxFC = data.findIndex(d => !d.isReal);
    if (idxFC < 0) return null;
    const x = PAD + idxFC * barW;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: 5,
      y2: H + 10,
      stroke: TPAL_A.amberDim,
      strokeWidth: 1,
      strokeDasharray: "3,4"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 4,
      y: 14,
      fill: TPAL_A.amberDim,
      fontSize: 9,
      fontFamily: "DM Mono"
    }, "FC \u2192"));
  })(), data.map((d, i) => {
    const h = d.y / maxY * H;
    const hPpto = d.ppto ? d.ppto / maxY * H : 0;
    const x = PAD + i * barW + 2;
    const w = barW - 4;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, d.ppto > 0 && /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: H - hPpto + 10,
      width: w,
      height: hPpto,
      fill: "none",
      stroke: pptoColor,
      strokeWidth: 1,
      strokeDasharray: "2,2",
      opacity: 0.7
    }), /*#__PURE__*/React.createElement("rect", {
      x: x + 1,
      y: H - h + 10,
      width: w - 2,
      height: h,
      fill: color,
      opacity: d.isReal ? i === data.findIndex(dd => !dd.isReal) - 1 ? 1 : 0.85 : 0.35,
      stroke: d.isReal ? 'none' : color,
      strokeWidth: d.isReal ? 0 : 1,
      strokeDasharray: d.isReal ? '' : '2,2'
    }), /*#__PURE__*/React.createElement("text", {
      x: x + w / 2,
      y: H + 24,
      fill: TPAL_A.textDim,
      fontSize: 9,
      fontFamily: "DM Mono",
      textAnchor: "middle"
    }, FA.MONTH_NAMES_ES[parseInt(d.x.split('-')[1]) - 1]), (parseInt(d.x.split('-')[1]) === 1 || i === 0) && /*#__PURE__*/React.createElement("text", {
      x: x + w / 2,
      y: H + 36,
      fill: TPAL_A.textMute,
      fontSize: 8.5,
      fontFamily: "DM Mono",
      textAnchor: "middle",
      fontWeight: 600
    }, d.x.split('-')[0]));
  }), events.map((ev, i) => {
    const idx = data.findIndex(d => d.m === ev.m);
    if (idx < 0) return null;
    const x = PAD + idx * barW + barW / 2;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: 5,
      y2: H + 10,
      stroke: ev.color,
      strokeWidth: 1,
      strokeDasharray: ev.dashed ? '3,3' : 'none',
      opacity: 0.5
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: 8,
      r: 3,
      fill: ev.color
    }), /*#__PURE__*/React.createElement("rect", {
      x: x - 2,
      y: 5,
      width: 4,
      height: 4,
      fill: ev.color
    }), /*#__PURE__*/React.createElement("title", null, ev.label));
  }));
}
function DualBarChartV2({
  data,
  maxY,
  currency,
  events
}) {
  const H = 200;
  const PAD = 32;
  const W = 1000;
  const barW = (W - PAD * 2) / data.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H + 50}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, [0, 0.5, 1].map(t => /*#__PURE__*/React.createElement("line", {
    key: t,
    x1: PAD,
    x2: W - PAD,
    y1: H - H * t + 10,
    y2: H - H * t + 10,
    stroke: TPAL_A.border,
    strokeWidth: 1,
    strokeDasharray: t === 0 ? '' : '2,3'
  })), (() => {
    const idxFC = data.findIndex(d => !d.isReal);
    if (idxFC < 0) return null;
    const x = PAD + idxFC * barW;
    return /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: 5,
      y2: H + 10,
      stroke: TPAL_A.amberDim,
      strokeWidth: 1,
      strokeDasharray: "3,4"
    });
  })(), data.map((d, i) => {
    const hReal = Math.max(0, d.ebitda) / maxY * H;
    const hPpto = d.ppto ? Math.max(0, d.ppto) / maxY * H : 0;
    const x = PAD + i * barW + 3;
    const w = (barW - 6) / 2 - 1;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: H - hReal + 10,
      width: w,
      height: hReal,
      fill: d.isReal ? TPAL_A.green : TPAL_A.greenDim,
      opacity: d.isReal ? 0.95 : 0.5,
      stroke: d.isReal ? 'none' : TPAL_A.green,
      strokeWidth: d.isReal ? 0 : 1,
      strokeDasharray: d.isReal ? '' : '2,2'
    }), d.ppto && /*#__PURE__*/React.createElement("rect", {
      x: x + w + 2,
      y: H - hPpto + 10,
      width: w,
      height: hPpto,
      fill: "none",
      stroke: TPAL_A.cyan,
      strokeWidth: 1.5,
      strokeDasharray: "2,2"
    }), /*#__PURE__*/React.createElement("text", {
      x: x + (barW - 6) / 2,
      y: H + 24,
      fill: TPAL_A.textDim,
      fontSize: 9,
      fontFamily: "DM Mono",
      textAnchor: "middle"
    }, FA.MONTH_NAMES_ES[parseInt(d.m.split('-')[1]) - 1]));
  }), events.map((ev, i) => {
    const idx = data.findIndex(d => d.m === ev.m);
    if (idx < 0) return null;
    const x = PAD + idx * barW + barW / 2;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: 5,
      y2: H + 10,
      stroke: ev.color,
      strokeWidth: 1,
      strokeDasharray: ev.dashed ? '3,3' : 'none',
      opacity: 0.5
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: 8,
      r: 3,
      fill: ev.color
    }));
  }));
}
function SparkLineV2({
  data,
  labels,
  isRealArr
}) {
  var _realPts;
  const W = 1000;
  const H = 140;
  const PAD = 32;
  const min = 0;
  const max = Math.max(...data) * 1.15;
  const range = max - min;
  const pts = data.map((v, i) => {
    const x = PAD + i / (data.length - 1) * (W - PAD * 2);
    const y = PAD + (1 - (v - min) / range) * (H - PAD * 2);
    return [x, y];
  });
  const realPts = pts.filter((_, i) => isRealArr[i]);
  const fcPts = pts.filter((_, i) => !isRealArr[i]);
  const lastRealIdx = isRealArr.lastIndexOf(true);
  const linkPts = lastRealIdx >= 0 && lastRealIdx < pts.length - 1 ? [pts[lastRealIdx], ...fcPts] : [];
  const pathReal = realPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const pathFC = linkPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

  // Banda objetivo 12-18%
  const yTop = PAD + (1 - 18 / range) * (H - PAD * 2);
  const yBot = PAD + (1 - 12 / range) * (H - PAD * 2);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H + 24}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ebitdaGradV2",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: TPAL_A.amber,
    stopOpacity: 0.3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: TPAL_A.amber,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement("rect", {
    x: PAD,
    y: yTop,
    width: W - PAD * 2,
    height: Math.max(0, yBot - yTop),
    fill: TPAL_A.green,
    opacity: 0.06
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    x2: W - PAD,
    y1: yTop,
    y2: yTop,
    stroke: TPAL_A.greenDim,
    strokeWidth: 0.8,
    strokeDasharray: "2,3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    x2: W - PAD,
    y1: yBot,
    y2: yBot,
    stroke: TPAL_A.greenDim,
    strokeWidth: 0.8,
    strokeDasharray: "2,3"
  }), /*#__PURE__*/React.createElement("text", {
    x: W - PAD - 2,
    y: yTop - 3,
    fill: TPAL_A.greenDim,
    fontSize: 8,
    fontFamily: "DM Mono",
    textAnchor: "end"
  }, "18%"), /*#__PURE__*/React.createElement("text", {
    x: W - PAD - 2,
    y: yBot + 10,
    fill: TPAL_A.greenDim,
    fontSize: 8,
    fontFamily: "DM Mono",
    textAnchor: "end"
  }, "12%"), /*#__PURE__*/React.createElement("path", {
    d: pathReal + ` L ${((_realPts = realPts[realPts.length - 1]) === null || _realPts === void 0 ? void 0 : _realPts[0]) || 0},${H - PAD} L ${PAD},${H - PAD} Z`,
    fill: "url(#ebitdaGradV2)"
  }), /*#__PURE__*/React.createElement("path", {
    d: pathReal,
    stroke: TPAL_A.amber,
    strokeWidth: 1.8,
    fill: "none"
  }), pathFC && /*#__PURE__*/React.createElement("path", {
    d: pathFC,
    stroke: TPAL_A.amber,
    strokeWidth: 1.5,
    fill: "none",
    strokeDasharray: "4,3",
    opacity: 0.7
  }), pts.map((p, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: p[0],
    cy: p[1],
    r: isRealArr[i] ? 2.5 : 2,
    fill: isRealArr[i] ? TPAL_A.amber : 'transparent',
    stroke: TPAL_A.amber,
    strokeWidth: 1
  }), i % 2 === 0 && /*#__PURE__*/React.createElement("text", {
    x: p[0],
    y: p[1] - 7,
    fill: TPAL_A.text,
    fontSize: 8.5,
    fontFamily: "DM Mono",
    textAnchor: "middle"
  }, data[i].toFixed(1), "%"), /*#__PURE__*/React.createElement("text", {
    x: p[0],
    y: H + 14,
    fill: TPAL_A.textMute,
    fontSize: 8,
    fontFamily: "DM Mono",
    textAnchor: "middle"
  }, FA.MONTH_NAMES_ES[parseInt(labels[i].split('-')[1]) - 1], labels[i].startsWith('2026') ? '·26' : '·25'))));
}

// ─── CumulativeChart: ingreso acumulado 2026 con FC + banda confianza ───
function CumulativeChart({
  currency,
  showFC,
  events
}) {
  const months2026 = DA.months2026All;
  const realMonths2026 = DA.months2026Real;
  const data = months2026.map((m, i) => {
    const isReal = realMonths2026.includes(m);
    const e = isReal ? DA.calcEERR(m, 'real') : DA.calcEERR(m, 'fc');
    const p = DA.calcEERR(m, 'ppto');
    return {
      m,
      isReal,
      ing: (e === null || e === void 0 ? void 0 : e.ingresos) || 0,
      ppto: (p === null || p === void 0 ? void 0 : p.ingresos) || 0
    };
  });
  // Acumular
  let accReal = 0,
    accFC = 0,
    accPpto = 0;
  const series = data.map((d, i) => {
    if (d.isReal) accReal += d.ing;else accFC += d.ing;
    accPpto += d.ppto;
    return {
      m: d.m,
      isReal: d.isReal,
      acc: accReal + accFC,
      accReal: d.isReal ? accReal : null,
      accFC: !d.isReal ? accReal + accFC : null,
      accPpto
    };
  });
  const lastRealIdx = data.findIndex(d => !d.isReal) - 1;
  const fcStartIdx = data.findIndex(d => !d.isReal);
  const W = 1000,
    H = 240,
    PAD = 42;
  const maxY = Math.max(...series.map(s => Math.max(s.acc, s.accPpto, s.acc * 1.1))) * 1.05;
  const xAt = i => PAD + i / (months2026.length - 1) * (W - PAD * 2);
  const yAt = v => PAD + (1 - v / maxY) * (H - PAD * 2);

  // Path real
  const realPts = series.slice(0, lastRealIdx + 1).map((s, i) => [xAt(i), yAt(s.acc)]);
  const pathReal = realPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  // Path FC (anclar al último real)
  const fcPts = lastRealIdx >= 0 ? [[xAt(lastRealIdx), yAt(series[lastRealIdx].acc)], ...series.slice(fcStartIdx).map((s, i) => [xAt(fcStartIdx + i), yAt(s.acc)])] : [];
  const pathFC = fcPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  // Banda confianza ±10% sobre FC
  const fcBandUp = lastRealIdx >= 0 ? [[xAt(lastRealIdx), yAt(series[lastRealIdx].acc)], ...series.slice(fcStartIdx).map((s, i) => {
    const baseAcc = series[lastRealIdx].acc;
    const fcAdd = s.acc - baseAcc;
    return [xAt(fcStartIdx + i), yAt(baseAcc + fcAdd * 1.1)];
  })] : [];
  const fcBandDn = lastRealIdx >= 0 ? series.slice(fcStartIdx).slice().reverse().map((s, _, arr) => {
    const i = arr.length - 1 - arr.indexOf(s);
    const baseAcc = series[lastRealIdx].acc;
    const fcAdd = s.acc - baseAcc;
    return [xAt(fcStartIdx + i), yAt(baseAcc + fcAdd * 0.9)];
  }).concat([[xAt(lastRealIdx), yAt(series[lastRealIdx].acc)]]) : [];
  const bandPath = [...fcBandUp, ...fcBandDn].map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + ' Z';

  // Path ppto
  const pptoPts = series.map((s, i) => [xAt(i), yAt(s.accPpto)]);
  const pathPpto = pptoPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

  // Gridlines
  const gridSteps = [0, 0.25, 0.5, 0.75, 1];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H + 24}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, gridSteps.map(t => /*#__PURE__*/React.createElement("g", {
    key: t
  }, /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    x2: W - PAD,
    y1: PAD + t * (H - PAD * 2),
    y2: PAD + t * (H - PAD * 2),
    stroke: TPAL_A.border,
    strokeWidth: 1,
    strokeDasharray: t === 1 ? '' : '2,3'
  }), /*#__PURE__*/React.createElement("text", {
    x: PAD - 6,
    y: PAD + t * (H - PAD * 2) + 3,
    fill: TPAL_A.textMute,
    fontSize: 9,
    fontFamily: "DM Mono",
    textAnchor: "end"
  }, Math.round(maxY * (1 - t) / 1000), "M"))), fcStartIdx > 0 && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("line", {
    x1: xAt(fcStartIdx),
    x2: xAt(fcStartIdx),
    y1: PAD,
    y2: H - PAD,
    stroke: TPAL_A.amberDim,
    strokeWidth: 1,
    strokeDasharray: "3,4"
  }), /*#__PURE__*/React.createElement("text", {
    x: xAt(fcStartIdx) + 4,
    y: PAD + 12,
    fill: TPAL_A.amberDim,
    fontSize: 9,
    fontFamily: "DM Mono"
  }, "FC \u2192")), showFC && bandPath && /*#__PURE__*/React.createElement("path", {
    d: bandPath,
    fill: TPAL_A.amber,
    opacity: 0.08
  }), /*#__PURE__*/React.createElement("path", {
    d: pathPpto,
    stroke: TPAL_A.cyan,
    strokeWidth: 1.4,
    fill: "none",
    strokeDasharray: "3,3",
    opacity: 0.85
  }), /*#__PURE__*/React.createElement("path", {
    d: pathReal,
    stroke: TPAL_A.amber,
    strokeWidth: 2,
    fill: "none"
  }), showFC && pathFC && /*#__PURE__*/React.createElement("path", {
    d: pathFC,
    stroke: TPAL_A.amber,
    strokeWidth: 1.6,
    fill: "none",
    strokeDasharray: "5,3",
    opacity: 0.75
  }), series.map((s, i) => {
    if (!showFC && !s.isReal) return null;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: xAt(i),
      cy: yAt(s.acc),
      r: s.isReal ? 3 : 2.5,
      fill: s.isReal ? TPAL_A.amber : 'transparent',
      stroke: TPAL_A.amber,
      strokeWidth: 1
    }));
  }), series.map((s, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: xAt(i),
    y: H - PAD + 18,
    fill: TPAL_A.textMute,
    fontSize: 9,
    fontFamily: "DM Mono",
    textAnchor: "middle"
  }, FA.MONTH_NAMES_ES[parseInt(s.m.split('-')[1]) - 1])), events.filter(e => e.m.startsWith('2026')).map((ev, i) => {
    const idx = months2026.indexOf(ev.m);
    if (idx < 0) return null;
    const x = xAt(idx);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: PAD,
      y2: H - PAD,
      stroke: ev.color,
      strokeWidth: 1,
      strokeDasharray: ev.dashed ? '3,3' : 'none',
      opacity: 0.4
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: PAD - 4,
      r: 3,
      fill: ev.color
    }));
  }), (() => {
    const last = series[series.length - 1];
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("text", {
      x: W - PAD + 4,
      y: yAt(last.acc) + 4,
      fill: TPAL_A.amber,
      fontSize: 10.5,
      fontFamily: "DM Mono",
      fontWeight: 700
    }, FA.fmtMoney(last.acc, currency, months2026)), /*#__PURE__*/React.createElement("text", {
      x: W - PAD + 4,
      y: yAt(last.accPpto) + 4,
      fill: TPAL_A.cyan,
      fontSize: 9.5,
      fontFamily: "DM Mono",
      opacity: 0.85
    }, "Ppto"));
  })());
}
function SparkLine({
  data,
  labels
}) {
  const W = 1000;
  const H = 120;
  const PAD = 30;
  const min = Math.min(...data) * 0.92;
  const max = Math.max(...data) * 1.05;
  const range = max - min;
  const pts = data.map((v, i) => {
    const x = PAD + i / (data.length - 1) * (W - PAD * 2);
    const y = PAD + (1 - (v - min) / range) * (H - PAD * 2);
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const areaPath = path + ` L ${W - PAD},${H - PAD} L ${PAD},${H - PAD} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H + 24}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ebitdaGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: TPAL_A.amber,
    stopOpacity: 0.3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: TPAL_A.amber,
    stopOpacity: 0
  }))), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: "url(#ebitdaGrad)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    stroke: TPAL_A.amber,
    strokeWidth: 1.5,
    fill: "none"
  }), pts.map((p, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("circle", {
    cx: p[0],
    cy: p[1],
    r: 2.5,
    fill: TPAL_A.amber
  }), /*#__PURE__*/React.createElement("text", {
    x: p[0],
    y: p[1] - 8,
    fill: TPAL_A.text,
    fontSize: 9,
    fontFamily: "DM Mono",
    textAnchor: "middle"
  }, data[i].toFixed(1), "%"), /*#__PURE__*/React.createElement("text", {
    x: p[0],
    y: H + 14,
    fill: TPAL_A.textMute,
    fontSize: 8,
    fontFamily: "DM Mono",
    textAnchor: "middle"
  }, FA.MONTH_NAMES_ES[parseInt(labels[i].split('-')[1]) - 1], labels[i].startsWith('2026') ? '·26' : '·25'))));
}

// ─── Variance Waterfall ────────────────────────────────────────────────
function VariancePanel({
  period,
  currency
}) {
  const {
    real,
    ppto,
    info
  } = getAggregates(period);
  const months = info.real;
  // EBITDA bridge: PPTO → +Δingresos → -Δcv → -Δgadm → -Δgvta → REAL
  const start = ppto.ebitda;
  const end = real.ebitda;
  const dIng = real.ingresos - ppto.ingresos;
  const dCV = -(real.costoVentas - ppto.costoVentas);
  const dAdm = -(real.gastosAdmin - ppto.gastosAdmin);
  const dVta = -(real.gastosVentas - ppto.gastosVentas);
  const dDep = -(real.depreciacion - ppto.depreciacion);
  const items = [{
    k: 'PPTO',
    v: start,
    kind: 'anchor'
  }, {
    k: 'INGRESOS',
    v: dIng,
    kind: 'delta'
  }, {
    k: 'COSTO V.',
    v: dCV,
    kind: 'delta'
  }, {
    k: 'G.ADM',
    v: dAdm,
    kind: 'delta'
  }, {
    k: 'G.VTA',
    v: dVta,
    kind: 'delta'
  }, {
    k: 'DEPREC.',
    v: dDep,
    kind: 'delta'
  }, {
    k: 'REAL',
    v: end,
    kind: 'anchor'
  }];
  const maxAbs = Math.max(start, end, ...items.map(i => Math.abs(i.v))) * 1.15;
  const W = 1000,
    H = 280,
    PAD = 40;
  const barW = (W - PAD * 2) / items.length - 8;
  let cum = 0;
  const drawn = items.map((it, i) => {
    let y0, y1;
    if (it.kind === 'anchor') {
      y0 = 0;
      y1 = it.v;
      cum = it.v;
    } else {
      y0 = cum;
      y1 = cum + it.v;
      cum = y1;
    }
    return {
      ...it,
      y0,
      y1,
      x: PAD + i * (barW + 8) + 4
    };
  });
  const yScale = v => H - PAD - v / maxAbs * (H - PAD * 2);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "WATERFALL EBITDA \xB7 PPTO \u2192 REAL \xB7 ", info.label)), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: PAD,
    x2: W - PAD,
    y1: H - PAD,
    y2: H - PAD,
    stroke: TPAL_A.border
  }), drawn.map((d, i) => {
    const top = Math.min(yScale(d.y0), yScale(d.y1));
    const bot = Math.max(yScale(d.y0), yScale(d.y1));
    const h = bot - top;
    const fill = d.kind === 'anchor' ? TPAL_A.amber : d.v >= 0 ? TPAL_A.green : TPAL_A.red;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: d.x,
      y: top,
      width: barW,
      height: Math.max(h, 1),
      fill: fill,
      opacity: d.kind === 'anchor' ? 1 : 0.85
    }), i < drawn.length - 1 && d.kind !== 'anchor' && /*#__PURE__*/React.createElement("line", {
      x1: d.x + barW,
      x2: drawn[i + 1].x,
      y1: yScale(d.y1),
      y2: yScale(d.y1),
      stroke: TPAL_A.borderHi,
      strokeDasharray: "2,2",
      strokeWidth: 1
    }), /*#__PURE__*/React.createElement("text", {
      x: d.x + barW / 2,
      y: top - 8,
      fill: TPAL_A.text,
      fontSize: 11,
      fontFamily: "DM Mono",
      textAnchor: "middle",
      fontWeight: 600
    }, d.kind === 'anchor' ? FA.fmtMoney(d.v, currency, months) : FA.fmtMoney(d.v, currency, months, {
      showSign: true
    })), /*#__PURE__*/React.createElement("text", {
      x: d.x + barW / 2,
      y: H - PAD + 18,
      fill: TPAL_A.textDim,
      fontSize: 10,
      fontFamily: "DM Mono",
      textAnchor: "middle"
    }, d.k));
  })));
}

// ─── Líneas de negocio ─────────────────────────────────────────────────
function LineasPanel({
  period,
  currency
}) {
  const {
    real,
    info
  } = getAggregates(period);
  const [focus, setFocus] = useStateA('TOTAL'); // TOTAL | AB | GLX | OTROS

  const agg = DA.porProductoAgg(info.real);
  const months = info.real;
  const META = {
    AB: {
      label: 'Ácido Bórico',
      short: 'AB',
      color: TPAL_A.amber,
      desc: 'Producto principal · 90%+ del volumen'
    },
    GLX: {
      label: 'Granulex',
      short: 'GLX',
      color: TPAL_A.green,
      desc: 'Bórico granulado para fertilizantes'
    },
    OTROS: {
      label: 'Otros derivados',
      short: 'OTR',
      color: TPAL_A.cyan,
      desc: 'Borax, ulexita, derivados menores'
    }
  };
  const lineKeys = ['AB', 'GLX', 'OTROS'];

  // Serie mensual por línea para el rango
  const series = months.map(m => {
    var _DA$volumen$m;
    const p = DA.porProducto[m] || {};
    const otros = ((_DA$volumen$m = DA.volumen[m]) === null || _DA$volumen$m === void 0 ? void 0 : _DA$volumen$m.otros) || 0;
    return {
      m,
      AB: {
        ing: p.ingresoAB || 0,
        cost: p.costoAB || 0,
        marg: p.margenAB || 0
      },
      GLX: {
        ing: p.ingresoGLX || 0,
        cost: p.costoGLX || 0,
        marg: p.margenGLX || 0
      },
      OTROS: {
        ing: otros,
        cost: otros * 0.8,
        marg: otros * 0.2
      }
    };
  });
  const maxIng = Math.max(...series.flatMap(s => lineKeys.map(k => s[k].ing)), 1);
  const totalIng = agg.TOTAL.ing;
  const focusData = focus === 'TOTAL' ? agg.TOTAL : agg[focus];
  const focusMargPct = focusData.margPct;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600,
      letterSpacing: 0.6
    }
  }, "L\xCDNEAS DE NEGOCIO \xB7 ", info.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      marginRight: 6
    }
  }, "FOCO:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, [{
    k: 'TOTAL',
    label: 'TODAS'
  }, ...lineKeys.map(k => ({
    k,
    label: META[k].short
  }))].map(o => {
    const c = o.k === 'TOTAL' ? TPAL_A.amber : META[o.k].color;
    const active = focus === o.k;
    return /*#__PURE__*/React.createElement("button", {
      key: o.k,
      onClick: () => setFocus(o.k),
      style: {
        padding: '5px 12px',
        background: active ? c : 'transparent',
        color: active ? '#000' : c,
        border: `1px solid ${c}`,
        marginLeft: -1,
        fontFamily: 'inherit',
        fontSize: 10.5,
        letterSpacing: 0.5,
        fontWeight: 700,
        cursor: 'pointer'
      }
    }, o.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10
    }
  }, [{
    label: 'INGRESO',
    v: focusData.ing,
    fmt: 'money'
  }, {
    label: 'COSTO',
    v: focusData.cost,
    fmt: 'money'
  }, {
    label: 'MARGEN',
    v: focusData.marg,
    fmt: 'money',
    signed: true
  }, {
    label: 'MARGEN %',
    v: focusMargPct,
    fmt: 'pct',
    signed: true
  }].map(k => {
    const negative = k.signed && k.v < 0;
    return /*#__PURE__*/React.createElement("div", {
      key: k.label,
      style: {
        background: TPAL_A.panel,
        border: `1px solid ${TPAL_A.border}`,
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 9.5,
        letterSpacing: 0.8,
        color: TPAL_A.textMute,
        marginBottom: 6
      }
    }, k.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 20,
        fontWeight: 600,
        color: negative ? TPAL_A.red : k.signed ? TPAL_A.green : TPAL_A.text,
        fontVariantNumeric: 'tabular-nums'
      }
    }, k.fmt === 'pct' ? FA.fmtPct(k.v) : FA.fmtMoney(k.v, currency, months)), focus !== 'TOTAL' && k.label === 'INGRESO' && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 10,
        color: TPAL_A.textDim,
        marginTop: 4
      }
    }, (focusData.ingPctOfTotal * 100).toFixed(1), "% del total"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "COMPOSICI\xD3N DEL INGRESO")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 34,
      display: 'flex',
      border: `1px solid ${TPAL_A.border}`,
      marginBottom: 18
    }
  }, lineKeys.map(k => {
    const w = totalIng ? agg[k].ing / totalIng * 100 : 0;
    const dim = focus !== 'TOTAL' && focus !== k;
    return w > 0 ? /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        width: `${w}%`,
        background: META[k].color,
        opacity: dim ? 0.25 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Mono',
        fontSize: 11,
        fontWeight: 700,
        color: '#000',
        transition: 'opacity 0.2s'
      }
    }, w >= 6 ? `${META[k].short} ${w.toFixed(1)}%` : '') : null;
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      fontFamily: 'DM Mono',
      fontSize: 11.5,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "L\xCDNEA"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "INGRESO"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "COSTO"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "MARGEN"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "MGN %"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      padding: '4px 0',
      fontWeight: 500,
      letterSpacing: 0.6
    }
  }, "% MIX"))), /*#__PURE__*/React.createElement("tbody", null, lineKeys.map(k => {
    const d = agg[k];
    const dim = focus !== 'TOTAL' && focus !== k;
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      onClick: () => setFocus(focus === k ? 'TOTAL' : k),
      style: {
        borderTop: `1px solid ${TPAL_A.border}`,
        opacity: dim ? 0.4 : 1,
        cursor: 'pointer',
        transition: 'opacity 0.2s'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: TPAL_A.text
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 10,
        height: 10,
        background: META[k].color,
        marginRight: 10
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, META[k].label), /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textMute,
        marginLeft: 8,
        fontSize: 10
      }
    }, META[k].desc)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: TPAL_A.text,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, FA.fmtMoney(d.ing, currency, months)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: TPAL_A.textDim,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, FA.fmtMoney(d.cost, currency, months)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: d.marg < 0 ? TPAL_A.red : TPAL_A.green,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, FA.fmtMoney(d.marg, currency, months)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: d.margPct < 0 ? TPAL_A.red : META[k].color,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, FA.fmtPct(d.margPct)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px 0',
        color: TPAL_A.amber,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums'
      }
    }, (d.ingPctOfTotal * 100).toFixed(1), "%"));
  }), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderTop: `2px solid ${TPAL_A.borderHi}`,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: TPAL_A.text,
      letterSpacing: 0.5
    }
  }, "TOTAL"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: TPAL_A.text,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, FA.fmtMoney(agg.TOTAL.ing, currency, months)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: TPAL_A.text,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, FA.fmtMoney(agg.TOTAL.cost, currency, months)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: agg.TOTAL.marg < 0 ? TPAL_A.red : TPAL_A.green,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, FA.fmtMoney(agg.TOTAL.marg, currency, months)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: TPAL_A.amber,
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, FA.fmtPct(agg.TOTAL.margPct)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      color: TPAL_A.textMute,
      textAlign: 'right'
    }
  }, "100.0%"))))), months.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "EVOLUCI\xD3N MENSUAL \xB7 INGRESO POR L\xCDNEA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height: 160,
      padding: '0 0 4px',
      borderBottom: `1px solid ${TPAL_A.border}`
    }
  }, series.map((s, i) => {
    const stackTotal = lineKeys.reduce((a, k) => a + s[k].ing, 0);
    const h = stackTotal / maxIng * 140;
    return /*#__PURE__*/React.createElement("div", {
      key: s.m,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: h,
        display: 'flex',
        flexDirection: 'column-reverse',
        minWidth: 18
      }
    }, lineKeys.map(k => {
      const lh = stackTotal ? s[k].ing / stackTotal * h : 0;
      const dim = focus !== 'TOTAL' && focus !== k;
      return /*#__PURE__*/React.createElement("div", {
        key: k,
        title: `${s.m} · ${META[k].short}: ${FA.fmtMoney(s[k].ing, currency, [s.m])}`,
        style: {
          height: lh,
          background: META[k].color,
          opacity: dim ? 0.2 : 1,
          transition: 'opacity 0.2s'
        }
      });
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 6
    }
  }, series.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.m,
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'DM Mono',
      fontSize: 9.5,
      color: TPAL_A.textMute,
      letterSpacing: 0.4
    }
  }, s.m.slice(5))))));
}

// ─── Acciones ──────────────────────────────────────────────────────────
function AccionesPanel({
  acciones,
  setAcciones
}) {
  const [adding, setAdding] = useStateA(false);
  const [draft, setDraft] = useStateA({
    title: '',
    owner: 'CFO',
    dueDate: '2026-05-15',
    priority: 'media',
    status: 'open',
    linkLine: ''
  });
  const [filterStatus, setFilterStatus] = useStateA('todas');
  const [openDetail, setOpenDetail] = useStateA(null);
  const [historyDraft, setHistoryDraft] = useStateA('');
  const STATUS_META = {
    open: {
      label: 'ABIERTA',
      color: TPAL_A.cyan,
      bg: 'rgba(90,215,255,0.08)'
    },
    wip: {
      label: 'EN CURSO',
      color: TPAL_A.amber,
      bg: 'rgba(255,176,0,0.10)'
    },
    blocked: {
      label: 'BLOQUEADA',
      color: TPAL_A.red,
      bg: 'rgba(255,77,109,0.08)'
    },
    done: {
      label: 'COMPLETA',
      color: TPAL_A.green,
      bg: 'rgba(61,240,154,0.06)'
    }
  };
  function setStatus(id, st) {
    setAcciones(acciones.map(a => a.id === id ? {
      ...a,
      status: st,
      completed: st === 'done',
      history: [...(a.history || []), {
        ts: new Date().toISOString().slice(0, 10),
        by: a.owner,
        note: `Estado → ${STATUS_META[st].label}`
      }]
    } : a));
  }
  function remove(id) {
    if (confirm('¿Eliminar esta acción?')) {
      setAcciones(acciones.filter(a => a.id !== id));
      if (openDetail === id) setOpenDetail(null);
    }
  }
  function add() {
    if (!draft.title.trim()) return;
    const id = Math.max(0, ...acciones.map(a => a.id)) + 1;
    setAcciones([...acciones, {
      ...draft,
      id,
      completed: false,
      linkLine: draft.linkLine || null,
      history: [{
        ts: new Date().toISOString().slice(0, 10),
        by: draft.owner,
        note: 'Acción creada'
      }]
    }]);
    setDraft({
      title: '',
      owner: 'CFO',
      dueDate: '2026-05-15',
      priority: 'media',
      status: 'open',
      linkLine: ''
    });
    setAdding(false);
  }
  function addHistory(id) {
    const note = historyDraft.trim();
    if (!note) return;
    setAcciones(acciones.map(a => a.id === id ? {
      ...a,
      history: [...(a.history || []), {
        ts: new Date().toISOString().slice(0, 10),
        by: a.owner,
        note
      }]
    } : a));
    setHistoryDraft('');
  }
  function updateField(id, key, value) {
    setAcciones(acciones.map(a => a.id === id ? {
      ...a,
      [key]: value
    } : a));
  }
  const filtered = filterStatus === 'todas' ? acciones : acciones.filter(a => (a.status || 'open') === filterStatus);
  const sorted = [...filtered].sort((a, b) => {
    const sa = a.status === 'done' ? 1 : 0;
    const sb = b.status === 'done' ? 1 : 0;
    if (sa !== sb) return sa - sb;
    return a.dueDate.localeCompare(b.dueDate);
  });
  const counts = {
    todas: acciones.length,
    open: acciones.filter(a => (a.status || 'open') === 'open').length,
    wip: acciones.filter(a => a.status === 'wip').length,
    blocked: acciones.filter(a => a.status === 'blocked').length,
    done: acciones.filter(a => a.status === 'done').length
  };
  const prColor = {
    alta: TPAL_A.red,
    media: TPAL_A.amber,
    baja: TPAL_A.cyan
  };
  const detail = openDetail ? acciones.find(a => a.id === openDetail) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: detail ? '1.6fr 1fr' : '1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "ACCIONES"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      border: `1px solid ${TPAL_A.border}`
    }
  }, [{
    id: 'todas',
    label: 'TODAS'
  }, {
    id: 'open',
    label: 'ABIERTAS'
  }, {
    id: 'wip',
    label: 'EN CURSO'
  }, {
    id: 'blocked',
    label: 'BLOQUEADAS'
  }, {
    id: 'done',
    label: 'COMPLETAS'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    onClick: () => setFilterStatus(o.id),
    style: {
      padding: '4px 10px',
      background: filterStatus === o.id ? TPAL_A.amber : 'transparent',
      color: filterStatus === o.id ? '#000' : TPAL_A.textDim,
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 9.5,
      letterSpacing: 0.5,
      fontWeight: 600
    }
  }, o.label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6,
      marginLeft: 3
    }
  }, counts[o.id])))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdding(true),
    style: {
      padding: '6px 11px',
      background: TPAL_A.amber,
      color: '#000',
      border: 'none',
      fontFamily: 'inherit',
      fontSize: 10.5,
      letterSpacing: 0.6,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "+ NUEVA")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'DM Mono',
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 90
    }
  }, "STATUS"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`
    }
  }, "T\xCDTULO"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 120
    }
  }, "L\xCDNEA EERR"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 110
    }
  }, "RESPONSABLE"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 90
    }
  }, "VENCE"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      color: TPAL_A.textMute,
      fontSize: 9.5,
      textAlign: 'left',
      fontWeight: 500,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 75
    }
  }, "PRIO."), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '9px 12px',
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      width: 30
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, sorted.map(a => {
    const status = a.status || 'open';
    const sm = STATUS_META[status];
    const isOpen = openDetail === a.id;
    const overdue = !a.completed && a.dueDate < '2026-04-09';
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id,
      onClick: () => setOpenDetail(isOpen ? null : a.id),
      style: {
        cursor: 'pointer',
        background: isOpen ? TPAL_A.panel2 : a.completed ? 'transparent' : 'transparent',
        opacity: a.completed ? 0.55 : 1,
        borderBottom: `1px solid ${TPAL_A.border}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px'
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("select", {
      value: status,
      onChange: e => setStatus(a.id, e.target.value),
      style: {
        background: sm.bg,
        border: `1px solid ${sm.color}`,
        color: sm.color,
        fontFamily: 'inherit',
        fontSize: 9.5,
        letterSpacing: 0.5,
        fontWeight: 700,
        padding: '2px 4px',
        cursor: 'pointer'
      }
    }, Object.entries(STATUS_META).map(([k, m]) => /*#__PURE__*/React.createElement("option", {
      key: k,
      value: k,
      style: {
        background: TPAL_A.bg,
        color: m.color
      }
    }, m.label)))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px',
        color: TPAL_A.text,
        textDecoration: a.completed ? 'line-through' : 'none'
      }
    }, a.title), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px',
        color: TPAL_A.cyan,
        fontSize: 10.5
      }
    }, a.linkLine ? /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '1px 5px',
        border: `1px solid ${TPAL_A.borderHi}`,
        fontSize: 9.5
      }
    }, "\u2197 ", LINE_LABELS[a.linkLine] || a.linkLine) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textMute
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px',
        color: TPAL_A.textDim
      }
    }, a.owner), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px',
        color: overdue ? TPAL_A.red : TPAL_A.textDim
      }
    }, a.dueDate, overdue && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 5
      }
    }, "\u26A0")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '2px 7px',
        background: 'transparent',
        border: `1px solid ${prColor[a.priority || 'media']}`,
        color: prColor[a.priority || 'media'],
        fontSize: 9,
        letterSpacing: 0.5,
        fontWeight: 600
      }
    }, (a.priority || 'media').toUpperCase())), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 12px'
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(a.id),
      style: {
        background: 'transparent',
        border: 'none',
        color: TPAL_A.textMute,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 13,
        padding: 0,
        width: 18,
        height: 18
      }
    }, "\xD7")));
  }), adding && /*#__PURE__*/React.createElement("tr", {
    style: {
      background: TPAL_A.panel2
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: draft.status,
    onChange: e => setDraft({
      ...draft,
      status: e.target.value
    }),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 9.5,
      padding: '3px 4px'
    }
  }, Object.entries(STATUS_META).map(([k, m]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, m.label)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft.title,
    onChange: e => setDraft({
      ...draft,
      title: e.target.value
    }),
    autoFocus: true,
    placeholder: "Descripci\xF3n de la acci\xF3n...",
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11.5,
      padding: '5px 8px'
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: draft.linkLine,
    onChange: e => setDraft({
      ...draft,
      linkLine: e.target.value
    }),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 10.5,
      padding: '4px 4px'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 ninguna \u2014"), Object.entries(LINE_LABELS).map(([k, l]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, l)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft.owner,
    onChange: e => setDraft({
      ...draft,
      owner: e.target.value
    }),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 8px'
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: draft.dueDate,
    onChange: e => setDraft({
      ...draft,
      dueDate: e.target.value
    }),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 10.5,
      padding: '5px 4px',
      colorScheme: 'dark'
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: draft.priority,
    onChange: e => setDraft({
      ...draft,
      priority: e.target.value
    }),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.borderHi}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 10.5,
      padding: '5px 4px'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "alta"
  }, "ALTA"), /*#__PURE__*/React.createElement("option", {
    value: "media"
  }, "MEDIA"), /*#__PURE__*/React.createElement("option", {
    value: "baja"
  }, "BAJA"))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: add,
    style: {
      background: TPAL_A.amber,
      color: '#000',
      border: 'none',
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 6px',
      cursor: 'pointer',
      fontWeight: 700
    }
  }, "\u21B5"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdding(false),
    style: {
      background: 'transparent',
      color: TPAL_A.textDim,
      border: `1px solid ${TPAL_A.border}`,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 6px',
      cursor: 'pointer'
    }
  }, "\xD7")))), sorted.length === 0 && !adding && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      padding: '30px 14px',
      textAlign: 'center',
      color: TPAL_A.textMute
    }
  }, "Sin acciones en esta vista."))))), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600,
      letterSpacing: 0.6
    }
  }, "DETALLE \xB7 #", detail.id), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenDetail(null),
    style: {
      background: 'transparent',
      color: TPAL_A.textDim,
      border: `1px solid ${TPAL_A.border}`,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '3px 8px',
      cursor: 'pointer'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("input", {
    value: detail.title,
    onChange: e => updateField(detail.id, 'title', e.target.value),
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'DM Sans',
      fontSize: 15,
      fontWeight: 600,
      padding: '4px 0 8px',
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 9.5,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "RESPONSABLE"), /*#__PURE__*/React.createElement("input", {
    value: detail.owner,
    onChange: e => updateField(detail.id, 'owner', e.target.value),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11.5,
      padding: '5px 8px'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 9.5,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "VENCIMIENTO"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: detail.dueDate,
    onChange: e => updateField(detail.id, 'dueDate', e.target.value),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 8px',
      colorScheme: 'dark'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 9.5,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "L\xCDNEA EERR VINCULADA"), /*#__PURE__*/React.createElement("select", {
    value: detail.linkLine || '',
    onChange: e => updateField(detail.id, 'linkLine', e.target.value || null),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 8px'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 ninguna \u2014"), Object.entries(LINE_LABELS).map(([k, l]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, l)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: TPAL_A.textMute,
      fontSize: 9.5,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, "PRIORIDAD"), /*#__PURE__*/React.createElement("select", {
    value: detail.priority,
    onChange: e => updateField(detail.id, 'priority', e.target.value),
    style: {
      width: '100%',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'inherit',
      fontSize: 11,
      padding: '5px 8px'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "alta"
  }, "ALTA"), /*#__PURE__*/React.createElement("option", {
    value: "media"
  }, "MEDIA"), /*#__PURE__*/React.createElement("option", {
    value: "baja"
  }, "BAJA")))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${TPAL_A.border}`,
      paddingTop: 12,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9.5,
      letterSpacing: 0.8,
      color: TPAL_A.amber,
      marginBottom: 10,
      fontWeight: 700
    }
  }, "HISTORIAL DE CAMBIOS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 14,
      maxHeight: 240,
      overflow: 'auto'
    }
  }, (detail.history || []).slice().reverse().map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'DM Mono',
      fontSize: 10.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      minWidth: 78
    }
  }, h.ts), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim,
      minWidth: 60
    }
  }, h.by), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      flex: 1,
      fontFamily: 'DM Sans',
      fontSize: 12,
      lineHeight: 1.4
    }
  }, h.note))), (!detail.history || detail.history.length === 0) && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      fontFamily: 'DM Mono',
      fontSize: 10.5
    }
  }, "Sin historial.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: historyDraft,
    onChange: e => setHistoryDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') addHistory(detail.id);
    },
    placeholder: "Agregar nota al historial...",
    style: {
      flex: 1,
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'DM Sans',
      fontSize: 12,
      padding: '7px 10px'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => addHistory(detail.id),
    style: {
      padding: '7px 12px',
      background: TPAL_A.amber,
      color: '#000',
      border: 'none',
      fontFamily: 'DM Mono',
      fontSize: 11,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "\u21B5")))));
}

// ─── Main ──────────────────────────────────────────────────────────────
function VariantA() {
  const [view, setView] = useStateA('main');
  const [currency, setCurrency] = usePersistA('currency', 'USD');
  const [period, setPeriod] = usePersistA('period', 'mes');
  const [comments, setComments] = usePersistA('comments', DA.COMENTARIOS_SEED);

  // Acciones: shared via serverless API (GitHub-backed), no localStorage
  const [acciones, setAccionesRaw] = useStateA(DA.ACCIONES_SEED);
  useEffectA(() => {
    fetch('/api/acciones').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setAccionesRaw(data);
    }).catch(() => {});
  }, []);
  const _saveRef = useRefA(null);
  const setAcciones = useMemoA(() => newArr => {
    setAccionesRaw(newArr);
    clearTimeout(_saveRef.current);
    _saveRef.current = setTimeout(() => {
      fetch('/api/acciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArr)
      }).catch(e => console.log('acciones save failed:', e));
    }, 300);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      minHeight: '100%',
      background: TPAL_A.bg,
      color: TPAL_A.text,
      fontFamily: 'DM Sans, system-ui'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(CommandBar, {
    view: view,
    setView: setView,
    currency: currency,
    setCurrency: setCurrency,
    period: period,
    setPeriod: setPeriod
  }), view === 'main' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiStrip, {
    period: period,
    currency: currency
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(EerrTable, {
    period: period,
    currency: currency,
    comments: comments,
    setComments: setComments
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SideNotesPanel, {
    comments: comments,
    setComments: setComments,
    period: period
  }), /*#__PURE__*/React.createElement(ExportPanel, {
    currency: currency,
    period: period
  })))), view === 'evol' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(EvolucionPanel, {
    currency: currency
  })), view === 'var' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(VariancePanel, {
    period: period,
    currency: currency
  })), view === 'costo' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(CostoDrillPanel, {
    period: period,
    currency: currency
  })), view === 'mix' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(LineasPanel, {
    period: period,
    currency: currency
  })), view === 'tc' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(TCSensitivityPanel, {
    period: period
  })), view === 'act' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(AccionesPanel, {
    acciones: acciones,
    setAcciones: setAcciones
  })));
}

// ─── Auto-note generator ───────────────────────────────────────────────
function generateAutoNotes(period) {
  const {
    real,
    ppto,
    lastYr,
    info
  } = getAggregates(period);
  const label = info.label;
  const F = window.QB_FMT;
  const months = info.real;
  const fmtM = v => F.fmtMoney(v, 'USD', months);
  const fmtP = (v, sign = false) => F.fmtPct(v, 1, sign);
  const vPpto = (r, p) => F.variance(r, p);
  const vYA = (r, y) => y !== null && y !== undefined ? F.variance(r, y) : null;
  const dir = (v, invert = false) => {
    const good = invert ? v.abs <= 0 : v.abs >= 0;
    return good ? '▲ favor' : '▼ contra';
  };
  const pLabel = (v, invert = false) => {
    const good = invert ? v.abs <= 0 : v.abs >= 0;
    const pct = Math.abs(v.pct * 100).toFixed(1);
    return (good ? '+' : '-') + pct + '% vs Ppto';
  };
  const yaLabel = (v, invert = false) => {
    if (!v) return null;
    const good = invert ? v.abs <= 0 : v.abs >= 0;
    const pct = Math.abs(v.pct * 100).toFixed(1);
    return (good ? '+' : '-') + pct + '% vs año ant.';
  };
  const notes = {};

  // Ingresos
  const vI = vPpto(real.ingresos, ppto.ingresos);
  const yaI = vYA(real.ingresos, lastYr === null || lastYr === void 0 ? void 0 : lastYr.ingresos);
  notes.ingresos = `${label} · Ingresos: ${fmtM(real.ingresos)} (${pLabel(vI)}${yaI ? ' · ' + yaLabel(yaI) : ''}). ` + (vI.abs >= 0 ? 'Ventas por sobre presupuesto, favorecido por volumen y/o precio.' : 'Ventas bajo presupuesto — revisar mix de producto y precio realizado.');

  // Costo de ventas
  const vC = vPpto(real.costoVentas, ppto.costoVentas);
  const cvPct = real.ingresos ? (-real.costoVentas / real.ingresos * 100).toFixed(1) : '—';
  const cvPptoPct = ppto.ingresos ? (-ppto.costoVentas / ppto.ingresos * 100).toFixed(1) : '—';
  notes.costoVentas = `Costo de ventas: ${fmtM(-real.costoVentas)} (${cvPct}% de ingresos vs ${cvPptoPct}% Ppto). ` + (vC.abs <= 0 ? 'Costo menor al presupuesto — dilución por mayor volumen o eficiencia operacional.' : 'Costo sobre Ppto — analizar MP, energía y eficiencia por tonelada.');

  // Margen bruto
  const vMB = vPpto(real.margenBruto, ppto.margenBruto);
  const mbPct = (real.margenBrutoPct * 100).toFixed(1);
  const mbPptoPct = (ppto.margenBrutoPct * 100).toFixed(1);
  notes.margenBruto = `Margen Bruto: ${fmtM(real.margenBruto)} · ${mbPct}% (Ppto: ${mbPptoPct}%). ` + (vMB.abs >= 0 ? 'Margen sobre presupuesto — resultado operativo favorable.' : `Margen bajo Ppto en ${fmtM(Math.abs(vMB.abs))} — presión combinada de ingresos y/o costo.`);

  // Gastos admin
  const vGA = vPpto(real.gastosAdmin, ppto.gastosAdmin);
  notes.gastosAdmin = `G. Administración: ${fmtM(-real.gastosAdmin)} (${pLabel(vGA, true)}). ` + (vGA.abs <= 0 ? 'Bajo Ppto — menor ejecución de honorarios, TI o gastos generales.' : 'Sobre Ppto — revisar conceptos: honorarios, arriendos o gastos extraordinarios.');

  // Gastos ventas
  const vGV = vPpto(real.gastosVentas, ppto.gastosVentas);
  notes.gastosVentas = `G. de Venta: ${fmtM(-real.gastosVentas)} (${pLabel(vGV, true)}). ` + (vGV.abs <= 0 ? 'Ejecución bajo presupuesto.' : 'Sobre presupuesto — verificar fletes, comisiones o gastos comerciales.');

  // EBITDA
  const vEB = vPpto(real.ebitda, ppto.ebitda);
  const ebPct = (real.ebitdaPct * 100).toFixed(1);
  const ebPptoPct = (ppto.ebitdaPct * 100).toFixed(1);
  const yaEB = vYA(real.ebitda, lastYr === null || lastYr === void 0 ? void 0 : lastYr.ebitda);
  notes.ebitda = `EBITDA: ${fmtM(real.ebitda)} · ${ebPct}% (Ppto: ${ebPptoPct}%). ${pLabel(vEB)}${yaEB ? ' · ' + yaLabel(yaEB) : ''}. ` + (vEB.abs >= 0 ? 'Generación operacional por sobre objetivo.' : 'EBITDA bajo Ppto — analizar mix ingresos/costo antes de proyectar cierre de año.');

  // Resultado operacional
  const vRO = vPpto(real.resOperacional, ppto.resOperacional);
  notes.resOperacional = `Res. Operacional: ${fmtM(real.resOperacional)} (${pLabel(vRO)}). ` + (vRO.abs >= 0 ? 'Operación sobre Ppto, incluyendo depreciación.' : 'Bajo Ppto después de depreciación — evaluar recuperación en meses restantes.');

  // Diferencia de cambio
  const vDC = vPpto(real.difCambio, ppto.difCambio);
  const tcAvg = months.reduce((a, m) => a + (DA.TC[m] || 940), 0) / months.length;
  notes.difCambio = `Dif. de cambio: ${fmtM(real.difCambio)}. TC promedio período: ${tcAvg.toFixed(0)} CLP/USD. ` + (real.difCambio >= 0 ? 'Impacto positivo por revaluación de activos/pasivos en CLP.' : 'Impacto negativo — depreciación del CLP presiona deudas denominadas en USD.');

  // Gastos financieros
  const vGF = vPpto(real.gastosFin, ppto.gastosFin);
  notes.gastosFin = `Gastos financieros: ${fmtM(-real.gastosFin)} (${pLabel(vGF, true)}). ` + (vGF.abs <= 0 ? 'Dentro o bajo presupuesto de intereses y comisiones.' : 'Sobre Ppto — revisar nivel de deuda financiera y costo promedio.');

  // Utilidad
  const vU = vPpto(real.utilidad, ppto.utilidad);
  const yaU = vYA(real.utilidad, lastYr === null || lastYr === void 0 ? void 0 : lastYr.utilidad);
  const uPct = (real.utilidadPct * 100).toFixed(1);
  notes.utilidad = `Utilidad del ejercicio: ${fmtM(real.utilidad)} · ${uPct}% margen neto. ${pLabel(vU)}${yaU ? ' · ' + yaLabel(yaU) : ''}. ` + (vU.abs >= 0 ? 'Resultado positivo respecto al objetivo — buena absorción de costos y gastos.' : 'Bajo Ppto — resultado presionado por margen operacional y/o resultado no operacional.');
  return notes;
}
const LINE_LABELS = {
  ingresos: 'Ingresos',
  costoVentas: 'Costo de Ventas',
  margenBruto: 'Margen Bruto',
  gastosAdmin: 'Gastos Admin.',
  gastosVentas: 'Gastos de Venta',
  depreciacion: 'Depreciación',
  resOperacional: 'Resultado Operacional',
  ebitda: 'EBITDA',
  difCambio: 'Diferencia de cambio',
  gastosFin: 'Gastos Financieros',
  rai: 'Resultado a/i',
  impuesto: 'Impuesto',
  utilidad: 'Utilidad'
};

// ─── Panel combinado: ANÁLISIS AI + NOTAS CFO ──────────────────────────
function SideNotesPanel({
  comments,
  setComments,
  period
}) {
  const [tab, setTab] = useStateA('ai');
  const autoNotes = useMemoA(() => generateAutoNotes(period), [period]);
  const [editingKey, setEditingKey] = useStateA(null);
  const TABS = [{
    id: 'ai',
    label: 'ANÁLISIS AI',
    color: TPAL_A.cyan
  }, {
    id: 'cfo',
    label: 'NOTAS CFO',
    color: TPAL_A.amber
  }];
  const aiEntries = Object.entries(autoNotes).filter(([, v]) => v && v.trim());
  const cfoEntries = Object.entries(comments).filter(([, v]) => v && v.trim());
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderBottom: `1px solid ${TPAL_A.borderHi}`
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      flex: 1,
      padding: '9px 0',
      fontFamily: 'DM Mono',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: 0.7,
      cursor: 'pointer',
      border: 'none',
      background: tab === t.id ? TPAL_A.panel2 : 'transparent',
      color: tab === t.id ? t.color : TPAL_A.textMute,
      borderBottom: tab === t.id ? `2px solid ${t.color}` : '2px solid transparent'
    }
  }, t.label))), tab === 'ai' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 12px',
      fontFamily: 'DM Mono',
      fontSize: 9,
      color: TPAL_A.cyan,
      borderBottom: `1px solid ${TPAL_A.border}`,
      letterSpacing: 0.4
    }
  }, "\u26A1 Auto-generado \xB7 Per\xEDodo: ", getAggregates(period).info.label), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxHeight: 400,
      overflowY: 'auto'
    }
  }, aiEntries.length === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, "Sin datos para el per\xEDodo."), aiEntries.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      borderLeft: `2px solid ${TPAL_A.cyan}22`,
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9,
      color: TPAL_A.cyan,
      letterSpacing: 0.8,
      marginBottom: 4
    }
  }, LINE_LABELS[k] || k.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans',
      fontSize: 12,
      color: TPAL_A.text,
      lineHeight: 1.6
    }
  }, v))))), tab === 'cfo' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 12px',
      fontFamily: 'DM Mono',
      fontSize: 9,
      color: TPAL_A.textMute,
      borderBottom: `1px solid ${TPAL_A.border}`,
      letterSpacing: 0.4
    }
  }, "Editorial \xB7 Click [+] en tabla EERR para agregar"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxHeight: 400,
      overflowY: 'auto'
    }
  }, cfoEntries.length === 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, "Sin notas. Click [+] en cualquier l\xEDnea del EERR."), cfoEntries.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      borderLeft: `2px solid ${TPAL_A.amber}44`,
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 9,
      color: TPAL_A.amber,
      letterSpacing: 0.8,
      marginBottom: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, LINE_LABELS[k] || k.toUpperCase(), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingKey(k),
    style: {
      background: 'transparent',
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.textMute,
      fontFamily: 'DM Mono',
      fontSize: 8,
      padding: '1px 5px',
      cursor: 'pointer'
    }
  }, "editar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setComments({
      ...comments,
      [k]: ''
    }),
    style: {
      background: 'transparent',
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.red,
      fontFamily: 'DM Mono',
      fontSize: 8,
      padding: '1px 5px',
      cursor: 'pointer'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Sans',
      fontSize: 12,
      color: TPAL_A.text,
      lineHeight: 1.6
    }
  }, v)))), editingKey && /*#__PURE__*/React.createElement(CommentEditor, {
    line: editingKey,
    value: comments[editingKey] || '',
    onSave: v => {
      setComments({
        ...comments,
        [editingKey]: v
      });
      setEditingKey(null);
    },
    onClose: () => setEditingKey(null)
  })));
}
function ExportPanel({
  currency,
  period
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700,
      marginRight: 8
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "EXPORTAR")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    k: 'pdf',
    label: 'PDF · Reporte mensual ejecutivo'
  }, {
    k: 'pptx',
    label: 'PPTX · Presentación directorio'
  }, {
    k: 'xlsx',
    label: 'XLSX · Pivot detallado · 12M'
  }, {
    k: 'csv',
    label: 'CSV · Datos crudos · YTD'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.k,
    onClick: () => alert('Exportar ' + o.k.toUpperCase() + ' (mock)'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 11px',
      background: TPAL_A.bg,
      border: `1px solid ${TPAL_A.border}`,
      color: TPAL_A.text,
      fontFamily: 'DM Mono',
      fontSize: 11,
      cursor: 'pointer',
      textAlign: 'left',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      marginRight: 8
    }
  }, "\u2193"), o.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\u2197")))));
}

// ─── Costo de Ventas · Drill-down ──────────────────────────────────────
function CostoDrillPanel({
  period,
  currency
}) {
  const [scope, setScope] = useStateA('mes'); // mes | ytd
  const [expanded, setExpanded] = useStateA({
    mp: true,
    mo: false,
    cf: false
  });
  const det = DA.COSTO_DETALLE;
  const months = scope === 'mes' ? ['2026-03'] : DA.months2026Real;
  const fmt = v => FA.fmtMoney(v, currency, months);
  const sigCls = (v, expense = true) => {
    if (Math.abs(v) < 1) return TPAL_A.textMute;
    const good = expense ? v < 0 : v > 0;
    return good ? TPAL_A.green : TPAL_A.red;
  };
  const cats = [{
    k: 'mp',
    label: 'MATERIA PRIMA',
    color: TPAL_A.amber,
    items: det.mp,
    total: det.totals.mp
  }, {
    k: 'mo',
    label: 'MANO DE OBRA',
    color: TPAL_A.cyan,
    items: det.mo,
    total: det.totals.mo
  }, {
    k: 'cf',
    label: 'CARGA FABRIL',
    color: TPAL_A.green,
    items: det.cf,
    total: det.totals.cf
  }];
  const grandReal = cats.reduce((a, c) => a + (scope === 'mes' ? c.total.mes : c.total.ytdReal), 0);
  const grandPpto = cats.reduce((a, c) => a + (scope === 'mes' ? c.total.ppto : c.total.ytdPpto), 0);
  const grandLY = cats.reduce((a, c) => a + c.total.ly, 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600,
      letterSpacing: 0.6
    }
  }, "COSTO DE VENTAS \xB7 DRILL-DOWN"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, "Producto: \xC1cido B\xF3rico"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      border: `1px solid ${TPAL_A.border}`
    }
  }, [{
    id: 'mes',
    l: 'MAR 2026'
  }, {
    id: 'ytd',
    l: 'YTD Q1'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    onClick: () => setScope(o.id),
    style: {
      padding: '5px 12px',
      background: scope === o.id ? TPAL_A.amber : 'transparent',
      color: scope === o.id ? '#000' : TPAL_A.textDim,
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 10.5,
      letterSpacing: 0.6,
      fontWeight: 600
    }
  }, o.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: 12,
      marginBottom: 18
    }
  }, cats.map(c => {
    const real = scope === 'mes' ? c.total.mes : c.total.ytdReal;
    const ppto = scope === 'mes' ? c.total.ppto : c.total.ytdPpto;
    const v = FA.variance(real, ppto);
    const pctOfTotal = grandReal > 0 ? real / grandReal : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: c.k,
      style: {
        background: TPAL_A.panel,
        border: `1px solid ${TPAL_A.border}`,
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 8,
        height: 8,
        background: c.color
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: c.color,
        fontFamily: 'DM Mono',
        fontSize: 10,
        letterSpacing: 0.8,
        fontWeight: 700
      }
    }, c.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'DM Mono',
        fontSize: 22,
        color: TPAL_A.text,
        fontWeight: 600,
        marginBottom: 4
      }
    }, fmt(real)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: 'DM Mono',
        fontSize: 10.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textDim
      }
    }, "vs Ppto"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: v.abs <= 0 ? TPAL_A.green : TPAL_A.red
      }
    }, FA.fmtPct(v.pct, 1, true))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontFamily: 'DM Mono',
        fontSize: 10.5,
        marginTop: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textDim
      }
    }, "% del total"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textDim
      }
    }, FA.fmtPct(pctOfTotal, 1))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel2,
      border: `1px solid ${TPAL_A.amberDim}`,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      background: TPAL_A.amber
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontFamily: 'DM Mono',
      fontSize: 10,
      letterSpacing: 0.8,
      fontWeight: 700
    }
  }, "COSTO TOTAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 22,
      color: TPAL_A.amber,
      fontWeight: 700,
      marginBottom: 4
    }
  }, fmt(grandReal)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'DM Mono',
      fontSize: 10.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, "vs Ppto"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: grandReal <= grandPpto ? TPAL_A.green : TPAL_A.red
    }
  }, FA.fmtPct((grandReal - grandPpto) / grandPpto, 1, true))), scope === 'mes' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'DM Mono',
      fontSize: 10.5,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, "vs Mar 2025"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: grandReal <= grandLY ? TPAL_A.green : TPAL_A.red
    }
  }, FA.fmtPct((grandReal - grandLY) / grandLY, 1, true))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: TPAL_A.panel2
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'left',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500,
      width: '40%'
    }
  }, "\xCDTEM"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "REAL"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "PPTO"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.amber,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "VAR"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.amber,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "VAR %"), scope === 'mes' && /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "FEB 2026"), scope === 'mes' && /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "MAR 2025"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500,
      width: '15%'
    }
  }, "% CAT"))), /*#__PURE__*/React.createElement("tbody", null, cats.map(c => {
    const isOpen = expanded[c.k];
    const catReal = scope === 'mes' ? c.total.mes : c.total.ytdReal;
    const catPpto = scope === 'mes' ? c.total.ppto : c.total.ytdPpto;
    const v = FA.variance(catReal, catPpto);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: c.k
    }, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: TPAL_A.panel2,
        cursor: 'pointer'
      },
      onClick: () => setExpanded({
        ...expanded,
        [c.k]: !isOpen
      })
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        fontFamily: 'DM Mono',
        fontSize: 11.5,
        color: c.color,
        fontWeight: 700,
        letterSpacing: 0.5,
        borderBottom: `1px solid ${TPAL_A.borderHi}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-block',
        width: 14,
        color: c.color
      }
    }, isOpen ? '▾' : '▸'), c.label, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: TPAL_A.textDim,
        fontWeight: 400,
        marginLeft: 8
      }
    }, "(", c.items.length, ")")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12.5,
        color: c.color,
        fontWeight: 700,
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(catReal)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: TPAL_A.textDim,
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(catPpto)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: sigCls(v.abs),
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, (v.abs >= 0 ? '+' : '') + fmt(v.abs).replace('+', '')), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: sigCls(v.abs),
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 600
      }
    }, FA.fmtPct(v.pct, 1, true)), scope === 'mes' && /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: TPAL_A.textDim,
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, "\u2014"), scope === 'mes' && /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: TPAL_A.textDim,
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, FA.fmtMoney(c.total.ly, currency, ['2025-03'])), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: TPAL_A.textDim,
        borderBottom: `1px solid ${TPAL_A.borderHi}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, "100%")), isOpen && c.items.map(it => {
      const real = scope === 'mes' ? it.mes : it.ytdReal;
      const ppto = scope === 'mes' ? it.ppto : it.ytdPpto;
      const vi = FA.variance(real, ppto);
      const pctCat = catReal > 0 ? real / catReal : 0;
      return /*#__PURE__*/React.createElement("tr", {
        key: c.k + '-' + it.name,
        style: {
          borderBottom: `1px solid ${TPAL_A.border}`
        }
      }, /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px 8px 36px',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.text
        }
      }, it.name, it.sub && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 8,
          color: TPAL_A.textMute,
          fontSize: 9.5,
          padding: '1px 5px',
          border: `1px solid ${TPAL_A.border}`
        }
      }, it.sub)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.text,
          fontVariantNumeric: 'tabular-nums'
        }
      }, fmt(real)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.textDim,
          fontVariantNumeric: 'tabular-nums'
        }
      }, fmt(ppto)), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: sigCls(vi.abs),
          fontVariantNumeric: 'tabular-nums'
        }
      }, (vi.abs >= 0 ? '+' : '') + fmt(vi.abs).replace('+', '')), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: sigCls(vi.abs),
          fontVariantNumeric: 'tabular-nums'
        }
      }, ppto !== 0 ? FA.fmtPct(vi.pct, 1, true) : '—'), scope === 'mes' && /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.textDim,
          fontVariantNumeric: 'tabular-nums'
        }
      }, fmt(it.mesAnt)), scope === 'mes' && /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.textDim,
          fontVariantNumeric: 'tabular-nums'
        }
      }, FA.fmtMoney(it.ly, currency, ['2025-03'])), /*#__PURE__*/React.createElement("td", {
        style: {
          padding: '8px 14px',
          textAlign: 'right',
          fontFamily: 'DM Mono',
          fontSize: 11.5,
          color: TPAL_A.textDim,
          fontVariantNumeric: 'tabular-nums'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          justifyContent: 'flex-end'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 60,
          height: 5,
          background: TPAL_A.bg,
          position: 'relative'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: Math.min(100, pctCat * 100) + '%',
          background: c.color,
          opacity: 0.6
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 36,
          textAlign: 'right'
        }
      }, FA.fmtPct(pctCat, 1)))));
    }));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '10px 14px',
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.textDim,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700,
      marginRight: 8
    }
  }, "NOTA"), "Costo unitario Mar 2026: ", (det.totals.mp.mes + det.totals.mo.mes + det.totals.cf.mes).toLocaleString(), " kUSD / 7.058 ton producidas = ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text
    }
  }, ((det.totals.mp.mes + det.totals.mo.mes + det.totals.cf.mes) * 1000 / 7058).toFixed(0), " USD/ton"), "\xB7 vs Ppto 811 USD/ton \xB7 El menor costo unitario diluye el costo fijo gracias al volumen sobreejecutado."));
}

// ─── Sensibilidad TC ────────────────────────────────────────────────────
function TCSensitivityPanel({
  period
}) {
  const [shock, setShock] = useStateA(0); // -10 a +10 (%)
  const [coverage, setCoverage] = useStateA(30); // % cobertura forwards
  const months = period === 'ytd' ? DA.months2026Real : period === 'fc' ? DA.months2026All : period === '12m' ? DA.monthsLast12 : ['2026-03'];
  const baseTC = months.reduce((a, m) => a + (DA.TC[m] || 940), 0) / months.length;
  const newTC = baseTC * (1 + shock / 100);

  // Datos base
  const base = period === 'ytd' || period === 'fc' || period === '12m' ? DA.aggRange(months, period === 'fc' ? 'fc' : 'real') : DA.calcEERR('2026-03', 'real');

  // Estimaciones de exposición (calibradas a estados financieros típicos):
  // Ingresos: 100% USD (export) → no afectados
  // Costo Ventas: 60% CLP (MP local + MO + CF) → expuesto
  // GAdmin: 80% CLP → expuesto
  // GVentas: 30% CLP → expuesto
  // Diferencia cambio: depende de posición neta CLP

  const exposureCLP = {
    ingresos: 0.05,
    costoVentas: 0.55,
    gastosAdmin: 0.80,
    gastosVentas: 0.30
  };
  const cov = coverage / 100;
  const effectiveShock = shock / 100 * (1 - cov);

  // El efecto en USD: si CLP se aprecia (TC sube en CLP/USD = peso se debilita...
  // En realidad: TC sube → 1 USD compra más CLP → costos en CLP equivalen a MENOS USD → costos USD bajan
  const fxImpact = (line, signCost = true) => {
    const exp = exposureCLP[line] || 0;
    // si TC sube X%, el costo expresado en USD baja X%
    return -base[line] * exp * effectiveShock * (signCost ? 1 : 1);
  };
  const newCostoVentas = base.costoVentas + fxImpact('costoVentas');
  const newGastosAdmin = base.gastosAdmin + fxImpact('gastosAdmin');
  const newGastosVentas = base.gastosVentas + fxImpact('gastosVentas');
  const newIngresos = base.ingresos + fxImpact('ingresos', false);
  const newMargenBruto = newIngresos - newCostoVentas;
  const newResOp = newMargenBruto - newGastosAdmin - newGastosVentas - base.depreciacion;
  const newEbitda = newResOp + base.depreciacion;
  const deltaEbitda = newEbitda - base.ebitda;

  // Diferencia de cambio: posición neta pasivos CLP estimada en 2.500 kUSD equivalentes
  const posicionNetaCLP = -2500;
  const deltaDifCambio = posicionNetaCLP * effectiveShock;
  const newDifCambio = base.difCambio + deltaDifCambio;
  const newRai = newResOp + newDifCambio - base.gastosFin;
  const newImp = newRai > 0 ? newRai * 0.27 : 0;
  const newUtilidad = newRai - newImp;
  const deltaUtilidad = newUtilidad - base.utilidad;
  const fmt = v => FA.fmtMoney(v, 'USD');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
      fontFamily: 'DM Mono',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, '>'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text,
      fontWeight: 600,
      letterSpacing: 0.6
    }
  }, "SENSIBILIDAD TIPO DE CAMBIO"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textMute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, "Impacto en P&L por shock CLP/USD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 10.5,
      color: TPAL_A.textMute,
      letterSpacing: 0.8
    }
  }, "SHOCK CLP/USD"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 18,
      color: TPAL_A.amber,
      fontWeight: 700
    }
  }, shock >= 0 ? '+' : '', shock.toFixed(1), "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: -10,
    max: 10,
    step: 0.5,
    value: shock,
    onChange: e => setShock(parseFloat(e.target.value)),
    style: {
      width: '100%',
      accentColor: TPAL_A.amber
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textDim
    }
  }, /*#__PURE__*/React.createElement("span", null, "TC base: ", Math.round(baseTC)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.text
    }
  }, "TC shock: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: TPAL_A.amber
    }
  }, Math.round(newTC))), /*#__PURE__*/React.createElement("span", null, shock >= 0 ? 'CLP debilitado' : 'CLP fortalecido'))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 10.5,
      color: TPAL_A.textMute,
      letterSpacing: 0.8
    }
  }, "COBERTURA (FORWARDS)"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'DM Mono',
      fontSize: 18,
      color: TPAL_A.cyan,
      fontWeight: 700
    }
  }, coverage, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    step: 5,
    value: coverage,
    onChange: e => setCoverage(parseInt(e.target.value)),
    style: {
      width: '100%',
      accentColor: TPAL_A.cyan
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textDim
    }
  }, /*#__PURE__*/React.createElement("span", null, "0% (sin cobertura)"), /*#__PURE__*/React.createElement("span", null, "100% (full hedge)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontFamily: 'DM Mono',
      fontSize: 11,
      color: TPAL_A.text
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.amber,
      fontWeight: 700,
      marginRight: 8
    }
  }, '>'), "IMPACTO EN P&L \xB7 ", months.length === 1 ? 'MAR 2026' : `${months.length} MESES`), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: TPAL_A.panel2
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'left',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "L\xCDNEA"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "BASE"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.amber,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "NUEVO"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.amber,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "\u0394"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 14px',
      textAlign: 'right',
      fontFamily: 'DM Mono',
      fontSize: 10,
      color: TPAL_A.textMute,
      letterSpacing: 0.8,
      borderBottom: `1px solid ${TPAL_A.borderHi}`,
      fontWeight: 500
    }
  }, "EXPOSICI\xD3N CLP"))), /*#__PURE__*/React.createElement("tbody", null, [{
    l: 'Ingresos',
    base: base.ingresos,
    nuevo: newIngresos,
    exp: '5%'
  }, {
    l: 'Costo Ventas',
    base: -base.costoVentas,
    nuevo: -newCostoVentas,
    exp: '55%'
  }, {
    l: 'Margen Bruto',
    base: base.margenBruto,
    nuevo: newMargenBruto,
    exp: '',
    bold: true
  }, {
    l: 'GAV',
    base: -base.gastosAdmin - base.gastosVentas,
    nuevo: -newGastosAdmin - newGastosVentas,
    exp: '~60%'
  }, {
    l: 'EBITDA',
    base: base.ebitda,
    nuevo: newEbitda,
    exp: '',
    bold: true,
    hi: true
  }, {
    l: 'Diferencia cambio',
    base: base.difCambio,
    nuevo: newDifCambio,
    exp: 'pos. neta -2.500'
  }, {
    l: 'Utilidad neta',
    base: base.utilidad,
    nuevo: newUtilidad,
    exp: '',
    bold: true,
    final: true
  }].map((r, i) => {
    const d = r.nuevo - r.base;
    const goodColor = r.l === 'Costo Ventas' || r.l === 'GAV' ? d < 0 ? TPAL_A.green : TPAL_A.red : d > 0 ? TPAL_A.green : TPAL_A.red;
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        background: r.hi ? 'rgba(255,176,0,0.04)' : r.bold ? TPAL_A.panel2 : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 14px',
        fontFamily: 'DM Mono',
        fontSize: 12,
        color: r.bold ? TPAL_A.amber : TPAL_A.text,
        fontWeight: r.bold ? 700 : 400,
        borderBottom: `1px solid ${TPAL_A.border}`,
        borderTop: r.final ? `1px solid ${TPAL_A.amberDim}` : undefined
      }
    }, r.l), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12.5,
        color: TPAL_A.textDim,
        borderBottom: `1px solid ${TPAL_A.border}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(r.base)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12.5,
        color: r.bold ? TPAL_A.amber : TPAL_A.text,
        fontWeight: r.bold ? 700 : 400,
        borderBottom: `1px solid ${TPAL_A.border}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmt(r.nuevo)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 12.5,
        color: Math.abs(d) < 1 ? TPAL_A.textMute : goodColor,
        fontWeight: 600,
        borderBottom: `1px solid ${TPAL_A.border}`,
        fontVariantNumeric: 'tabular-nums'
      }
    }, Math.abs(d) < 1 ? '—' : (d >= 0 ? '+' : '') + fmt(d).replace('+', '')), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '9px 14px',
        textAlign: 'right',
        fontFamily: 'DM Mono',
        fontSize: 11,
        color: TPAL_A.textMute,
        borderBottom: `1px solid ${TPAL_A.border}`
      }
    }, r.exp));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '12px 14px',
      background: TPAL_A.panel,
      border: `1px solid ${TPAL_A.border}`,
      fontFamily: 'DM Sans',
      fontSize: 13,
      color: TPAL_A.text,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'DM Mono',
      color: TPAL_A.amber,
      fontWeight: 700,
      marginRight: 8,
      fontSize: 11
    }
  }, "INTERPRETACI\xD3N"), "Un shock de ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: TPAL_A.amber
    }
  }, shock >= 0 ? '+' : '', shock.toFixed(1), "%"), " en CLP/USD con cobertura ", coverage, "% genera un impacto neto en EBITDA de", /*#__PURE__*/React.createElement("b", {
    style: {
      color: deltaEbitda > 0 ? TPAL_A.green : TPAL_A.red,
      marginLeft: 6
    }
  }, deltaEbitda >= 0 ? '+' : '', Math.round(deltaEbitda), " kUSD"), ' ', "y en utilidad de", /*#__PURE__*/React.createElement("b", {
    style: {
      color: deltaUtilidad > 0 ? TPAL_A.green : TPAL_A.red,
      marginLeft: 6
    }
  }, deltaUtilidad >= 0 ? '+' : '', Math.round(deltaUtilidad), " kUSD"), ".", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: TPAL_A.textDim
    }
  }, "El efecto neto es positivo cuando el peso se debilita (TC sube), porque la mayor parte del costo es CLP y los ingresos son USD.")));
}
window.QB_VariantA = VariantA;