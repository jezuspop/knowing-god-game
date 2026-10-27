(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const raw = window.GAME_DATA;
  const errors = [];
  if (!raw || !Array.isArray(raw.categories)) errors.push('game-data.js must define GAME_DATA with a categories array.');
  const data = raw && Array.isArray(raw.categories) ? raw : { categories: [] };
  const ids = new Set();
  const validId = (id, type) => {
    if (typeof id !== 'string' || !id.trim() || ids.has(id)) { errors.push(`${type} IDs must be nonempty and unique.`); return false; }
    ids.add(id); return true;
  };
  const categories = data.categories.filter(category => {
    if (!category || !validId(category.id, 'Category') || typeof category.name !== 'string' || !category.name.trim() || !Array.isArray(category.clues)) { errors.push('Every category needs an ID, name, and clues array.'); return false; }
    category.clues = category.clues.filter(clue => {
      if (!clue || !validId(clue.id, 'Clue') || typeof clue.value !== 'number' || !Number.isFinite(clue.value) || clue.value <= 0 || typeof clue.clue !== 'string' || !clue.clue.trim() || typeof clue.answer !== 'string' || !clue.answer.trim()) { errors.push(`A clue in ${category.name} needs a unique ID, positive numeric value, clue, and answer.`); return false; }
      return true;
    });
    return true;
  });
  const clues = new Map(categories.flatMap(category => category.clues.map(clue => [clue.id, { ...clue, category: category.name }])));
  if (data.finale) {
    const f = data.finale;
    if (validId(f.id, 'Finale') && typeof f.clue === 'string' && f.clue.trim() && typeof f.answer === 'string' && f.answer.trim()) clues.set(f.id, { ...f, category:'Optional finale', finale:true });
    else errors.push('The finale needs a unique ID, clue, and answer.');
  }

  const key = 'montco-bible-game-v1';
  const initial = () => ({ teams: [{ id:'team-1', name:'Team 1', score:0 }, { id:'team-2', name:'Team 2', score:0 }], played: [], history: [], open: null, timer: { length:30, remaining:30, endsAt:null } });
  let state = initial();
  let storageAvailable = true;
  const scoreAmounts = new Map();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && Array.isArray(saved.teams) && Array.isArray(saved.played) && Array.isArray(saved.history)) {
      state = { ...state, ...saved, timer: { ...state.timer, ...(saved.timer || {}) } };
      state.played = state.played.filter(id => clues.has(id));
      if (state.open && !clues.has(state.open.id)) state.open = null;
    }
  } catch (_) { storageAvailable = false; }
  const copy = value => JSON.parse(JSON.stringify(value));
  const save = () => {
    try { localStorage.setItem(key, JSON.stringify(state)); storageAvailable = true; }
    catch (_) { storageAvailable = false; }
    $('save-status').textContent = storageAvailable ? 'Progress saves on this device.' : 'Progress cannot be saved in this browser.';
  };
  const snapshot = () => ({ teams: copy(state.teams), played: [...state.played] });
  const change = fn => { state.history.push(snapshot()); if (state.history.length > 100) state.history.shift(); fn(); save(); render(); };
  function renderTeams() {
    const container = $('teams'); container.replaceChildren();
    state.teams.forEach((team, index) => {
      const card = document.createElement('div'); card.className = 'team';
      const top = document.createElement('div'); top.className = 'team-top';
      const name = document.createElement('input'); name.className = 'team-name'; name.value = team.name; name.maxLength = 35; name.setAttribute('aria-label', `Team ${index + 1} name`);
      name.addEventListener('change', () => { const value = name.value.trim() || `Team ${index + 1}`; if (value !== team.name) change(() => { team.name = value; }); else name.value = value; });
      top.append(name);
      if (state.teams.length > 1) { const remove = document.createElement('button'); remove.className = 'team-remove'; remove.textContent = '×'; remove.setAttribute('aria-label', `Remove ${team.name}`); remove.addEventListener('click', () => change(() => { state.teams = state.teams.filter(t => t.id !== team.id); })); top.append(remove); }
      const row = document.createElement('div'); row.className = 'score-row';
      const score = document.createElement('span'); score.className = 'score'; score.textContent = team.score.toLocaleString(); score.setAttribute('aria-label', `${team.name} score ${team.score}`);
      const amount = document.createElement('input'); amount.type = 'number'; amount.className = 'score-input'; amount.min = '0'; amount.step = '1'; amount.value = scoreAmounts.get(team.id) || '100'; amount.addEventListener('input', () => scoreAmounts.set(team.id, amount.value)); amount.setAttribute('aria-label', `Points to adjust for ${team.name}`);
      const adjust = (symbol, direction) => { const button = document.createElement('button'); button.className = 'adjust'; button.textContent = symbol; button.setAttribute('aria-label', `${direction > 0 ? 'Add' : 'Subtract'} points ${direction > 0 ? 'to' : 'from'} ${team.name}`); button.addEventListener('click', () => { const points = Number(amount.value); if (Number.isFinite(points) && points > 0) change(() => { team.score += direction * points; }); }); return button; };
      row.append(score, adjust('−', -1), amount, adjust('+', 1));
      const help = document.createElement('p'); help.className = 'score-label'; help.textContent = 'Points to add or subtract';
      card.append(top, row, help); container.append(card);
    });
  }
  function renderBoard() {
    const board = $('board'); board.replaceChildren();
    $('empty-state').hidden = categories.some(category => category.clues.length > 0);
    const finale = data.finale && clues.get(data.finale.id);
    $('finale-wrap').hidden = !finale;
    if (finale) { const played = state.played.includes(finale.id); $('finale').disabled = played; $('finale').textContent = played ? 'Finale played ✓' : 'Open optional finale →'; }
    categories.forEach(category => {
      const column = document.createElement('div'); column.className = 'category';
      const heading = document.createElement('h3'); heading.textContent = category.name; column.append(heading);
      category.clues.forEach(clue => {
        const button = document.createElement('button'); button.className = 'clue-tile'; const played = state.played.includes(clue.id);
        button.textContent = played ? 'Played ✓' : clue.value.toLocaleString(); button.disabled = played; button.setAttribute('aria-label', `${category.name}, ${clue.value} points${played ? ', played' : ''}`);
        button.addEventListener('click', () => openClue(clue.id)); column.append(button);
      }); board.append(column);
    });
  }
  function render() { renderTeams(); renderBoard(); $('undo').disabled = !state.history.length; }
  function openClue(id) {
    const clue = clues.get(id); if (!clue) return;
    if (!state.open || state.open.id !== id) { state.open = { id, revealed:false }; state.timer = { length: Number($('timer-length').value), remaining:Number($('timer-length').value), endsAt:null }; }
    $('clue-category').textContent = clue.category; $('clue-value').textContent = clue.finale ? 'PLAY FOR FUN OR PICK YOUR POINTS' : `${clue.value.toLocaleString()} POINTS`; $('clue-heading').textContent = clue.clue;
    $('answer-text').textContent = clue.answer; $('answer-reference').textContent = typeof clue.reference === 'string' ? clue.reference : '';
    $('answer').hidden = !state.open.revealed; $('reveal').hidden = state.open.revealed;
    $('timer-length').value = String(state.timer.length); updateTimer(); save();
    if (!$('clue-dialog').open) $('clue-dialog').showModal();
  }
  function remaining() { return state.timer.endsAt ? Math.max(0, Math.ceil((state.timer.endsAt - Date.now()) / 1000)) : state.timer.remaining; }
  function updateTimer() {
    const left = remaining();
    if (state.timer.endsAt && left <= 0) { state.timer.endsAt = null; state.timer.remaining = 0; $('timer-announcement').textContent = 'Time is up.'; save(); }
    $('timer-display').textContent = `${String(Math.floor(left / 60)).padStart(2,'0')}:${String(left % 60).padStart(2,'0')}`;
    $('timer-toggle').textContent = state.timer.endsAt ? 'Pause' : left === 0 ? 'Start again' : 'Start';
    $('timer-length').disabled = !!state.timer.endsAt;
  }
  function closeClue() { state.open = null; state.timer.endsAt = null; save(); if ($('clue-dialog').open) $('clue-dialog').close(); }
  $('game-title').textContent = typeof data.title === 'string' ? data.title : 'Bible Study Game';
  $('game-subtitle').textContent = typeof data.subtitle === 'string' ? data.subtitle : 'A relaxed game for the whole room.';
  if (errors.length) { $('data-error').hidden = false; $('data-error').textContent = `Please check game-data.js: ${[...new Set(errors)].join(' ')}`; }
  $('finale').addEventListener('click', () => { if (data.finale) openClue(data.finale.id); });
  $('add-team').addEventListener('click', () => change(() => { let n = 1; while (state.teams.some(t => t.id === `team-${n}`)) n++; state.teams.push({ id:`team-${n}`, name:`Team ${n}`, score:0 }); }));
  $('undo').addEventListener('click', () => { const last = state.history.pop(); if (last) { state.teams = last.teams; state.played = last.played.filter(id => clues.has(id)); save(); render(); } });
  $('reset').addEventListener('click', () => $('reset-dialog').showModal());
  $('cancel-reset').addEventListener('click', () => $('reset-dialog').close());
  $('confirm-reset').addEventListener('click', () => { state = initial(); scoreAmounts.clear(); save(); render(); $('reset-dialog').close(); });
  $('close-clue').addEventListener('click', closeClue);
  $('clue-dialog').addEventListener('cancel', event => { event.preventDefault(); closeClue(); });
  $('reveal').addEventListener('click', () => { state.open.revealed = true; $('answer').hidden = false; $('reveal').hidden = true; save(); });
  $('mark-played').addEventListener('click', () => { const id = state.open.id; change(() => { if (!state.played.includes(id)) state.played.push(id); }); closeClue(); });
  $('timer-length').addEventListener('change', () => { const length = Number($('timer-length').value); state.timer = { length, remaining:length, endsAt:null }; $('timer-announcement').textContent = ''; updateTimer(); save(); });
  $('timer-toggle').addEventListener('click', () => { if (state.timer.endsAt) { state.timer.remaining = remaining(); state.timer.endsAt = null; } else { if (!state.timer.remaining) state.timer.remaining = state.timer.length; state.timer.endsAt = Date.now() + state.timer.remaining * 1000; } $('timer-announcement').textContent = ''; updateTimer(); save(); });
  $('timer-reset').addEventListener('click', () => { state.timer.endsAt = null; state.timer.remaining = state.timer.length; $('timer-announcement').textContent = ''; updateTimer(); save(); });
  setInterval(() => { if (state.open && state.timer.endsAt) updateTimer(); }, 250);
  render(); save(); if (state.open) openClue(state.open.id);
})();
