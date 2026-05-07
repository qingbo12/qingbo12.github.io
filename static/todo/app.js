// GitHub API configuration and state
const STORAGE_KEY = 'todo_github_settings';
let config = {
    token: '',
    owner: '',
    repo: '',
    branch: 'main'
};

let currentTodos = [];
let todaysFileSha = null;
let lastSyncTimeout = null;
let draggedItem = null;

let isSyncingTodos = false;
let pendingTodoSync = false;

let recurringRules = [];
let recurringRulesSha = null;
const RECURRING_FILE_PATH = 'recurring_rules.json';
let isSyncingRules = false;
let pendingRuleSync = false;

function getBeijingYYYYMMDD(d = new Date()) {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(d);
}

function getBeijingISOString(d = new Date()) {
    const formatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    return formatter.format(d).replace(' ', 'T') + '+08:00';
}

let selectedDate = getBeijingYYYYMMDD();

// DOM Elements
const elements = {
    dateTitle: document.getElementById('current-date-title'),
    dateSubtitle: document.getElementById('current-date-subtitle'),
    datePicker: document.getElementById('date-picker'),
    prevDayBtn: document.getElementById('prev-day-btn'),
    nextDayBtn: document.getElementById('next-day-btn'),
    syncStatus: document.getElementById('sync-status'),
    statusText: document.querySelector('.status-text'),
    addForm: document.getElementById('add-todo-form'),
    todoInput: document.getElementById('todo-input'),
    activeList: document.getElementById('active-todos'),
    completedList: document.getElementById('completed-todos'),
    completedSection: document.getElementById('completed-section'),
    settingsBtn: document.getElementById('settings-btn'),
    modal: document.getElementById('settings-modal'),
    closeModal: document.getElementById('close-modal'),
    saveSettingsBtn: document.getElementById('save-settings-btn'),
    inputs: {
        token: document.getElementById('gh-token'),
        owner: document.getElementById('gh-owner'),
        repo: document.getElementById('gh-repo'),
        branch: document.getElementById('gh-branch')
    }
};

// Utilities
function getFormattedDate() {
    return selectedDate;
}

function getNextDay(dateString, offset) {
    const [y, m, d] = dateString.split('-');
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + offset);
    return getBeijingYYYYMMDD(dateObj);
}

function updateDateHeaders() {
    elements.datePicker.value = selectedDate;

    if (selectedDate === getBeijingYYYYMMDD()) {
        elements.dateTitle.textContent = 'Today';
    } else {
        elements.dateTitle.textContent = selectedDate;
    }

    const [y, m, d] = selectedDate.split('-');
    const dateObj = new Date(y, m - 1, d);
    elements.dateSubtitle.textContent = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateStatus(status, isError = false) {
    elements.syncStatus.className = 'sync-status';
    if (status === 'syncing') elements.syncStatus.classList.add('syncing');
    if (isError) elements.syncStatus.classList.add('error');

    let text = 'Up to date';
    if (status === 'syncing') text = 'Syncing to GitHub...';
    if (status === 'offline') text = 'Offline settings empty';
    if (isError) text = status;

    elements.statusText.textContent = text;
}

// UTF-8 supportive Base64 encode/decode
function utoa(data) {
    return btoa(unescape(encodeURIComponent(data)));
}
function atou(b64) {
    return decodeURIComponent(escape(atob(b64)));
}

// GitHub Sync Logic
async function fetchTodos() {
    if (!config.token || !config.owner || !config.repo) {
        updateStatus('offline', true);
        return;
    }

    updateStatus('syncing');
    const dateStr = getFormattedDate();
    const path = `${dateStr}.json`;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (dateStr !== selectedDate) return;

        if (response.status === 404) {
            // File doesn't exist yet, which is fine
            currentTodos = [];
            todaysFileSha = null;
            updateStatus('Up to date');
            renderTodos();
            return;
        }

        if (!response.ok) throw new Error('API Error: ' + response.statusText);

        const data = await response.json();
        todaysFileSha = data.sha;

        // Decode base64 content
        const contentStr = atou(data.content);
        currentTodos = JSON.parse(contentStr);
        updateStatus('Up to date');
        renderTodos();
    } catch (error) {
        console.error('Fetch error:', error);
        updateStatus('Sync failed: ' + error.message, true);
    }
}

