// ─── QB · Quiborax S.A. — DATOS REALES extraídos del Excel oficial ─────
// Fuente: dashboard_gestion_jf-2.xlsx (hoja H1)
// Cifras en kUSD · TC = CLP/USD promedio mensual
// Real: Ene 2025 → Mar 2026 (último mes cerrado)
// Ppto 2026: enero a diciembre · Forecast 3+9 = Real Ene-Mar + Ppto Abr-Dic

const TC = {
  "2025-01": 991,
  "2025-02": 957,
  "2025-03": 943,
  "2025-04": 948,
  "2025-05": 938,
  "2025-06": 935,
  "2025-07": 973,
  "2025-08": 964,
  "2025-09": 960,
  "2025-10": 949,
  "2025-11": 929,
  "2025-12": 912,
  "2026-01": 865,
  "2026-02": 861,
  "2026-03": 927,
  "2026-04": 920,
  "2026-05": 920,
  "2026-06": 920,
  "2026-07": 920,
  "2026-08": 920,
  "2026-09": 920,
  "2026-10": 920,
  "2026-11": 920,
  "2026-12": 920
};

const MONTHS_REAL = ["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03"];

const ingresos      = {
  "2025-01": 7619,
  "2025-02": 5345,
  "2025-03": 6082,
  "2025-04": 8019,
  "2025-05": 8071,
  "2025-06": 9295,
  "2025-07": 8566,
  "2025-08": 7901,
  "2025-09": 9580,
  "2025-10": 8191,
  "2025-11": 7647,
  "2025-12": 6513,
  "2026-01": 7174,
  "2026-02": 6467,
  "2026-03": 8252
};
const costoVentas   = {
  "2025-01": 6099,
  "2025-02": 4532,
  "2025-03": 4998,
  "2025-04": 6861,
  "2025-05": 6787,
  "2025-06": 7906,
  "2025-07": 7022,
  "2025-08": 7279,
  "2025-09": 9312,
  "2025-10": 7869,
  "2025-11": 7309,
  "2025-12": 8000,
  "2026-01": 6710,
  "2026-02": 5698,
  "2026-03": 6722
};
const gastosAdmin   = {
  "2025-01": 1047,
  "2025-02": 859,
  "2025-03": 924,
  "2025-04": 942,
  "2025-05": 959,
  "2025-06": 1078,
  "2025-07": 1213,
  "2025-08": 1381,
  "2025-09": 1472,
  "2025-10": 1329,
  "2025-11": 1465,
  "2025-12": 2301,
  "2026-01": 1058,
  "2026-02": 791,
  "2026-03": 871
};
const gastosVentas  = {
  "2025-01": 188,
  "2025-02": 105,
  "2025-03": 142,
  "2025-04": 182,
  "2025-05": 176,
  "2025-06": 217,
  "2025-07": 220,
  "2025-08": 153,
  "2025-09": 187,
  "2025-10": 163,
  "2025-11": 134,
  "2025-12": 151,
  "2026-01": 61,
  "2026-02": 181,
  "2026-03": 179
};
const difCambio     = {
  "2025-01": 170,
  "2025-02": -134,
  "2025-03": -179,
  "2025-04": 88,
  "2025-05": -87,
  "2025-06": 15,
  "2025-07": 123,
  "2025-08": 33,
  "2025-09": -79,
  "2025-10": -72,
  "2025-11": -69,
  "2025-12": -1570,
  "2026-01": -232,
  "2026-02": -62,
  "2026-03": 140
};
const depreciacion  = {
  "2025-01": 489,
  "2025-02": 489,
  "2025-03": 490,
  "2025-04": 495,
  "2025-05": 495,
  "2025-06": 507,
  "2025-07": 506,
  "2025-08": 505,
  "2025-09": 507,
  "2025-10": 522,
  "2025-11": 508,
  "2025-12": 494,
  "2026-01": 503,
  "2026-02": 503,
  "2026-03": 499
};
const gastosFin     = {
  "2025-01": 136,
  "2025-02": 131,
  "2025-03": 145,
  "2025-04": 140,
  "2025-05": 150,
  "2025-06": 347,
  "2025-07": 206,
  "2025-08": 206,
  "2025-09": 199,
  "2025-10": 206,
  "2025-11": 218,
  "2025-12": 1343,
  "2026-01": 179,
  "2026-02": 162,
  "2026-03": 191
};

