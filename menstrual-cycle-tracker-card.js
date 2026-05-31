'use strict';

// ── Constants & Translations ───────────────────────────────────────────────────

const DOMAIN = 'menstrual_cycle_tracker';

const TRANSLATIONS = {
  en: {
    nextPeriod: "Next period",
    fertileWindow: "Fertile window",
    pmsWindow: "PMS window",
    lastPeriod: "Last period",
    avgStats: "Avg cycle / period",
    todaysSymptoms: "Today's symptoms",
    dueToday: "Due today",
    overdue: "overdue",
    was: "was",
    in: "in",
    yesOvulation: "Yes — ovulation window",
    yesPms: "Yes — within 5 days",
    no: "No",
    days: "days",
    day: "day",
    remaining: "remaining",
    expectedEndToday: "Expected to end today",
    longerThanUsual: "longer than usual",
    logPeriodStart: "Log Period Start",
    logPeriodEnd: "Log Period End",
    periodStartLogged: "✓ Period start logged",
    periodEndLogged: "✓ Period end logged",
    cancelPeriod: "Cancel Period",
    confirmOverwrite: "The last period started less than 15 days ago. Do you want to overwrite the previous entry?",
    addSymptom: "Add Symptom",
    symptom: "Symptom",
    severity: "Severity",
    add: "Add",
    symptomsDict: {
      cramps: "Cramps",
      headache: "Headache",
      fatigue: "Fatigue",
      bloating: "Bloating",
      mood_swings: "Mood Swings",
      temperature_sensitivity: "Temperature Sensitivity",
    },
    severityDict: {
      mild: "Mild",
      moderate: "Moderate",
      severe: "Severe",
      very_cold: "Very cold",
      slightly_cold: "Slightly cold",
      normal: "Normal",
      slightly_warm: "Slightly warm",
      very_hot: "Very hot",
    },
    phases: {
      menstrual: "Menstrual",
      follicular: "Follicular",
      ovulation: "Ovulation",
      luteal: "Luteal",
      unknown: "Unknown"
    },
    ui_entity: "Cycle Tracker (Period Active sensor)",
    ui_title: "Card title (blank = tracker name)",
    ui_show_cycle_bar: "Show cycle progress bar",
    ui_show_next: "Show next period date",
    ui_show_fertile: "Show fertile window row",
    ui_show_pms: "Show PMS window row",
    ui_show_last: "Show last period start / end dates",
    ui_show_stats: "Show avg cycle / period length",
    ui_show_symptoms: "Show today's symptoms",
    ui_show_log_buttons: "Show Log Period buttons",
    ui_color_menstrual: "Color: Menstrual",
    ui_color_follicular: "Color: Follicular",
    ui_color_ovulation: "Color: Ovulation",
    ui_color_luteal: "Color: Luteal",
  },
  de: {
    nextPeriod: "Nächste Periode",
    fertileWindow: "Fruchtbare Phase",
    pmsWindow: "PMS-Phase",
    lastPeriod: "Letzte Periode",
    avgStats: "Ø Zyklus / Periode",
    todaysSymptoms: "Heutige Symptome",
    dueToday: "Heute fällig",
    overdue: "überfällig",
    was: "war",
    in: "in",
    yesOvulation: "Ja — Eisprungfenster",
    yesPms: "Ja — innerhalb von 5 Tagen",
    no: "Nein",
    days: "Tage",
    day: "Tag",
    remaining: "verbleibend",
    expectedEndToday: "Sollte heute enden",
    longerThanUsual: "länger als gewöhnlich",
    logPeriodStart: "Periode eintragen",
    logPeriodEnd: "Periode beenden",
    periodStartLogged: "✓ Start eingetragen",
    periodEndLogged: "✓ Ende eingetragen",
    cancelPeriod: "Periode löschen",
    confirmOverwrite: "Die letzte Periode hat vor weniger als 15 Tagen begonnen. Möchtest du den vorherigen Eintrag überschreiben?",
    addSymptom: "Symptom eintragen",
    symptom: "Symptom",
    severity: "Schweregrad",
    add: "Eintragen",
    symptomsDict: {
      cramps: "Krämpfe",
      headache: "Kopfschmerzen",
      fatigue: "Müdigkeit",
      bloating: "Blähungen",
      mood_swings: "Stimmungsschwankungen",
      temperature_sensitivity: "Temperaturempfinden",
    },
    severityDict: {
      mild: "Leicht",
      moderate: "Mittel",
      severe: "Stark",
      very_cold: "Viel zu kalt",
      slightly_cold: "Leicht kühl",
      normal: "Normal",
      slightly_warm: "Leicht warm",
      very_hot: "Viel zu heiß",
    },
    phases: {
      menstrual: "Menstruation",
      follicular: "Follikelphase",
      ovulation: "Eisprung",
      luteal: "Lutealphase",
      unknown: "Unbekannt"
    },
    ui_entity: "Zyklus-Tracker (Periode Aktiv Sensor)",
    ui_title: "Kartentitel (leer = Name des Trackers)",
    ui_show_cycle_bar: "Zyklus-Fortschrittsbalken anzeigen",
    ui_show_next: "Nächstes Perioden-Datum anzeigen",
    ui_show_fertile: "Fruchtbare Phase anzeigen",
    ui_show_pms: "PMS-Phase anzeigen",
    ui_show_last: "Start/Ende der letzten Periode anzeigen",
    ui_show_stats: "Ø Zyklus-/Periodenlänge anzeigen",
    ui_show_symptoms: "Heutige Symptome anzeigen",
    ui_show_log_buttons: "Buttons zum Eintragen anzeigen",
    ui_color_menstrual: "Farbe: Menstruation",
    ui_color_follicular: "Farbe: Follikelphase",
    ui_color_ovulation: "Farbe: Eisprung",
    ui_color_luteal: "Farbe: Lutealphase",
  }
};