async function syncToGitHub(retries = 3) {
    if (!config.token || !config.owner || !config.repo) {
        updateStatus('GitHub settings needed', true);
        return;
    }

    if (isSyncingTodos) {
        pendingTodoSync = true;
        return;
    }
    isSyncingTodos = true;
    pendingTodoSync = false;

    updateStatus('syncing');
    const dateStr = getFormattedDate();
    const path = `${dateStr}.json`;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;

    try {
        for (let i = 0; i < retries; i++) {
            const body = {
                message: `Sync todos for ${dateStr}`,
                content: utoa(JSON.stringify(currentTodos, null, 2)),
                branch: config.branch
            };
            if (todaysFileSha) body.sha = todaysFileSha;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${config.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (dateStr !== selectedDate) break;

            if (response.ok) {
                const data = await response.json();
                if (dateStr === selectedDate) {
                    todaysFileSha = data.content.sha;
                    updateStatus('Up to date');
                }
                break;
            } else if (response.status === 409) {
                console.warn('409 Conflict detected for today. Recovering SHA...');
                const recovery = await fetch(url + `?ref=${config.branch}`, {
                    headers: { 'Authorization': `Bearer ${config.token}`, 'Accept': 'application/vnd.github.v3+json' }
                });
                if (recovery.ok) {
                    const recData = await recovery.json();
                    todaysFileSha = recData.sha;
                    continue; // Retry push with new SHA
                } else {
                    throw new Error(`Recovery failed: ${recovery.status}`);
                }
            } else {
                const errData = await response.json();
                throw new Error(errData.message || response.statusText);
            }
        }
    } catch (error) {
        console.error('Push error:', error);
        updateStatus('Save failed: ' + error.message, true);
    } finally {
        isSyncingTodos = false;
        if (pendingTodoSync) {
            debouncedSync(); 
        }
    }
}

async function appendTodoToDate(todo, targetDateStr, retries = 3) {
    if (!config.token || !config.owner || !config.repo) return;
    updateStatus(`Moving task...`);
    
    const path = `${targetDateStr}.json`;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
    
    for (let i = 0; i < retries; i++) {
        try {
            let targetTodos = [];
            let targetSha = null;
            const getRes = await fetch(url + `?ref=${config.branch}`, {
                headers: { 'Authorization': `Bearer ${config.token}`, 'Accept': 'application/vnd.github.v3+json' }
            });
            
            if (getRes.ok) {
                const data = await getRes.json();
                targetSha = data.sha;
                targetTodos = JSON.parse(atou(data.content));
            } else if (getRes.status !== 404) {
                throw new Error(`Fetch failed: ${getRes.status}`);
            }
            
            targetTodos.unshift(todo);
            
            const body = {
                message: `Move task to ${targetDateStr}`,
                content: utoa(JSON.stringify(targetTodos, null, 2)),
                branch: config.branch
            };
            if (targetSha) body.sha = targetSha;
            
            const putRes = await fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${config.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            if (putRes.ok) {
                updateStatus('Moved successfully');
                return;
            } else if (putRes.status === 409) {
                console.warn('409 Conflict when moving. Retrying...');
                continue;
            } else {
                throw new Error(`Push failed: ${putRes.status}`);
            }
        } catch (e) {
            console.error('Move error:', e);
            if (i === retries - 1) {
                updateStatus('Move failed: ' + e.message, true);
                currentTodos.unshift(todo);
                renderTodos();
                debouncedSync();
                return;
            }
        }
    }
}

async function fetchRecurringRules() {
    if (!config.token || !config.owner || !config.repo) return;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${RECURRING_FILE_PATH}?ref=${config.branch}`;
    try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${config.token}`, 'Accept': 'application/vnd.github.v3+json' } });
        if (response.status === 404) {
            recurringRules = [];
            recurringRulesSha = null;
            return;
        }
        if (!response.ok) throw new Error('API Error: ' + response.statusText);
        const data = await response.json();
        recurringRulesSha = data.sha;
        recurringRules = JSON.parse(atou(data.content));
    } catch (e) {
        console.error('Fetch recurring error:', e);
    }
}

