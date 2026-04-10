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

function getLocalYYYYMMDD(d = new Date()) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
let selectedDate = getLocalYYYYMMDD();

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
    return getLocalYYYYMMDD(dateObj);
}

function updateDateHeaders() {
    elements.datePicker.value = selectedDate;

    if (selectedDate === getLocalYYYYMMDD()) {
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

async function syncToGitHub() {
    if (!config.token || !config.owner || !config.repo) {
        updateStatus('GitHub settings needed', true);
        return;
    }

    updateStatus('syncing');
    const dateStr = getFormattedDate();
    const path = `${dateStr}.json`;
    const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;

    // Encode payload properly for utf-8 base64
    const contentStr = JSON.stringify(currentTodos, null, 2);
    const contentBase64 = utoa(contentStr);

    const body = {
        message: `Sync todos for ${dateStr}`,
        content: contentBase64,
        branch: config.branch
    };

    if (todaysFileSha) body.sha = todaysFileSha;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || response.statusText);
        }

        const data = await response.json();
        todaysFileSha = data.content.sha;
        updateStatus('Up to date');
    } catch (error) {
        console.error('Push error:', error);
        updateStatus('Save failed: ' + error.message, true);
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

    li.innerHTML = `
        <label class="checkbox-wrapper">
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="checkmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
        </label>
        <div class="todo-text">${escapeHtml(todo.text)}</div>
        <button class="icon-btn delete-btn" aria-label="Delete todo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
    `;

    // Event listeners
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id, e.target.checked);
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.id);
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

// Actions
function addTodo(text) {
    const todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
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
    currentTodos = currentTodos.filter(t => t.id !== id);
    renderTodos();
    debouncedSync();
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

function handleDateChange(newDate) {
    if (newDate === selectedDate) return;
    selectedDate = newDate;
    updateDateHeaders();

    if (lastSyncTimeout) clearTimeout(lastSyncTimeout);
    currentTodos = [];
    todaysFileSha = null;
    renderTodos();
    elements.statusText.textContent = 'Loading...';
    fetchTodos();
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

    initSettings();

    // Setup forms
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
        fetchTodos();
    }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