const DEFAULT_PHASE_META = {
  menstrual:  { color: '#e57373', bg: 'rgba(229,115,115,.15)', icon: '🩸' },
  follicular: { color: '#66bb6a', bg: 'rgba(102,187,106,.15)', icon: '🌱' },
  ovulation:  { color: '#ffca28', bg: 'rgba(255,202,40,.15)',  icon: '🥚' },
  luteal:     { color: '#ab47bc', bg: 'rgba(171,71,188,.15)',  icon: '🌙' },
  unknown:    { color: 'var(--secondary-text-color)', bg: 'rgba(0,0,0,.06)', icon: '—' },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const st  = (hass, id) => hass.states[id]?.state ?? null;
const att = (hass, id, key) => hass.states[id]?.attributes?.[key] ?? null;

function deriveEntities(hass, periodActiveId) {
  const defaultDerive = () => {
    const slug = periodActiveId.replace(/^binary_sensor\./, '').replace(/_period_active$/, '');
    return {
      periodActive:   periodActiveId,
      currentPhase:   `sensor.${slug}_current_phase`,
      cycleDay:       `sensor.${slug}_cycle_day`,
      nextPeriod:     `sensor.${slug}_next_period`,
      periodLength:   `sensor.${slug}_period_length`,
      cycleLength:    `sensor.${slug}_cycle_length`,
      fertileWindow:  `sensor.${slug}_fertile_window`,
      todaysSymptoms: `sensor.${slug}_todays_symptoms`,
    };
  };

  if (!hass || !hass.entities || !hass.entities[periodActiveId]) return defaultDerive();
  
  const baseEntity = hass.entities[periodActiveId];
  if (!baseEntity.unique_id) return defaultDerive();

  const entryId = baseEntity.unique_id.replace(/_period_active$/, '');
  
  const findBySuffix = (suffix) => {
    const targetUniqueId = `${entryId}_${suffix}`;
    for (const [id, entity] of Object.entries(hass.entities)) {
      if (entity.unique_id === targetUniqueId) return id;
    }
    const slug = periodActiveId.replace(/^binary_sensor\./, '').replace(/_period_active$/, '');
    return `sensor.${slug}_${suffix}`;
  };

  return {
    periodActive:   periodActiveId,
    currentPhase:   findBySuffix('current_phase'),
    cycleDay:       findBySuffix('cycle_day'),
    nextPeriod:     findBySuffix('next_period'),
    periodLength:   findBySuffix('period_length'),
    cycleLength:    findBySuffix('cycle_length'),
    fertileWindow:  findBySuffix('fertile_window'),
    todaysSymptoms: findBySuffix('todays_symptoms'),
  };
}

function fmtDate(iso) {
  if (!iso) return '—';
  try {
    const [, m, d] = iso.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}`;
  } catch { return iso; }
}

const pl = (n, word, t) => {
  if (t === TRANSLATIONS.de) return `${n} ${n === 1 ? t.day : t.days}`;
  return `${n} ${word}${n === 1 ? '' : 's'}`;
};

// ── Row builder ────────────────────────────────────────────────────────────────

function infoRow(icon, label, value, valueColor, entityId) {
  const style = valueColor ? ` style="color:${esc(valueColor)}"` : '';
  const entity = entityId ? ` data-entity="${esc(entityId)}"` : '';
  return `
    <div class="row${entityId ? ' clickable' : ''}"${entity}>
      <ha-icon icon="${esc(icon)}"></ha-icon>
      <span class="row-label">${esc(label)}</span>
      <span class="row-value"${style}>${esc(value)}</span>
    </div>`;
}

// ── Visual editor schema ───────────────────────────────────────────────────────

const SCHEMA = (t) => [
  {
    name: 'entity', required: true,
    label: t.ui_entity,
    selector: { entity: { domain: 'binary_sensor', integration: 'menstrual_cycle_tracker' } },
  },
  { name: 'title',            label: t.ui_title,            selector: { text: {} } },
  { name: 'show_cycle_bar',   label: t.ui_show_cycle_bar,   selector: { boolean: {} } },
  { name: 'show_next',        label: t.ui_show_next,        selector: { boolean: {} } },
  { name: 'show_fertile',     label: t.ui_show_fertile,     selector: { boolean: {} } },
  { name: 'show_pms',         label: t.ui_show_pms,         selector: { boolean: {} } },
  { name: 'show_last',        label: t.ui_show_last,        selector: { boolean: {} } },
  { name: 'show_stats',       label: t.ui_show_stats,       selector: { boolean: {} } },
  { name: 'show_symptoms',    label: t.ui_show_symptoms,    selector: { boolean: {} } },
  { name: 'show_log_buttons', label: t.ui_show_log_buttons, selector: { boolean: {} } },
  { name: 'tracker',          label: 'Tracker ID (Optional)', selector: { config_entry: { integration: 'menstrual_cycle_tracker' } } },
  { name: 'color_menstrual',  label: t.ui_color_menstrual,  selector: { color_rgb: {} } },
  { name: 'color_follicular', label: t.ui_color_follicular, selector: { color_rgb: {} } },
  { name: 'color_ovulation',  label: t.ui_color_ovulation,  selector: { color_rgb: {} } },
  { name: 'color_luteal',     label: t.ui_color_luteal,     selector: { color_rgb: {} } },
];

// ── Card ───────────────────────────────────────────────────────────────────────

class MenstrualCycleTrackerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config  = null;
    this._hass    = null;
    this._ent     = null;
    this._pending = null; 
    this._showAddSymptom = false;

    this.shadowRoot.addEventListener('click', (e) => {
      // Buttons inside card
      const btn = e.target.closest('[data-action]');
      if (btn && !btn.disabled) {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'start' || action === 'end') {
          const dateInput = this.shadowRoot.querySelector(`#${action}-date`)?.value;
          this._log(action, dateInput);
        } else if (action === 'cancel_period') {
          this._cancelPeriod();
        } else if (action === 'toggle_symptom') {
          this._showAddSymptom = !this._showAddSymptom;
          this._render();
        } else if (action === 'add_symptom') {
          this._addSymptom();
        } else if (action === 'delete_symptom') {
          this._deleteSymptom(btn.dataset.symptom, btn.dataset.date);
        }
        return;
      }

      // More-info on clickable rows / elements
      const clickable = e.target.closest('[data-entity]');
      if (clickable) {
        e.stopPropagation();
        this._showMoreInfo(clickable.dataset.entity);
        return;
      }
    });
  }

  static getConfigElement() {
    return document.createElement('menstrual-cycle-tracker-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      title: '',
      show_cycle_bar:       true,
      show_next:            true,
      show_fertile:         true,
      show_pms:             true,
      show_last:            false,
      show_stats:           true,
      show_symptoms:        true,
      show_log_buttons:     true,
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error('Set the Period Active entity in the card editor.');
    this._config = config;
    this._entDerived = false;
    
    // Setup colors (convert RGB array to string if needed)
    const getCol = (c) => Array.isArray(c) ? `rgb(${c.join(',')})` : c;
    this._phaseMeta = JSON.parse(JSON.stringify(DEFAULT_PHASE_META));
    if (config.color_menstrual)  this._phaseMeta.menstrual.color = getCol(config.color_menstrual);
    if (config.color_follicular) this._phaseMeta.follicular.color = getCol(config.color_follicular);
    if (config.color_ovulation)  this._phaseMeta.ovulation.color = getCol(config.color_ovulation);
    if (config.color_luteal)     this._phaseMeta.luteal.color = getCol(config.color_luteal);
  }

  set hass(hass) {
    this._hass = hass;
    this._t = hass.language === 'de' ? TRANSLATIONS.de : TRANSLATIONS.en;
    
    if (!this._entDerived && hass.entities) {
      this._ent = deriveEntities(hass, this._config.entity);
      this._entDerived = true;
    }

    // Prevent dropdown closing: only re-render if entity states actually changed
    if (this._ent) {
      const stateHash = Object.values(this._ent).map(id => {
        const s = hass.states[id];
        return s ? `${s.state}|${JSON.stringify(s.attributes)}` : 'null';
      }).join('||');
      
      if (this._lastStateHash !== stateHash) {
        this._lastStateHash = stateHash;
        this._render();
      }
    } else {
      this._render();
    }
  }

  // ── Service calls ────────────────────────────────────────────────────────────

  async _resolveTrackerId() {
    if (this._trackerId) return this._trackerId;
    this._trackerId = this._config.tracker || null;
    if (!this._trackerId) {
      try {
        const entries = await this._hass.callWS({ type: 'config_entries/get', domain: DOMAIN });
        if (entries?.length === 1) {
          this._trackerId = entries[0].entry_id;
        } else if (entries?.length > 1) {
          const slug = this._config.entity.replace(/^binary_sensor\./, '').replace(/_period_active$/, '');
          const match = entries.find(e => e.title.toLowerCase().replace(/\s+/g, '_') === slug);
          this._trackerId = match?.entry_id ?? null;
        }
      } catch { }
    }
    return this._trackerId;
  }

  async _log(action, date) {
    if (this._pending) return;

    if (action === 'start') {
      const lastStartStr = att(this._hass, this._ent.periodActive, 'last_period_start');
      if (lastStartStr) {
        const lastStart = new Date(lastStartStr);
        const newStart = date ? new Date(date) : new Date();
        const diffDays = Math.abs(newStart - lastStart) / (1000 * 60 * 60 * 24);
        if (diffDays < 15) {
          if (!confirm(this._t.confirmOverwrite)) {
            return;
          }
        }
      }
    }

    this._pending = action;
    this._render();

    const service = action === 'start' ? 'log_period_start' : 'log_period_end';
    const tracker = await this._resolveTrackerId();
    const data = tracker ? { tracker } : {};
    if (date) data.date = date;

    try {
      await this._hass.callService(DOMAIN, service, data);
      setTimeout(() => { this._pending = null; this._render(); }, 2500);
    } catch {
      this._pending = null;
      this._render();
    }
  }

  async _cancelPeriod() {
    if (this._pending) return;
    const lastStart = att(this._hass, this._ent.periodActive, 'last_period_start');
    if (!lastStart) return;
    
    this._pending = 'cancel';
    this._render();
    
    const tracker = await this._resolveTrackerId();
    const data = { start_date: lastStart };
    if (tracker) data.tracker = tracker;

    try {
      await this._hass.callService(DOMAIN, 'delete_cycle', data);
      setTimeout(() => { this._pending = null; this._render(); }, 1500);
    } catch {
      this._pending = null;
      this._render();
    }
  }

  async _addSymptom() {
    if (this._pending) return;
    
    const symptomSelect = this.shadowRoot.querySelector('#symptom-select');
    const severitySelect = this.shadowRoot.querySelector('#severity-select');
    const dateInput = this.shadowRoot.querySelector('#symptom-date');
    
    if (!symptomSelect || !symptomSelect.value) return;
    
    this._pending = 'symptom';
    this._render();
    
    const tracker = await this._resolveTrackerId();
    const data = { symptom: symptomSelect.value };
    if (severitySelect && severitySelect.value) data.severity = severitySelect.value;
    if (dateInput && dateInput.value) data.date = dateInput.value;
    if (tracker) data.tracker = tracker;

    try {
      await this._hass.callService(DOMAIN, 'log_symptom', data);
      setTimeout(() => { 
        this._pending = null; 
        this._showAddSymptom = false;
        this._render(); 
      }, 1500);
    } catch {
      this._pending = null;
      this._render();
    }
  }

  async _deleteSymptom(symptom, date) {
    if (this._pending) return;
    
    this._pending = 'symptom';
    this._render();
    
    const tracker = await this._resolveTrackerId();
    const data = { symptom, date };
    if (tracker) data.tracker = tracker;

    try {
      await this._hass.callService(DOMAIN, 'delete_symptom', data);
      setTimeout(() => { this._pending = null; this._render(); }, 1500);
    } catch {
      this._pending = null;
      this._render();
    }
  }

  _showMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      detail: { entityId }, bubbles: true, composed: true,
    }));
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  _render() {
    const { _hass: hass, _config: cfg, _ent: e, _t: t, _phaseMeta: phaseMeta } = this;
    if (!hass || !cfg || !e) return;

    // ── Read entity state & attributes ──────────────────────────────────────
    const isActive        = st(hass, e.periodActive) === 'on';
    const phase           = (st(hass, e.currentPhase) ?? 'unknown').toLowerCase();
    const cycleDay        = parseInt(st(hass, e.cycleDay))      || null;
    const nextPeriodStr   = st(hass, e.nextPeriod);
    const daysUntil       = att(hass, e.nextPeriod,    'days_until_next_period'); 
    const daysOverdue     = att(hass, e.nextPeriod,    'days_overdue');           
    const periodLen       = parseInt(st(hass, e.periodLength)) || 5;
    const cycleLen        = parseInt(st(hass, e.cycleLength))  || 28;
    const isFertile       = st(hass, e.fertileWindow) === 'Yes';
    const isPms           = att(hass, e.fertileWindow, 'is_pms_window') === true;
    const daysActive      = att(hass, e.periodActive,  'days_active');            
    const daysLeft        = att(hass, e.periodActive,  'days_left_of_period');    
    const daysEndOverdue  = att(hass, e.periodActive,  'days_period_end_overdue');
    const lastStart       = att(hass, e.periodActive,  'last_period_start');      
    const lastEnd         = att(hass, e.periodActive,  'last_period_end');        
    const symptoms        = att(hass, e.todaysSymptoms,'symptoms') ?? [];

    const meta = phaseMeta[phase] ?? phaseMeta.unknown;
    const phaseLocalized = t.phases[phase] || phase;

    const title = esc(
      cfg.title ||
      hass.states[e.periodActive]?.attributes?.friendly_name?.replace(/ Period Active$/i, '') ||
      'Cycle Tracker'
    );

    // ── Status subtitle ───────────────────────────────────────────────────────
    let statusLine = '';
    if (isActive) {
      const day  = daysActive ?? '?';
      if (daysLeft != null && daysLeft > 0) {
        statusLine = `${t.day} ${day} · ${pl(daysLeft, 'day', t)} ${t.remaining}`;
      } else if (daysEndOverdue != null && daysEndOverdue === 0) {
        statusLine = `${t.day} ${day} · ${t.expectedEndToday}`;
      } else if (daysEndOverdue != null && daysEndOverdue > 0) {
        statusLine = `${t.day} ${day} · ${pl(daysEndOverdue, 'day', t)} ${t.longerThanUsual}`;
      } else {
        statusLine = `${t.day} ${day}`;
      }
    } else {
      if (daysOverdue != null && daysOverdue === 0) {
        statusLine = t.dueToday;
      } else if (daysOverdue != null && daysOverdue > 0) {
        statusLine = `${pl(daysOverdue, 'day', t)} ${t.overdue}`;
      } else if (daysUntil != null && daysUntil > 0) {
        statusLine = `${t.nextPeriod} ${t.in} ${pl(daysUntil, 'day', t)}`;
      }
    }

    // ── Cycle progress bar ────────────────────────────────────────────────────
    let barHtml = '';
    if (cfg.show_cycle_bar !== false && cycleLen > 0) {
      const ovDay = Math.max(cycleLen - 14, periodLen + 1);
      const segs  = [
        { phase: 'menstrual',  start: 1,          end: periodLen      },
        { phase: 'follicular', start: periodLen+1, end: ovDay-2        },
        { phase: 'ovulation',  start: ovDay-1,     end: ovDay+2        },
        { phase: 'luteal',     start: ovDay+3,     end: cycleLen       },
      ].filter(s => s.end >= s.start);

      const segHtml = segs.map((s, i) => {
        const w = ((s.end - s.start + 1) / cycleLen * 100).toFixed(2);
        const r = `${i === 0 ? '4px' : '0'} ${i === segs.length-1 ? '4px' : '0'} ${i === segs.length-1 ? '4px' : '0'} ${i === 0 ? '4px' : '0'}`;
        return `<div style="width:${w}%;background:${phaseMeta[s.phase].color};border-radius:${r};height:100%"
                     title="${t.phases[s.phase] || s.phase}: ${t.days} ${s.start}–${s.end}"></div>`;
      }).join('');

      const dotHtml = cycleDay
        ? `<div class="today-dot"
               style="left:${((cycleDay - 0.5) / cycleLen * 100).toFixed(2)}%;
                      border-color:${meta.color}">
             <span class="today-label">${t.day} ${cycleDay}</span>
           </div>`
        : '';

      barHtml = `<div class="bar-track clickable" data-entity="${esc(e.cycleDay)}">${segHtml}${dotHtml}</div>`;
    }

    // ── Info rows ─────────────────────────────────────────────────────────────
    const rows = [];

    if (cfg.show_next !== false) {
      let nextLabel = '—';
      if (daysOverdue != null && daysOverdue === 0) {
        nextLabel = t.dueToday;
      } else if (daysOverdue != null && daysOverdue > 0) {
        nextLabel = `${pl(daysOverdue, 'day', t)} ${t.overdue}`;
        if (nextPeriodStr) nextLabel += ` · ${t.was} ${nextPeriodStr}`;
      } else if (nextPeriodStr && daysUntil != null && daysUntil > 0) {
        nextLabel = `${nextPeriodStr} · ${t.in} ${pl(daysUntil, 'day', t)}`;
      } else if (nextPeriodStr) {
        nextLabel = nextPeriodStr;
      }
      rows.push(infoRow('mdi:calendar-clock', t.nextPeriod, nextLabel,
        (daysOverdue != null && daysOverdue >= 0) ? '#ef5350' : null, e.nextPeriod));
    }

    if (cfg.show_fertile !== false) {
      rows.push(infoRow('mdi:flower-outline', t.fertileWindow, isFertile ? t.yesOvulation : t.no,
        isFertile ? '#66bb6a' : null, e.fertileWindow));
    }

    if (cfg.show_pms !== false) {
      rows.push(infoRow('mdi:emoticon-sad-outline', t.pmsWindow, isPms ? t.yesPms : t.no,
        isPms ? '#ab47bc' : null, e.fertileWindow));
    }

    if (cfg.show_last !== false && (lastStart || lastEnd)) {
      rows.push(infoRow('mdi:calendar-range', t.lastPeriod, `${fmtDate(lastStart)} → ${fmtDate(lastEnd)}`,
        null, e.periodActive));
    }

    if (cfg.show_stats !== false) {
      rows.push(infoRow('mdi:chart-bar', t.avgStats, `${cycleLen} ${t.days} / ${periodLen} ${t.days}`,
        null, e.cycleLength));
    }

    // ── Symptoms ───────────────────────────────────────────────────────────────
    let sympHtml = '';
    if (cfg.show_symptoms !== false) {
      const today = new Date().toISOString().split('T')[0];
      const chips = symptoms.map(s => {
        const sevKey = s.severity;
        const sympKey = s.symptom;
        const localizedSev = t.severityDict[sevKey] || sevKey;
        const localizedSymp = t.symptomsDict[sympKey] || sympKey;
        
        const sev = localizedSev ? ` <span class="chip-sev">${esc(localizedSev)}</span>` : '';
        return `<span class="chip">
                  ${esc(localizedSymp)}${sev}
                  <ha-icon class="chip-delete" icon="mdi:close-circle" data-action="delete_symptom" data-symptom="${esc(sympKey)}" data-date="${esc(s.date || today)}"></ha-icon>
                </span>`;
      }).join('');
      
      const chipsArea = chips ? `<div class="chips">${chips}</div>` : '';
      
      let addSymptomArea = '';
      if (this._showAddSymptom) {
        addSymptomArea = `
          <div class="add-symptom-box">
            <input type="date" id="symptom-date" value="${today}" class="date-picker">
            <select id="symptom-select" class="dropdown">
              <option value="" disabled selected>${t.symptom}...</option>
              ${Object.entries(t.symptomsDict).map(([k,v]) => `<option value="${k}">${esc(v)}</option>`).join('')}
            </select>
            <select id="severity-select" class="dropdown">
              <option value="" selected>${t.severity}...</option>
              ${Object.entries(t.severityDict).map(([k,v]) => `<option value="${k}">${esc(v)}</option>`).join('')}
            </select>
            <button class="add-btn" data-action="add_symptom">${this._pending === 'symptom' ? '...' : t.add}</button>
          </div>
        `;
      }
      
      sympHtml = `
        <div class="symptom-header">
          <div class="section-label clickable" data-entity="${esc(e.todaysSymptoms)}">${t.todaysSymptoms}</div>
          <button class="add-symptom-icon clickable" data-action="toggle_symptom">
            <ha-icon icon="${this._showAddSymptom ? 'mdi:minus' : 'mdi:plus'}"></ha-icon>
          </button>
        </div>
        ${addSymptomArea}
        ${chipsArea}`;
    }

    // ── Log buttons ────────────────────────────────────────────────────────────
    let logHtml = '';
    if (cfg.show_log_buttons !== false) {
      const pendStart = this._pending === 'start';
      const pendEnd   = this._pending === 'end';
      const pendCancel= this._pending === 'cancel';
      const disabled  = this._pending ? 'disabled' : '';
      const c         = esc(meta.color);
      const today     = new Date().toISOString().split('T')[0];

      if (!isActive) {
        logHtml = `
          <div class="log-combo">
            <input type="date" id="start-date" class="date-picker" value="${today}">
            <button class="log-btn${pendStart ? ' done' : ''}" data-action="start"
                    style="background:${pendStart ? '#4caf50' : c};border-color:${pendStart ? '#4caf50' : c}"
                    ${disabled}>
              ${pendStart ? t.periodStartLogged : t.logPeriodStart}
            </button>
          </div>
          `;
      } else {
        logHtml = `
          <div class="log-combo">
            <input type="date" id="end-date" class="date-picker" value="${today}">
            <button class="log-btn outline${pendEnd ? ' done' : ''}" data-action="end"
                    style="color:${pendEnd ? '#4caf50' : c};border-color:${pendEnd ? '#4caf50' : c}"
                    ${disabled}>
              ${pendEnd ? t.periodEndLogged : t.logPeriodEnd}
            </button>
          </div>
          <div class="cancel-row">
            <button class="cancel-btn outline" data-action="cancel_period" ${disabled}>
              <ha-icon icon="mdi:delete-outline"></ha-icon> ${pendCancel ? '...' : t.cancelPeriod}
            </button>
          </div>
          `;
      }

      logHtml = `<div class="log-row">${logHtml}</div>`;
    }

    // ── Full render ────────────────────────────────────────────────────────────
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { padding: 16px 16px 12px; box-sizing: border-box; }

        /* ── Header ── */
        .header { display: flex; align-items: center; gap: 10px; margin-bottom: 2px; }
        .badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 20px; font-size: .75rem; font-weight: 600;
          background: ${esc(meta.bg)}; color: ${esc(meta.color)};
          white-space: nowrap;
        }
        .badge-icon { font-size: .95rem; }
        .card-title {
          flex: 1; font-size: 1.05rem; font-weight: 600;
          color: var(--primary-text-color); overflow: hidden;
          white-space: nowrap; text-overflow: ellipsis;
        }
        .cycle-day-chip {
          font-size: .75rem; color: var(--secondary-text-color);
          white-space: nowrap;
        }

        /* ── Status subtitle ── */
        .status {
          font-size: .85rem; margin: 4px 0 12px;
          color: ${isActive ? esc(meta.color) : 'var(--secondary-text-color)'};
          font-weight: ${isActive ? '500' : '400'};
        }

        /* ── Progress bar ── */
        .bar-track {
          position: relative; display: flex; height: 8px;
          border-radius: 4px; overflow: visible; margin-bottom: 14px;
        }
        .today-dot {
          position: absolute; top: 50%;
          transform: translate(-50%, -50%);
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--card-background-color, white);
          border: 2.5px solid;
          box-shadow: 0 1px 3px rgba(0,0,0,.25);
          z-index: 1;
        }
        .today-label {
          display: none; position: absolute; bottom: 16px; left: 50%;
          transform: translateX(-50%);
          background: var(--card-background-color, white);
          border: 1px solid var(--divider-color);
          border-radius: 4px; padding: 1px 5px;
          font-size: .7rem; white-space: nowrap;
          color: var(--primary-text-color);
          box-shadow: 0 1px 3px rgba(0,0,0,.15);
          pointer-events: none;
        }
        .today-dot:hover .today-label { display: block; }

        /* ── Clickable elements ── */
        .clickable { cursor: pointer; }
        .row.clickable:hover { background: var(--secondary-background-color); border-radius: 6px; }

        /* ── Info rows ── */
        .rows { display: flex; flex-direction: column; gap: 7px; margin-bottom: 10px; }
        .row {
          display: flex; align-items: center; gap: 8px; min-height: 20px;
          padding: 2px 4px; margin: -2px -4px;
          transition: background .15s;
        }
        .row ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); flex-shrink: 0; }
        .row-label { font-size: .82rem; color: var(--secondary-text-color); width: 120px; flex-shrink: 0; }
        .row-value { font-size: .85rem; color: var(--primary-text-color); font-weight: 500; }

        /* ── Symptoms ── */
        .symptom-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; margin-top: 10px; }
        .section-label { font-size: .85rem; color: var(--secondary-text-color); margin-bottom: 0; }
        .add-symptom-icon { 
          background: var(--secondary-background-color); border: none; border-radius: 50%;
          width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
          color: var(--secondary-text-color); cursor: pointer; transition: all 0.2s;
        }
        .add-symptom-icon ha-icon { --mdc-icon-size: 20px; }
        .add-symptom-icon:hover { background: var(--primary-color); color: white; }
        .add-symptom-box { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; background: var(--secondary-background-color); padding: 12px; border-radius: 8px; }
        .date-picker, .dropdown { 
          background: var(--card-background-color, white); color: var(--primary-text-color); 
          border: 1px solid var(--divider-color); border-radius: 6px; padding: 10px; font-size: 1rem;
          outline: none; width: 100%; box-sizing: border-box; min-height: 44px;
        }
        .add-btn { background: var(--primary-color); color: white; border: none; border-radius: 6px; padding: 12px; font-size: 1rem; cursor: pointer; min-height: 44px; font-weight: 500; }
        
        .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
        .chip {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px 10px; border-radius: 16px; font-size: .85rem;
          background: var(--secondary-background-color); color: var(--primary-text-color);
        }
        .chip-sev { opacity: .65; font-size: .8rem; }
        .chip-delete { --mdc-icon-size: 18px; cursor: pointer; opacity: 0.5; margin-left: 2px; }
        .chip-delete:hover { opacity: 1; color: #ef5350; }

        /* ── Log buttons ── */
        .log-row { margin-top: 10px; display: flex; flex-direction: column; gap: 10px; }
        .log-combo { display: flex; gap: 8px; align-items: stretch; }
        .log-combo .date-picker { padding: 10px; font-size: 1rem; border-radius: 8px; border: 1.5px solid var(--divider-color); flex: 0 0 130px; }
        .log-btn {
          flex: 1; padding: 12px 0; border-radius: 8px; border: 1.5px solid;
          font-size: 1rem; font-weight: 500; cursor: pointer;
          transition: opacity .15s, background .2s, border-color .2s, color .2s;
          background: var(--primary-color); color: white;
        }
        .log-btn.outline { background: transparent; }
        .log-btn.done    { background: #4caf50 !important; border-color: #4caf50 !important; color: white !important; }
        .log-btn:disabled { opacity: .55; cursor: default; }
        .log-btn:not(:disabled):hover { opacity: .85; }

        .cancel-row { display: flex; justify-content: flex-end; }
        .cancel-btn { 
          background: transparent; color: #ef5350; border: 1px solid #ef5350; 
          border-radius: 6px; padding: 4px 10px; font-size: .75rem; cursor: pointer; 
          display: flex; align-items: center; gap: 4px; opacity: 0.8;
        }
        .cancel-btn ha-icon { --mdc-icon-size: 14px; }
        .cancel-btn:hover { opacity: 1; background: rgba(239, 83, 80, 0.1); }
      </style>

      <ha-card>
        <div class="header">
          <div class="badge clickable" data-entity="${esc(e.currentPhase)}">
            <span class="badge-icon">${meta.icon}</span>
            <span>${esc(phaseLocalized)}</span>
          </div>
          <div class="card-title">${title}</div>
          ${cycleDay ? `<div class="cycle-day-chip clickable" data-entity="${esc(e.cycleDay)}">${t.day} ${cycleDay} / ${cycleLen}</div>` : ''}
        </div>
        ${statusLine ? `<div class="status">${esc(statusLine)}</div>` : '<div style="height:12px"></div>'}
        ${barHtml}
        <div class="rows">${rows.join('')}</div>
        ${sympHtml}
        ${logHtml}
      </ha-card>
    `;
  }

  getCardSize() { return 4; }
}

// ── Visual editor ──────────────────────────────────────────────────────────────

class MenstrualCycleTrackerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = null;
    this._hass   = null;
  }
  set hass(hass) {
    this._hass = hass;
    const form = this.shadowRoot.querySelector('ha-form');
    if (form) form.hass = hass;
  }
  setConfig(config) {
    this._config = config;
    this._ensureForm();
    const form = this.shadowRoot.querySelector('ha-form');
    form.data  = this._config;
  }
  _ensureForm() {
    if (this.shadowRoot.querySelector('ha-form')) return;
    const form = document.createElement('ha-form');
    const lang = this._hass?.language || 'en';
    const t = lang === 'de' ? TRANSLATIONS.de : TRANSLATIONS.en;
    form.schema       = SCHEMA(t);
    form.computeLabel = s => s.label ?? s.name;
    form.addEventListener('value-changed', e => {
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: e.detail.value }, bubbles: true, composed: true,
      }));
    });
    this.shadowRoot.appendChild(form);
    if (this._hass) form.hass = this._hass;
  }
}

// ── Registration ───────────────────────────────────────────────────────────────

customElements.define('menstrual-cycle-tracker-card', MenstrualCycleTrackerCard);
customElements.define('menstrual-cycle-tracker-card-editor', MenstrualCycleTrackerCardEditor);
window.customCards ??= [];
window.customCards.push({
  type:        'menstrual-cycle-tracker-card',
  name:        'Menstrual Cycle Tracker Card',
  description: 'Shows cycle phase, progress, fertile / PMS windows, symptoms, and log buttons.',
  preview:     false,
});