const volumen       = {
  "2025-01": {
    "acido_borico": 8174,
    "granulex": 2120,
    "otros": 0,
    "total": 10294
  },
  "2025-02": {
    "acido_borico": 6371,
    "granulex": 120,
    "otros": 0,
    "total": 6491
  },
  "2025-03": {
    "acido_borico": 7165,
    "granulex": 343,
    "otros": 0,
    "total": 7508
  },
  "2025-04": {
    "acido_borico": 8852,
    "granulex": 1598,
    "otros": 0,
    "total": 10450
  },
  "2025-05": {
    "acido_borico": 8384,
    "granulex": 2578,
    "otros": 0,
    "total": 10962
  },
  "2025-06": {
    "acido_borico": 10649,
    "granulex": 91,
    "otros": 0,
    "total": 10740
  },
  "2025-07": {
    "acido_borico": 8948,
    "granulex": 2160,
    "otros": 0,
    "total": 11108
  },
  "2025-08": {
    "acido_borico": 8755,
    "granulex": 210,
    "otros": 0,
    "total": 8965
  },
  "2025-09": {
    "acido_borico": 10808,
    "granulex": 274,
    "otros": 0,
    "total": 11082
  },
  "2025-10": {
    "acido_borico": 8987,
    "granulex": 304,
    "otros": 0,
    "total": 9291
  },
  "2025-11": {
    "acido_borico": 8456,
    "granulex": 321,
    "otros": 0,
    "total": 8777
  },
  "2025-12": {
    "acido_borico": 7155,
    "granulex": 156,
    "otros": 0,
    "total": 7311
  },
  "2026-01": {
    "acido_borico": 8031,
    "granulex": 255,
    "otros": 0,
    "total": 8286
  },
  "2026-02": {
    "acido_borico": 6918,
    "granulex": 235,
    "otros": 660,
    "total": 7813
  },
  "2026-03": {
    "acido_borico": 9088,
    "granulex": 140,
    "otros": 0,
    "total": 9228
  }
};
const porProducto   = {
  "2025-01": {
    "ingresoAB": 6371,
    "ingresoGLX": 789,
    "costoAB": 5346,
    "costoGLX": 849,
    "margenAB": 1026,
    "margenGLX": -60
  },
  "2025-02": {
    "ingresoAB": 8194,
    "ingresoGLX": 616,
    "costoAB": 6790,
    "costoGLX": 580,
    "margenAB": 1404,
    "margenGLX": 36
  },
  "2025-03": {
    "ingresoAB": 8242,
    "ingresoGLX": 854,
    "costoAB": 6818,
    "costoGLX": 635,
    "margenAB": 1424,
    "margenGLX": 218
  },
  "2025-04": {
    "ingresoAB": 7938,
    "ingresoGLX": 856,
    "costoAB": 6760,
    "costoGLX": 768,
    "margenAB": 1179,
    "margenGLX": 88
  },
  "2025-05": {
    "ingresoAB": 7382,
    "ingresoGLX": 1072,
    "costoAB": 6393,
    "costoGLX": 1035,
    "margenAB": 988,
    "margenGLX": 36
  },
  "2025-06": {
    "ingresoAB": 8502,
    "ingresoGLX": 696,
    "costoAB": 7200,
    "costoGLX": 666,
    "margenAB": 1302,
    "margenGLX": 29
  },
  "2025-07": {
    "ingresoAB": 7788,
    "ingresoGLX": 636,
    "costoAB": 6016,
    "costoGLX": 644,
    "margenAB": 1771,
    "margenGLX": -8
  },
  "2025-08": {
    "ingresoAB": 7281,
    "ingresoGLX": 649,
    "costoAB": 5886,
    "costoGLX": 639,
    "margenAB": 1396,
    "margenGLX": 10
  },
  "2025-09": {
    "ingresoAB": 5417,
    "ingresoGLX": 678,
    "costoAB": 4504,
    "costoGLX": 671,
    "margenAB": 913,
    "margenGLX": 8
  },
  "2025-10": {
    "ingresoAB": 6329,
    "ingresoGLX": 1363,
    "costoAB": 5006,
    "costoGLX": 1303,
    "margenAB": 1324,
    "margenGLX": 60
  },
  "2025-11": {
    "ingresoAB": 7664,
    "ingresoGLX": 936,
    "costoAB": 6005,
    "costoGLX": 889,
    "margenAB": 1659,
    "margenGLX": 47
  },
  "2025-12": {
    "ingresoAB": 5230,
    "ingresoGLX": 523,
    "costoAB": 4367,
    "costoGLX": 472,
    "margenAB": 864,
    "margenGLX": 51
  },
  "2026-01": {
    "ingresoAB": 6854,
    "ingresoGLX": 129,
    "costoAB": 6495,
    "costoGLX": 82,
    "margenAB": 359,
    "margenGLX": 47
  },
  "2026-02": {
    "ingresoAB": 6055,
    "ingresoGLX": 120,
    "costoAB": 5383,
    "costoGLX": 76,
    "margenAB": 672,
    "margenGLX": 44
  },
  "2026-03": {
    "ingresoAB": 7969,
    "ingresoGLX": 71,
    "costoAB": 6487,
    "costoGLX": 45,
    "margenAB": 1482,
    "margenGLX": 26
  }
};

