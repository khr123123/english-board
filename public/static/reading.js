// ============================================================
// LinguaFlow - Reading Page JavaScript
// ============================================================

(function() {
  'use strict';

  const LESSON_ID = window.__LESSON_ID__;
  const VOCAB = window.__VOCAB__ || [];
  const vocabMap = {};
  VOCAB.forEach(v => { vocabMap[v.word.toLowerCase()] = v; });

  // ---- Initialize ----
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    highlightVocabulary();
    loadNotes();
    setupEventListeners();
  }

  // ============================================================
  // 1. Vocabulary Highlighting in Article Text
  // ============================================================
  function highlightVocabulary() {
    const paragraphs = document.querySelectorAll('.reading-text');
    paragraphs.forEach(p => {
      let html = p.innerHTML;
      VOCAB.forEach(v => {
        const regex = new RegExp(`\\b(${escapeRegex(v.word)})\\b`, 'gi');
        html = html.replace(regex, `<span class="vocab-highlight" data-word="${v.word.toLowerCase()}">$1</span>`);
      });
      p.innerHTML = html;
    });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ============================================================
  // 2. Tooltip on Hover / Click
  // ============================================================
  const tooltip = document.getElementById('word-tooltip');
  let tooltipTimeout;

  function showTooltip(el, vocab) {
    const rect = el.getBoundingClientRect();
    const tt = tooltip;

    document.getElementById('tt-word').textContent = vocab.word;
    document.getElementById('tt-phonetic').textContent = vocab.phonetic;
    document.getElementById('tt-pos').textContent = vocab.partOfSpeech;
    document.getElementById('tt-def-en').textContent = vocab.definitionEn;
    document.getElementById('tt-def').textContent = vocab.definition;

    tt.classList.remove('hidden');
    tt.style.left = Math.min(rect.left, window.innerWidth - 320) + 'px';
    tt.style.top = (rect.bottom + 8 + window.scrollY) + 'px';
    tt.style.position = 'absolute';

    // Update word detail card on sidebar
    showWordDetailCard(vocab);
  }

  function hideTooltip() {
    tooltip.classList.add('hidden');
  }

  // ============================================================
  // 3. Word Detail Card (Sidebar)
  // ============================================================
  function showWordDetailCard(vocab) {
    const card = document.getElementById('word-detail-card');
    card.classList.remove('hidden');

    document.getElementById('wc-word').textContent = vocab.word;
    document.getElementById('wc-phonetic').textContent = vocab.phonetic;
    document.getElementById('wc-pos').textContent = vocab.partOfSpeech;
    document.getElementById('wc-def-en').textContent = vocab.definitionEn;
    document.getElementById('wc-def').textContent = vocab.definition;

    const examplesEl = document.getElementById('wc-examples');
    examplesEl.innerHTML = vocab.examples.map(ex =>
      `<p class="text-xs text-gray-500 italic pl-3 border-l-2 border-brand-100">"${ex}"</p>`
    ).join('');

    // Store current word for add action
    card.dataset.currentWord = JSON.stringify(vocab);
  }

  // ============================================================
  // 4. Add Word to Wordbook
  // ============================================================
  async function addWordToWordbook(vocab) {
    try {
      const tags = [vocab.partOfSpeech, LESSON_ID].filter(Boolean);
      const resp = await fetch('/api/wordbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: vocab.word,
          phonetic: vocab.phonetic,
          definition: vocab.definition,
          definitionEn: vocab.definitionEn,
          partOfSpeech: vocab.partOfSpeech,
          examples: vocab.examples,
          tags: tags
        })
      });
      const data = await resp.json();
      if (resp.status === 201) {
        showToast('Added to wordbook!', 'success');
      } else {
        showToast('Already in wordbook', 'info');
      }
    } catch (err) {
      showToast('Failed to add word', 'error');
    }
  }

  // ============================================================
  // 5. Notes Management
  // ============================================================
  async function loadNotes() {
    try {
      const resp = await fetch(`/api/notes?lessonId=${LESSON_ID}`);
      const notesList = await resp.json();
      renderNotes(notesList);
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }

  function renderNotes(notesList) {
    const container = document.getElementById('notes-list');
    const countEl = document.getElementById('notes-count');
    const emptyEl = document.getElementById('notes-empty');

    countEl.textContent = `${notesList.length} note${notesList.length !== 1 ? 's' : ''}`;

    if (notesList.length === 0) {
      container.innerHTML = '';
      container.appendChild(emptyEl);
      emptyEl.classList.remove('hidden');
      return;
    }

    if (emptyEl) emptyEl.classList.add('hidden');

    container.innerHTML = notesList.map(note => `
      <div class="group p-3 bg-surface-50 rounded-xl border border-surface-100 hover:border-brand-100 transition-colors">
        ${note.highlightText ? `<p class="text-xs text-brand-500 font-medium mb-1">"${note.highlightText}"</p>` : ''}
        <p class="text-sm text-gray-700 leading-relaxed">${note.content}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-xs text-gray-300">${formatDate(note.createdAt)}</span>
          <button class="delete-note opacity-0 group-hover:opacity-100 text-xs text-gray-300 hover:text-rose-500 transition-all" data-id="${note.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Attach delete handlers
    container.querySelectorAll('.delete-note').forEach(btn => {
      btn.addEventListener('click', async () => {
        await fetch(`/api/notes/${btn.dataset.id}`, { method: 'DELETE' });
        loadNotes();
        showToast('Note deleted', 'info');
      });
    });
  }

  async function saveNote() {
    const input = document.getElementById('note-input');
    const content = input.value.trim();
    if (!content) return;

    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: LESSON_ID,
          content: content
        })
      });
      input.value = '';
      loadNotes();
      showToast('Note saved!', 'success');
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  }

  // ============================================================
  // 6. Translation Toggle
  // ============================================================
  let translationsVisible = false;

  function toggleTranslations() {
    translationsVisible = !translationsVisible;
    document.querySelectorAll('.translation-text').forEach(el => {
      el.classList.toggle('hidden', !translationsVisible);
    });
    const btn = document.getElementById('btn-toggle-translation');
    if (translationsVisible) {
      btn.classList.add('text-brand-600', 'bg-brand-50');
      btn.classList.remove('text-gray-500');
    } else {
      btn.classList.remove('text-brand-600', 'bg-brand-50');
      btn.classList.add('text-gray-500');
    }
  }

  // ============================================================
  // 7. Event Listeners
  // ============================================================
  function setupEventListeners() {
    // Vocab highlight hover & click
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('.vocab-highlight');
      if (el) {
        clearTimeout(tooltipTimeout);
        const word = el.dataset.word;
        const vocab = vocabMap[word];
        if (vocab) showTooltip(el, vocab);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const el = e.target.closest('.vocab-highlight');
      if (el) {
        tooltipTimeout = setTimeout(hideTooltip, 200);
      }
    });

    // Keep tooltip visible when hovering over it
    tooltip.addEventListener('mouseover', () => clearTimeout(tooltipTimeout));
    tooltip.addEventListener('mouseout', () => {
      tooltipTimeout = setTimeout(hideTooltip, 200);
    });

    // Tooltip add button
    document.getElementById('tt-add-btn').addEventListener('click', () => {
      const wordText = document.getElementById('tt-word').textContent.toLowerCase();
      const vocab = vocabMap[wordText];
      if (vocab) addWordToWordbook(vocab);
      hideTooltip();
    });

    // Word detail card add button
    document.getElementById('wc-add-btn').addEventListener('click', () => {
      const card = document.getElementById('word-detail-card');
      try {
        const vocab = JSON.parse(card.dataset.currentWord);
        addWordToWordbook(vocab);
      } catch {}
    });

    // Word detail card close
    document.getElementById('wc-close').addEventListener('click', () => {
      document.getElementById('word-detail-card').classList.add('hidden');
    });

    // Vocab cards add buttons
    document.querySelectorAll('.add-to-wordbook').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.vocab-card');
        const vocab = {
          word: card.dataset.word,
          phonetic: card.dataset.phonetic,
          definition: card.dataset.definition,
          definitionEn: card.dataset.definitionEn,
          partOfSpeech: card.dataset.pos,
          examples: JSON.parse(card.dataset.examples || '[]')
        };
        addWordToWordbook(vocab);
      });
    });

    // Vocab card click -> show detail
    document.querySelectorAll('.vocab-card').forEach(card => {
      card.addEventListener('click', () => {
        const vocab = {
          word: card.dataset.word,
          phonetic: card.dataset.phonetic,
          definition: card.dataset.definition,
          definitionEn: card.dataset.definitionEn,
          partOfSpeech: card.dataset.pos,
          examples: JSON.parse(card.dataset.examples || '[]')
        };
        showWordDetailCard(vocab);
      });
    });

    // Save note
    document.getElementById('save-note-btn').addEventListener('click', saveNote);
    document.getElementById('note-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveNote();
    });

    // Translation toggle
    document.getElementById('btn-toggle-translation').addEventListener('click', toggleTranslations);

    // Hide tooltip on scroll
    document.addEventListener('scroll', hideTooltip, { passive: true });

    // Click outside to hide tooltip
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.vocab-highlight') && !e.target.closest('#word-tooltip')) {
        hideTooltip();
      }
    });
  }

  // ============================================================
  // Utilities
  // ============================================================
  function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');
    const msgEl = document.getElementById('toast-msg');

    msgEl.textContent = msg;
    icon.className = type === 'success' ? 'fas fa-check-circle text-green-400' :
                     type === 'error' ? 'fas fa-exclamation-circle text-rose-400' :
                     'fas fa-info-circle text-blue-400';

    toast.classList.remove('hidden');
    toast.querySelector('div').className = 'px-5 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl flex items-center gap-2 toast-enter';

    setTimeout(() => {
      toast.querySelector('div').classList.remove('toast-enter');
      toast.querySelector('div').classList.add('toast-exit');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
  }

  function formatDate(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
})();