async function syncRecurringRulesToGitHub(retries = 3) {
    if (!config.token || !config.owner || !config.repo) return;

    if (isSyncingRules) {
        pendingRuleSync = true;
        return;
    }
    isSyncingRules = true;
    pendingRuleSync = false;

    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${RECURRING_FILE_PATH}`;
    
    try {
        for (let i = 0; i < retries; i++) {
            const body = {
                message: 'Update recurring rules',
                content: utoa(JSON.stringify(recurringRules, null, 2)),
                branch: config.branch
            };
            if (recurringRulesSha) body.sha = recurringRulesSha;

            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${config.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            if (response.ok) {
                const data = await response.json();
                recurringRulesSha = data.content.sha;
                break;
            } else if (response.status === 409) {
                console.warn('409 Conflict in rules. Recovering SHA...');
                const recovery = await fetch(url + `?ref=${config.branch}`, {
                    headers: { 'Authorization': `Bearer ${config.token}`, 'Accept': 'application/vnd.github.v3+json' }
                });
                if (recovery.ok) {
                    const recData = await recovery.json();
                    recurringRulesSha = recData.sha;
                    continue; // Retry
                } else {
                    throw new Error(`Recovery failed`);
                }
            } else {
                throw new Error(response.statusText);
            }
        }
    } catch(e) {
        console.error('Push recurring error:', e);
    } finally {
        isSyncingRules = false;
        if (pendingRuleSync) {
            syncRecurringRulesToGitHub();
        }
    }
}

function injectRecurringTodos() {
    if (!recurringRules || recurringRules.length === 0) return;

    const [sy, sm, sd] = selectedDate.split('-');
    const current = new Date(sy, sm - 1, sd);
    let injectedAny = false;

    recurringRules.forEach(rule => {
        const [ry, rm, rd] = rule.startDate.split('-');
        const start = new Date(ry, rm - 1, rd);

        if (current < start) return;

        let applies = false;
        if (rule.type === 'daily') applies = true;
        if (rule.type === 'weekly' && current.getDay() === start.getDay()) applies = true;
        if (rule.type === 'monthly' && current.getDate() === start.getDate()) applies = true;
        if (rule.type === 'custom') {
            const diffMs = current.getTime() - start.getTime();
            const diffDays = Math.round(diffMs / 86400000);
            if (diffDays >= 0 && diffDays < rule.interval) applies = true;
        }

        if (applies) {
            const exists = currentTodos.find(t => t.recurringRuleId === rule.id);
            if (!exists) {
                currentTodos.push({
                    id: generateId(),
                    recurringRuleId: rule.id,
                    text: rule.text,
                    completed: false,
                    createdAt: getBeijingISOString()
                });
                injectedAny = true;
            }
        }
    });

    if (injectedAny) {
        renderTodos();
        debouncedSync();
    }
}

function debouncedSync() {
    if (lastSyncTimeout) clearTimeout(lastSyncTimeout);
    updateStatus('syncing');
    lastSyncTimeout = setTimeout(() => {
        syncToGitHub();
    }, 2000); // 2 second debounce
}


// UI Logic
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    if (!todo.completed) li.draggable = true;

    const recurrenceIcon = todo.recurringRuleId ? `<span title="Recurring Task" style="color:var(--primary);margin-left:auto;margin-right:0.5rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></span>` : '';

    li.innerHTML = `
        ${!todo.completed ? '<div class="drag-handle" title="Drag to reorder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></div>' : ''}
        <label class="checkbox-wrapper">
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
        </label>
        <div class="todo-text" title="Double click to edit">${escapeHtml(todo.text)}</div>
        ${recurrenceIcon}
        ${!todo.completed ? `
        <button class="icon-btn move-btn" aria-label="Move to tomorrow" title="Move to tomorrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
        </button>
        ` : ''}
        <button class="icon-btn delete-btn" aria-label="Delete todo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
    `;

    if (!todo.completed) {
        li.addEventListener('dragstart', function () {
            draggedItem = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });

        li.addEventListener('dragend', function () {
            this.classList.remove('dragging');
            draggedItem = null;
        });
    }

    // Event listeners
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id, e.target.checked);
    });

    const moveBtn = li.querySelector('.move-btn');
    if (moveBtn) {
        moveBtn.addEventListener('click', () => {
            moveTodoToTomorrow(todo.id);
        });
    }

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.id);
    });

    const textElement = li.querySelector('.todo-text');
    textElement.addEventListener('dblclick', () => {
        if (todo.completed) return;
        textElement.contentEditable = true;
        textElement.focus();
        
        // Move cursor to end
        try {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(textElement);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        } catch (e) {}
    });

    textElement.addEventListener('blur', () => {
        textElement.contentEditable = false;
        const newText = textElement.textContent.trim();
        if (newText !== todo.text) {
            if (newText) {
                todo.text = newText;
                debouncedSync();
            } else {
                textElement.textContent = todo.text; // Revert if empty
            }
        }
    });

    textElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textElement.blur();
        } else if (e.key === 'Escape') {
            textElement.textContent = todo.text;
            textElement.blur();
        }
    });

    return li;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderTodos() {
    elements.activeList.innerHTML = '';
    elements.completedList.innerHTML = '';

    let hasCompleted = false;

    currentTodos.forEach(todo => {
        const el = createTodoElement(todo);
        if (todo.completed) {
            elements.completedList.appendChild(el);
            hasCompleted = true;
        } else {
            elements.activeList.appendChild(el);
        }
    });

    elements.completedSection.style.display = hasCompleted ? 'block' : 'none';

    if (currentTodos.length === 0) {
        elements.activeList.innerHTML = `<li class="todo-item" style="justify-content:center; color: var(--text-muted); border-style: dashed;">No todos yet. Add one above!</li>`;
    }
}