const ppto2026 = {
  "2026-01": {
    "ingresos": 5416,
    "costoVentas": 5125,
    "gastosAdmin": 1189,
    "gastosVentas": 111,
    "difCambio": 0,
    "depreciacion": 503,
    "gastosFin": 163
  },
  "2026-02": {
    "ingresos": 5351,
    "costoVentas": 4997,
    "gastosAdmin": 1028,
    "gastosVentas": 111,
    "difCambio": 0,
    "depreciacion": 503,
    "gastosFin": 163
  },
  "2026-03": {
    "ingresos": 6138,
    "costoVentas": 5352,
    "gastosAdmin": 1015,
    "gastosVentas": 118,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-04": {
    "ingresos": 6140,
    "costoVentas": 5840,
    "gastosAdmin": 960,
    "gastosVentas": 111,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-05": {
    "ingresos": 7521,
    "costoVentas": 6916,
    "gastosAdmin": 950,
    "gastosVentas": 114,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-06": {
    "ingresos": 8407,
    "costoVentas": 7427,
    "gastosAdmin": 989,
    "gastosVentas": 118,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-07": {
    "ingresos": 8505,
    "costoVentas": 7361,
    "gastosAdmin": 1178,
    "gastosVentas": 122,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-08": {
    "ingresos": 8642,
    "costoVentas": 7361,
    "gastosAdmin": 995,
    "gastosVentas": 122,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-09": {
    "ingresos": 7703,
    "costoVentas": 6632,
    "gastosAdmin": 956,
    "gastosVentas": 107,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-10": {
    "ingresos": 8642,
    "costoVentas": 7317,
    "gastosAdmin": 998,
    "gastosVentas": 122,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-11": {
    "ingresos": 8332,
    "costoVentas": 7054,
    "gastosAdmin": 943,
    "gastosVentas": 118,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  },
  "2026-12": {
    "ingresos": 7578,
    "costoVentas": 6510,
    "gastosAdmin": 954,
    "gastosVentas": 107,
    "difCambio": 0,
    "depreciacion": 513,
    "gastosFin": 163
  }
};

// Mix por producto y mercados: estimados a partir de volumen real
// (Ácido bórico ~96% del volumen, Granulex ~3%, Otros ~1%)
const lineasMix = {
  acidoBorico:   0.94,  // ácido bórico (ingresos)
  granulex:      0.04,  // granulex
  otros:         0.02,
};

const mercados = {
  brasil:    0.34, europa: 0.22, usa: 0.18, asia: 0.14, chile: 0.08, otros: 0.04,
};

function calcImpuesto(rai) { return rai > 0 ? Math.round(rai * 0.27) : 0; }

function buildForecast() {
  const fc = {};
  ['2026-01','2026-02','2026-03'].forEach(m => {
    fc[m] = {
      ingresos: ingresos[m], costoVentas: costoVentas[m],
      gastosAdmin: gastosAdmin[m], gastosVentas: gastosVentas[m],
      difCambio: difCambio[m], depreciacion: depreciacion[m], gastosFin: gastosFin[m],
    };
  });
  ['2026-04','2026-05','2026-06','2026-07','2026-08','2026-09','2026-10','2026-11','2026-12'].forEach(m => {
    const p = ppto2026[m]; if (!p) return;
    // Ajuste FC: ingresos -2% por TC, costos +1.5%, dif cambio -120
    fc[m] = {
      ingresos: Math.round(p.ingresos * 0.98),
      costoVentas: Math.round(p.costoVentas * 1.015),
      gastosAdmin: p.gastosAdmin,
      gastosVentas: p.gastosVentas,
      difCambio: -120,
      depreciacion: p.depreciacion,
      gastosFin: p.gastosFin,
    };
  });
  return fc;
}
const forecast2026 = buildForecast();

function calcEERR(month, src) {
  const d = src === 'ppto' ? ppto2026[month] :
            src === 'fc'   ? forecast2026[month] :
            (ingresos[month] !== undefined ? {
              ingresos: ingresos[month], costoVentas: costoVentas[month],
              gastosAdmin: gastosAdmin[month], gastosVentas: gastosVentas[month],
              difCambio: difCambio[month], depreciacion: depreciacion[month],
              gastosFin: gastosFin[month],
            } : null);
  if (!d) return null;
  const margenBruto = d.ingresos - d.costoVentas;
  const resOperacional = margenBruto - d.gastosAdmin - d.gastosVentas - d.depreciacion;
  const ebitda = resOperacional + d.depreciacion;
  const rai = resOperacional + (d.difCambio||0) - d.gastosFin;
  const impuesto = calcImpuesto(rai);
  const utilidad = rai - impuesto;
  return { ...d, margenBruto, resOperacional, ebitda, rai, impuesto, utilidad,
           margenBrutoPct: d.ingresos ? margenBruto/d.ingresos : 0,
           ebitdaPct: d.ingresos ? ebitda/d.ingresos : 0,
           utilidadPct: d.ingresos ? utilidad/d.ingresos : 0 };
}

function aggRange(months, src) {
  const out = { ingresos: 0, costoVentas: 0, gastosAdmin: 0, gastosVentas: 0,
                difCambio: 0, depreciacion: 0, gastosFin: 0 };
  let n = 0;
  months.forEach(m => {
    const e = calcEERR(m, src); if (!e) return;
    out.ingresos += e.ingresos; out.costoVentas += e.costoVentas;
    out.gastosAdmin += e.gastosAdmin; out.gastosVentas += e.gastosVentas;
    out.difCambio += (e.difCambio||0); out.depreciacion += e.depreciacion;
    out.gastosFin += e.gastosFin; n++;
  });
  out.margenBruto = out.ingresos - out.costoVentas;
  out.resOperacional = out.margenBruto - out.gastosAdmin - out.gastosVentas - out.depreciacion;
  out.ebitda = out.resOperacional + out.depreciacion;
  out.rai = out.resOperacional + out.difCambio - out.gastosFin;
  out.impuesto = calcImpuesto(out.rai);
  out.utilidad = out.rai - out.impuesto;
  out.margenBrutoPct = out.ingresos ? out.margenBruto/out.ingresos : 0;
  out.ebitdaPct = out.ingresos ? out.ebitda/out.ingresos : 0;
  out.utilidadPct = out.ingresos ? out.utilidad/out.ingresos : 0;
  return out;
}