// Reordering Logic
function reorderCurrentTodos() {
    const activeIds = [...elements.activeList.querySelectorAll('.todo-item')].map(li => li.dataset.id);
    const completedTodos = currentTodos.filter(t => t.completed);
    const newActiveTodos = activeIds.map(id => currentTodos.find(t => t.id === id)).filter(Boolean);

    currentTodos = [...newActiveTodos, ...completedTodos];
    debouncedSync();
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Actions
function addTodo(text) {
    const panel = document.getElementById('recurrence-panel');
    const isPanelActive = panel && panel.classList.contains('active');
    const recurrenceNode = document.getElementById('todo-recurrence');

    // Default to none if panel is closed
    const recurrenceType = (isPanelActive && recurrenceNode) ? recurrenceNode.value : 'none';
    const isRecurring = recurrenceType !== 'none';

    const todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: getBeijingISOString()
    };

    if (isRecurring) {
        todo.recurringRuleId = generateId();
        const rule = {
            id: todo.recurringRuleId,
            text: todo.text,
            type: recurrenceType,
            startDate: getBeijingYYYYMMDD()
        };
        if (recurrenceType === 'custom') {
            const customIntervalNode = document.getElementById('custom-interval');
            rule.interval = parseInt(customIntervalNode.value, 10) || 2;
        }
        recurringRules.push(rule);
        syncRecurringRulesToGitHub();
    }

    // Always reset UI state after adding ANY task
    if (recurrenceNode) recurrenceNode.value = 'none';
    const wrapper = document.getElementById('custom-interval-wrapper');
    if (wrapper) wrapper.style.display = 'none';
    if (panel) panel.classList.remove('active');

    const btn = document.getElementById('toggle-recurrence-btn');
    if (btn) {
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.borderColor = 'var(--border)';
    }

    currentTodos.unshift(todo);
    renderTodos();
    debouncedSync();
}

function toggleTodo(id, completed) {
    const todo = currentTodos.find(t => t.id === id);
    if (todo) {
        todo.completed = completed;
        renderTodos();
        debouncedSync();
    }
}

function deleteTodo(id) {
    const todo = currentTodos.find(t => t.id === id);
    if (!todo) return;

    if (todo.recurringRuleId) {
        const delFuture = confirm("这是一个重复任务。\n\n[确定] 删除此规则，未来不再循环。\n[取消] 仅作废本日的任务。");
        if (delFuture) {
            recurringRules = recurringRules.filter(r => r.id !== todo.recurringRuleId);
            syncRecurringRulesToGitHub();
        }
    }

    currentTodos = currentTodos.filter(t => t.id !== id);
    renderTodos();
    debouncedSync();
}

function moveTodoToTomorrow(id) {
    const todoIndex = currentTodos.findIndex(t => t.id === id);
    if (todoIndex === -1) return;
    
    const todo = currentTodos[todoIndex];
    currentTodos.splice(todoIndex, 1);
    
    renderTodos();
    debouncedSync(); // Saves today
    
    const tomorrowStr = getNextDay(selectedDate, 1);
    appendTodoToDate(todo, tomorrowStr);
}