// Agrega ingresos/costos/margen por línea de producto (AB / GLX) para un rango de meses.
// Devuelve { AB:{ing,cost,marg}, GLX:{ing,cost,marg}, OTROS:{ing,cost,marg}, TOTAL:{ing,cost,marg} }.
function porProductoAgg(months) {
  const z = () => ({ ing: 0, cost: 0, marg: 0 });
  const out = { AB: z(), GLX: z(), OTROS: z(), TOTAL: z() };
  months.forEach(m => {
    const p = porProducto[m]; if (!p) return;
    out.AB.ing  += p.ingresoAB;  out.AB.cost  += p.costoAB;   out.AB.marg  += p.margenAB;
    out.GLX.ing += p.ingresoGLX; out.GLX.cost += p.costoGLX;  out.GLX.marg += p.margenGLX;
    // Otros = volumen.otros como ingreso (no tenemos costo separado → asumimos 80% costo)
    const otros = (volumen[m] && volumen[m].otros) || 0;
    out.OTROS.ing  += otros;
    out.OTROS.cost += otros * 0.8;
    out.OTROS.marg += otros * 0.2;
  });
  out.TOTAL.ing  = out.AB.ing + out.GLX.ing + out.OTROS.ing;
  out.TOTAL.cost = out.AB.cost + out.GLX.cost + out.OTROS.cost;
  out.TOTAL.marg = out.AB.marg + out.GLX.marg + out.OTROS.marg;
  ['AB','GLX','OTROS','TOTAL'].forEach(k => {
    out[k].margPct = out[k].ing ? out[k].marg/out[k].ing : 0;
    out[k].ingPctOfTotal = out.TOTAL.ing ? out[k].ing/out.TOTAL.ing : 0;
  });
  return out;
}

const ACCIONES_SEED = [
  { id: 1, title: 'Revisar sobreejecución de ingresos Q1 2026 (+29% vs Ppto)',  owner: 'CFO',          dueDate: '2026-04-30', priority: 'media', status: 'wip',     linkLine: 'ingresos',     completed: false,
    history: [{ts:'2026-04-08', by:'CFO', note:'Acción creada tras revisión de cierre Mar 2026'}] },
  { id: 2, title: 'Analizar varianza Costo Ventas Mar 2026 vs Ppto',            owner: 'Controller',   dueDate: '2026-04-25', priority: 'alta',  status: 'open',    linkLine: 'costoVentas',  completed: false,
    history: [{ts:'2026-04-08', by:'Controller', note:'Pendiente reunión con planta'}] },
  { id: 3, title: 'Presentar resultados Q1 a directorio',                       owner: 'Gerente Gen.', dueDate: '2026-05-08', priority: 'alta',  status: 'open',    linkLine: null,            completed: false,
    history: [{ts:'2026-04-05', by:'GG', note:'Agenda confirmada para 8 de mayo'}] },
  { id: 4, title: 'Cierre auditoría 2025 con Deloitte',                         owner: 'CFO',          dueDate: '2026-04-15', priority: 'media', status: 'done',    linkLine: null,            completed: true,
    history: [
      {ts:'2026-03-20', by:'CFO', note:'Walkthrough completado'},
      {ts:'2026-04-12', by:'CFO', note:'Carta de gerencia firmada'},
      {ts:'2026-04-15', by:'CFO', note:'Auditoría cerrada sin observaciones'},
    ]},
  { id: 5, title: 'Renegociar línea bancaria Santander (vence Jul-26)',         owner: 'Tesorería',    dueDate: '2026-06-15', priority: 'baja',  status: 'blocked', linkLine: 'gastosFin',     completed: false,
    history: [{ts:'2026-04-02', by:'Tesorería', note:'Esperando estados financieros auditados para presentar'}] },
  { id: 6, title: 'Cobertura TC: evaluar forwards a 6 meses',                   owner: 'Tesorería',    dueDate: '2026-04-20', priority: 'media', status: 'wip',     linkLine: 'difCambio',     completed: false,
    history: [
      {ts:'2026-04-04', by:'Tesorería', note:'Cotizaciones recibidas: BCI, Santander, BICE'},
      {ts:'2026-04-09', by:'CFO', note:'Aprobar cobertura 30% en próximo comité'},
    ]},
  { id: 7, title: 'Plan de acción Granulex: volumen YTD 8% bajo Ppto',          owner: 'Comercial',    dueDate: '2026-05-30', priority: 'media', status: 'open',    linkLine: 'ingresos',     completed: false,
    history: [{ts:'2026-04-10', by:'Comercial', note:'Contactar 3 clientes target en Brasil'}] },
];

const COMENTARIOS_SEED = {
  ingresos:       'Marzo cerró +34% vs Ppto y +36% vs Mar-25, impulsado por mayor tonelaje de ácido bórico (9.088 ton vs 6.600 Ppto) y precios estables ~877 USD/ton.',
  costoVentas:    'Costo unitario subió a 728 USD/ton (vs Ppto 811). Volumen mayor diluyó costo fijo, pero MP +12% por mayor consumo ácido sulfúrico.',
  gastosAdmin:    'Bajo Ppto en marzo (-14%), fundamentalmente por menores honorarios profesionales y postergación de gastos de TI a Q2.',
  difCambio:      'Resultado positivo en marzo (+140 kUSD) por revaluación de cuentas en CLP. TC cerró en 927 vs 943 Mar-25.',
  ebitda:         'EBITDA YTD Q1 2026: 1.127 kUSD vs Ppto 3.008 kUSD (-62%). Falta ejecutar 9 meses con margen objetivo de 14%.',
  resultadoOperacional: 'Resultado Operacional YTD negativo en -379 kUSD. Marzo recuperó +480 kUSD pero no compensa Ene-Feb deficitarios.',
};


const COSTO_DETALLE = {
  "mp": [
    {
      "name": "Ulexita Natural",
      "mes": 968,
      "mesAnt": 826,
      "ppto": 910,
      "ly": 1913,
      "ytdReal": 2775,
      "ytdPpto": 5334
    },
    {
      "name": "Ulexita Ascotán",
      "mes": 248,
      "mesAnt": 326,
      "ppto": 654,
      "ly": 0,
      "ytdReal": 1132,
      "ytdPpto": 0
    },
    {
      "name": "Ácido Sulfúrico",
      "mes": 1004,
      "mesAnt": 874,
      "ppto": 941,
      "ly": 1487,
      "ytdReal": 2764,
      "ytdPpto": 3776
    },
    {
      "name": "Ácido Piscinas Solares",
      "mes": 49,
      "mesAnt": 39,
      "ppto": 46,
      "ly": 43,
      "ytdReal": 125,
      "ytdPpto": 161
    },
    {
      "name": "Agua",
      "mes": 106,
      "mesAnt": 107,
      "ppto": 122,
      "ly": 157,
      "ytdReal": 328,
      "ytdPpto": 425
    },
    {
      "name": "Gas Natural (GNL)",
      "mes": 432,
      "mesAnt": 323,
      "ppto": 390,
      "ly": 453,
      "ytdReal": 1094,
      "ytdPpto": 1228
    },
    {
      "name": "Petróleo Bunker",
      "mes": 3,
      "mesAnt": 7,
      "ppto": 0,
      "ly": 10,
      "ytdReal": 14,
      "ytdPpto": 35
    },
    {
      "name": "Envases",
      "mes": 90,
      "mesAnt": 72,
      "ppto": 79,
      "ly": 102,
      "ytdReal": 236,
      "ytdPpto": 286
    },
    {
      "name": "Ripio",
      "mes": 57,
      "mesAnt": 0,
      "ppto": 26,
      "ly": 0,
      "ytdReal": 57,
      "ytdPpto": 0
    }
  ],
  "mo": [
    {
      "name": "Reactores",
      "mes": 18,
      "mesAnt": 20,
      "ppto": 19,
      "ly": 15,
      "ytdReal": 57,
      "ytdPpto": 41
    },
    {
      "name": "Cristalizadores",
      "mes": 19,
      "mesAnt": 22,
      "ppto": 21,
      "ly": 25,
      "ytdReal": 63,
      "ytdPpto": 71
    },
    {
      "name": "Centrífugas",
      "mes": 1,
      "mesAnt": 10,
      "ppto": 9,
      "ly": 17,
      "ytdReal": 19,
      "ytdPpto": 44
    },
    {
      "name": "Horno Secado",
      "mes": 61,
      "mesAnt": 73,
      "ppto": 68,
      "ly": 94,
      "ytdReal": 211,
      "ytdPpto": 279
    },
    {
      "name": "Calderas",
      "mes": 10,
      "mesAnt": 9,
      "ppto": 9,
      "ly": 11,
      "ytdReal": 30,
      "ytdPpto": 31
    },
    {
      "name": "Planta Desarenado Ulexita",
      "mes": 37,
      "mesAnt": 37,
      "ppto": 35,
      "ly": 38,
      "ytdReal": 112,
      "ytdPpto": 109
    },
    {
      "name": "Filtros Diemme",
      "mes": 12,
      "mesAnt": 12,
      "ppto": 11,
      "ly": 12,
      "ytdReal": 35,
      "ytdPpto": 52
    },
    {
      "name": "Separación de Cristales",
      "mes": 7,
      "mesAnt": 7,
      "ppto": 8,
      "ly": 7,
      "ytdReal": 23,
      "ytdPpto": 20
    },
    {
      "name": "Secado y Enfriamiento",
      "mes": 5,
      "mesAnt": 4,
      "ppto": 4,
      "ly": 6,
      "ytdReal": 14,
      "ytdPpto": 17
    }
  ],
  "cf": [
    {
      "name": "Seguros",
      "sub": "CFD",
      "mes": 65,
      "mesAnt": 70,
      "ppto": 67,
      "ly": 62,
      "ytdReal": 205,
      "ytdPpto": 182
    },
    {
      "name": "Depreciaciones",
      "sub": "CFD",
      "mes": 334,
      "mesAnt": 336,
      "ppto": 341,
      "ly": 247,
      "ytdReal": 1005,
      "ytdPpto": 740
    },
    {
      "name": "Energía y Combustibles",
      "sub": "CFD",
      "mes": 2,
      "mesAnt": 1,
      "ppto": 2,
      "ly": 2,
      "ytdReal": 5,
      "ytdPpto": 6
    },
    {
      "name": "Servicio De Transportistas",
      "sub": "CFD",
      "mes": 6,
      "mesAnt": 4,
      "ppto": 2,
      "ly": 7,
      "ytdReal": 10,
      "ytdPpto": 12
    },
    {
      "name": "Consumo Materiales y Sum.",
      "sub": "CFD",
      "mes": 151,
      "mesAnt": 104,
      "ppto": 192,
      "ly": 202,
      "ytdReal": 366,
      "ytdPpto": 559
    },
    {
      "name": "Servicio Rep. y Mantención",
      "sub": "CFD",
      "mes": 2,
      "mesAnt": 15,
      "ppto": 19,
      "ly": 12,
      "ytdReal": 33,
      "ytdPpto": 46
    },
    {
      "name": "Servicios Varios",
      "sub": "CFD",
      "mes": 10,
      "mesAnt": 10,
      "ppto": 6,
      "ly": 4,
      "ytdReal": 42,
      "ytdPpto": 19
    },
    {
      "name": "Energía Eléctrica",
      "sub": "CFI",
      "mes": 341,
      "mesAnt": 399,
      "ppto": 282,
      "ly": 295,
      "ytdReal": 1010,
      "ytdPpto": 842
    },
    {
      "name": "Compresores",
      "sub": "CFI",
      "mes": 4,
      "mesAnt": 16,
      "ppto": 7,
      "ly": 4,
      "ytdReal": 45,
      "ytdPpto": 17
    },
    {
      "name": "Gestión Equipos y Procesos",
      "sub": "CFI",
      "mes": 158,
      "mesAnt": 168,
      "ppto": 172,
      "ly": 198,
      "ytdReal": 517,
      "ytdPpto": 557
    },
    {
      "name": "Cargador Frontal",
      "sub": "CFI",
      "mes": 61,
      "mesAnt": 57,
      "ppto": 53,
      "ly": 71,
      "ytdReal": 167,
      "ytdPpto": 201
    },
    {
      "name": "Camiones Tolva",
      "sub": "CFI",
      "mes": 17,
      "mesAnt": 17,
      "ppto": 21,
      "ly": 17,
      "ytdReal": 51,
      "ytdPpto": 52
    },
    {
      "name": "Camiones Tolva Diemme",
      "sub": "CFI",
      "mes": 33,
      "mesAnt": 35,
      "ppto": 33,
      "ly": 31,
      "ytdReal": 101,
      "ytdPpto": 94
    },
    {
      "name": "Investigación y Desarrollo",
      "sub": "CFI",
      "mes": 30,
      "mesAnt": 33,
      "ppto": 33,
      "ly": 41,
      "ytdReal": 97,
      "ytdPpto": 124
    },
    {
      "name": "Laboratorio Químico",
      "sub": "CFI",
      "mes": 44,
      "mesAnt": 48,
      "ppto": 49,
      "ly": 61,
      "ytdReal": 139,
      "ytdPpto": 170
    },
    {
      "name": "Control de Calidad",
      "sub": "CFI",
      "mes": 45,
      "mesAnt": 48,
      "ppto": 48,
      "ly": 52,
      "ytdReal": 141,
      "ytdPpto": 163
    },
    {
      "name": "Administración Planta",
      "sub": "CFI",
      "mes": 225,
      "mesAnt": 256,
      "ppto": 232,
      "ly": 258,
      "ytdReal": 710,
      "ytdPpto": 730
    },
    {
      "name": "Alimentación del Personal",
      "sub": "CFI",
      "mes": 65,
      "mesAnt": 65,
      "ppto": 63,
      "ly": 70,
      "ytdReal": 180,
      "ytdPpto": 194
    },
    {
      "name": "Movilización del Personal",
      "sub": "CFI",
      "mes": 89,
      "mesAnt": 87,
      "ppto": 85,
      "ly": 104,
      "ytdReal": 275,
      "ytdPpto": 294
    },
    {
      "name": "Flete Bórico Planta a Bodega",
      "sub": "CFI",
      "mes": 37,
      "mesAnt": 42,
      "ppto": 42,
      "ly": 52,
      "ytdReal": 118,
      "ytdPpto": 148
    }
  ],
  "totals": {
    "mp": {
      "mes": 2957,
      "ppto": 3170,
      "ly": 4270,
      "ytdReal": 8543,
      "ytdPpto": 38451
    },
    "mo": {
      "mes": 169,
      "ppto": 185,
      "ly": 225,
      "ytdReal": 565,
      "ytdPpto": 2091
    },
    "cf": {
      "mes": 1729,
      "ppto": 1755,
      "ly": 1800,
      "ytdReal": 5244,
      "ytdPpto": 20899
    }
  }
};

window.QB_DATA = {
  COSTO_DETALLE,
  TC, MONTHS_REAL, ppto2026, forecast2026, lineasMix, mercados,
  ingresos, costoVentas, gastosAdmin, gastosVentas, difCambio, depreciacion, gastosFin,
  volumen, porProducto,
  ACCIONES_SEED, COMENTARIOS_SEED,
  calcEERR, aggRange, porProductoAgg,
  monthsYTD: (year) => MONTHS_REAL.filter(m => m.startsWith(year+'')),
  months2026Real: MONTHS_REAL.filter(m => m.startsWith('2026')),  // [ene,feb,mar 2026]
  months2026All:  Array.from({length: 12}, (_, i) => `2026-${String(i+1).padStart(2,'0')}`),
  monthsLast12:   MONTHS_REAL.slice(-12),
};