// Initialization and Event Setup
function initSettings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            config = { ...config, ...parsed };
            elements.inputs.token.value = config.token || '';
            elements.inputs.owner.value = config.owner || '';
            elements.inputs.repo.value = config.repo || '';
            elements.inputs.branch.value = config.branch || 'main';
        } catch (e) { }
    }
}

function saveSettings() {
    config = {
        token: elements.inputs.token.value.trim(),
        owner: elements.inputs.owner.value.trim(),
        repo: elements.inputs.repo.value.trim(),
        branch: elements.inputs.branch.value.trim() || 'main'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    closeModal();
    // Re-fetch on settings change
    fetchTodos();
}

function openModal() {
    elements.modal.classList.add('active');
}

function closeModal() {
    elements.modal.classList.remove('active');
}

async function handleDateChange(newDate) {
    if (newDate === selectedDate) return;
    selectedDate = newDate;
    updateDateHeaders();

    if (lastSyncTimeout) clearTimeout(lastSyncTimeout);
    currentTodos = [];
    todaysFileSha = null;
    renderTodos();
    elements.statusText.textContent = 'Loading...';
    await fetchTodos();
    injectRecurringTodos();
}

async function loadAppData() {
    updateStatus('syncing');
    elements.statusText.textContent = 'Loading Rules...';
    await fetchRecurringRules();
    await fetchTodos();
    injectRecurringTodos();
}

function init() {
    // Set Header Date
    updateDateHeaders();

    // Setup Navigation
    elements.prevDayBtn.addEventListener('click', () => {
        handleDateChange(getNextDay(selectedDate, -1));
    });

    elements.nextDayBtn.addEventListener('click', () => {
        handleDateChange(getNextDay(selectedDate, 1));
    });

    // Setup Date Picker
    elements.datePicker.addEventListener('change', (e) => {
        if (!e.target.value) {
            e.target.value = selectedDate; // reject clearing
            return;
        }
        handleDateChange(e.target.value);
    });

    // Setup Drag and Drop Containers
    elements.activeList.addEventListener('dragover', e => {
        e.preventDefault();
        if (!draggedItem) return;
        const afterElement = getDragAfterElement(elements.activeList, e.clientY);
        if (afterElement == null) {
            elements.activeList.appendChild(draggedItem);
        } else {
            elements.activeList.insertBefore(draggedItem, afterElement);
        }
    });

    elements.activeList.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedItem) reorderCurrentTodos();
    });

    initSettings();

    // Setup forms and UI toggles
    const toggleRecurrenceBtn = document.getElementById('toggle-recurrence-btn');
    const recurrencePanel = document.getElementById('recurrence-panel');
    const recurrenceSelect = document.getElementById('todo-recurrence');
    const customIntervalWrapper = document.getElementById('custom-interval-wrapper');

    if (toggleRecurrenceBtn) {
        toggleRecurrenceBtn.addEventListener('click', () => {
            recurrencePanel.classList.toggle('active');
            if (recurrencePanel.classList.contains('active')) {
                toggleRecurrenceBtn.style.backgroundColor = 'var(--bg-page)';
                toggleRecurrenceBtn.style.color = 'var(--primary)';
                toggleRecurrenceBtn.style.borderColor = 'var(--primary)';
            } else {
                toggleRecurrenceBtn.style.backgroundColor = '';
                toggleRecurrenceBtn.style.color = '';
                toggleRecurrenceBtn.style.borderColor = 'var(--border)';
            }
        });
    }

    if (recurrenceSelect) {
        recurrenceSelect.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customIntervalWrapper.style.display = 'flex';
            } else {
                customIntervalWrapper.style.display = 'none';
            }
        });
    }

    elements.addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = elements.todoInput.value;
        if (text.trim()) {
            addTodo(text);
            elements.todoInput.value = '';
        }
    });

    // Setup Modal
    elements.settingsBtn.addEventListener('click', openModal);
    elements.closeModal.addEventListener('click', closeModal);
    elements.saveSettingsBtn.addEventListener('click', saveSettings);

    // Close modal on outside click
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });

    // Start
    if (!config.token || !config.repo) {
        openModal();
    } else {
        loadAppData();
    }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
