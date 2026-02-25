// ============================================================
// LinguaFlow - Vocabulary Page JavaScript
// ============================================================

(function() {
  'use strict';

  let allWords = [];
  let currentFilter = { search: '', tag: '', mastered: '' };
  let flashcardWords = [];
  let fcIndex = 0;
  let fcRevealed = false;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    loadWords();
    setupEventListeners();
  }

  // ============================================================
  // 1. Load & Render Words
  // ============================================================
  async function loadWords() {
    try {
      const params = new URLSearchParams();
      if (currentFilter.search) params.set('search', currentFilter.search);
      if (currentFilter.tag) params.set('tag', currentFilter.tag);
      if (currentFilter.mastered !== '') params.set('mastered', currentFilter.mastered);

      const resp = await fetch(`/api/wordbook?${params.toString()}`);
      const data = await resp.json();
      allWords = data.words;

      // Update stats
      document.getElementById('stat-total').textContent = data.totalCount;
      document.getElementById('stat-mastered').textContent = data.masteredCount;
      document.getElementById('stat-learning').textContent = data.totalCount - data.masteredCount;

      renderWordList(allWords);
    } catch (err) {
      console.error('Failed to load words:', err);
    }
  }

  function renderWordList(words) {
    const container = document.getElementById('word-list');

    if (words.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 bg-white rounded-2xl border border-surface-200">
          <i class="fas fa-book-open text-4xl text-gray-200 mb-3 block"></i>
          <p class="text-gray-400 text-sm mb-1">No words found</p>
          <p class="text-gray-300 text-xs">Start reading lessons to build your vocabulary!</p>
          <a href="/" class="inline-block mt-4 px-5 py-2 bg-brand-600 text-white text-sm rounded-xl hover:bg-brand-700 transition-colors">
            Browse Lessons
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = words.map(word => {
      const masteryClass = word.mastered ? 'mastery-badge-mastered' : 'mastery-badge-learning';
      const masteryText = word.mastered ? 'Mastered' : 'Learning';
      const masteryIcon = word.mastered ? 'fa-check' : 'fa-hourglass-half';
      
      return `
        <div class="word-card-item bg-white rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-md hover:shadow-brand-50 transition-all cursor-pointer p-5" data-id="${word.id}">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="text-brand-600 text-lg font-bold">${word.word[0].toUpperCase()}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-base font-semibold text-gray-900">${word.word}</h3>
                <span class="text-xs text-gray-400">${word.phonetic}</span>
                <span class="text-xs text-brand-500 bg-brand-50 px-2 py-0.5 rounded-md font-medium">${word.partOfSpeech}</span>
                <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${masteryClass}">
                  <i class="fas ${masteryIcon} mr-1" style="font-size:9px"></i>${masteryText}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-0.5">${word.definitionEn}</p>
              <p class="text-xs text-gray-400 mb-2">${word.definition}</p>
              <div class="flex items-center gap-1.5 flex-wrap">
                ${word.tags.map(t => `<span class="text-xs text-gray-400 bg-surface-50 px-2 py-0.5 rounded-md border border-surface-100">${t}</span>`).join('')}
              </div>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
              <span class="text-xs text-gray-300">${word.reviewCount}x</span>
              <i class="fas fa-chevron-right text-gray-200 text-xs ml-2"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Click handler for cards
    container.querySelectorAll('.word-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const word = allWords.find(w => w.id === card.dataset.id);
        if (word) openWordModal(word);
      });
    });
  }

  // ============================================================
  // 2. Word Detail Modal
  // ============================================================
  function openWordModal(word) {
    const modal = document.getElementById('word-modal');
    modal.classList.remove('hidden');
    modal.classList.add('modal-visible');

    document.getElementById('modal-word').textContent = word.word;
    document.getElementById('modal-phonetic').textContent = word.phonetic;
    document.getElementById('modal-pos').textContent = word.partOfSpeech;
    document.getElementById('modal-def-en').textContent = word.definitionEn;
    document.getElementById('modal-def').textContent = word.definition;

    // Examples
    document.getElementById('modal-examples').innerHTML = word.examples.map(ex =>
      `<p class="text-sm text-gray-600 italic pl-3 border-l-2 border-brand-100 py-1">"${ex}"</p>`
    ).join('');

    // Tags
    document.getElementById('modal-tags').innerHTML = word.tags.map(t =>
      `<span class="text-xs bg-surface-50 text-gray-500 px-2.5 py-1 rounded-lg border border-surface-100">${t}</span>`
    ).join('');

    // Mastery toggle button
    const toggleBtn = document.getElementById('modal-toggle-mastery');
    if (word.mastered) {
      toggleBtn.className = 'flex-1 py-2.5 text-sm font-medium rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors';
      toggleBtn.innerHTML = '<i class="fas fa-undo mr-1"></i>Mark as Learning';
    } else {
      toggleBtn.className = 'flex-1 py-2.5 text-sm font-medium rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors';
      toggleBtn.innerHTML = '<i class="fas fa-check mr-1"></i>Mark as Mastered';
    }

    toggleBtn.onclick = async () => {
      await fetch(`/api/wordbook/${word.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mastered: !word.mastered })
      });
      closeModal();
      loadWords();
      showToast(word.mastered ? 'Moved to Learning' : 'Marked as Mastered!');
    };

    // Delete button
    document.getElementById('modal-delete').onclick = async () => {
      if (confirm(`Remove "${word.word}" from your wordbook?`)) {
        await fetch(`/api/wordbook/${word.id}`, { method: 'DELETE' });
        closeModal();
        loadWords();
        showToast('Word removed', 'info');
      }
    };
  }

  function closeModal() {
    document.getElementById('word-modal').classList.add('hidden');
    document.getElementById('word-modal').classList.remove('modal-visible');
  }

  // ============================================================
  // 3. Flashcard Review
  // ============================================================
  function startFlashcards() {
    // Get unmastered words for review (or all if all mastered)
    flashcardWords = allWords.filter(w => !w.mastered);
    if (flashcardWords.length === 0) flashcardWords = [...allWords];
    if (flashcardWords.length === 0) {
      showToast('No words to review! Add some words first.', 'info');
      return;
    }

    // Shuffle
    flashcardWords.sort(() => Math.random() - 0.5);
    fcIndex = 0;
    fcRevealed = false;

    const modal = document.getElementById('flashcard-modal');
    modal.classList.remove('hidden');
    modal.classList.add('modal-visible');

    document.getElementById('fc-complete').classList.add('hidden');
    document.getElementById('fc-card').classList.remove('hidden');
    document.getElementById('fc-actions').style.display = 'none';

    showFlashcard();
  }

  function showFlashcard() {
    if (fcIndex >= flashcardWords.length) {
      // Complete
      document.getElementById('fc-card').classList.add('hidden');
      document.getElementById('fc-actions').style.display = 'none';
      document.getElementById('fc-complete').classList.remove('hidden');
      document.getElementById('fc-progress-bar').style.width = '100%';
      document.getElementById('fc-progress-text').textContent = `${flashcardWords.length}/${flashcardWords.length}`;
      return;
    }

    const word = flashcardWords[fcIndex];
    fcRevealed = false;

    // Progress
    document.getElementById('fc-progress-bar').style.width = `${(fcIndex / flashcardWords.length) * 100}%`;
    document.getElementById('fc-progress-text').textContent = `${fcIndex + 1}/${flashcardWords.length}`;

    // Front
    document.getElementById('fc-front').classList.remove('hidden');
    document.getElementById('fc-back').classList.add('hidden');
    document.getElementById('fc-actions').style.display = 'none';

    document.getElementById('fc-word').textContent = word.word;
    document.getElementById('fc-phonetic-card').textContent = word.phonetic;
    document.getElementById('fc-pos-card').textContent = word.partOfSpeech;

    // Back
    document.getElementById('fc-word-back').textContent = word.word;
    document.getElementById('fc-def-en-back').textContent = word.definitionEn;
    document.getElementById('fc-def-back').textContent = word.definition;
    document.getElementById('fc-example-back').textContent = word.examples[0] ? `"${word.examples[0]}"` : '';

    document.getElementById('fc-card').classList.add('flashcard-flip');
    setTimeout(() => document.getElementById('fc-card').classList.remove('flashcard-flip'), 300);
  }

  function revealFlashcard() {
    if (fcRevealed) return;
    fcRevealed = true;

    document.getElementById('fc-front').classList.add('hidden');
    document.getElementById('fc-back').classList.remove('hidden');
    document.getElementById('fc-actions').style.display = 'flex';

    document.getElementById('fc-card').classList.add('flashcard-flip');
    setTimeout(() => document.getElementById('fc-card').classList.remove('flashcard-flip'), 300);
  }

  async function flashcardAnswer(gotIt) {
    const word = flashcardWords[fcIndex];
    
    // Update review count and mastery
    await fetch(`/api/wordbook/${word.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewCount: word.reviewCount + 1,
        mastered: gotIt ? true : word.mastered
      })
    });

    fcIndex++;
    showFlashcard();
  }

  // ============================================================
  // 4. Event Listeners
  // ============================================================
  function setupEventListeners() {
    // Search
    let searchTimeout;
    document.getElementById('search-input').addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilter.search = e.target.value;
        loadWords();
      }, 300);
    });

    // Tag filters
    document.querySelectorAll('.tag-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tag-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter.tag = btn.dataset.tag;
        loadWords();
      });
    });

    // Mastery filter
    document.getElementById('mastery-filter').addEventListener('change', (e) => {
      currentFilter.mastered = e.target.value;
      loadWords();
    });

    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', closeModal);

    // Flashcard
    document.getElementById('start-flashcard-btn').addEventListener('click', startFlashcards);
    document.getElementById('fc-close').addEventListener('click', () => {
      document.getElementById('flashcard-modal').classList.add('hidden');
      document.getElementById('flashcard-modal').classList.remove('modal-visible');
      loadWords(); // Refresh list after review
    });
    document.getElementById('fc-card').addEventListener('click', revealFlashcard);
    document.getElementById('fc-got-it').addEventListener('click', () => flashcardAnswer(true));
    document.getElementById('fc-forgot').addEventListener('click', () => flashcardAnswer(false));
    document.getElementById('fc-restart').addEventListener('click', startFlashcards);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Flashcard shortcuts
      const fcModal = document.getElementById('flashcard-modal');
      if (!fcModal.classList.contains('hidden')) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (!fcRevealed) revealFlashcard();
        }
        if (e.key === 'ArrowLeft' && fcRevealed) { e.preventDefault(); flashcardAnswer(false); }
        if (e.key === 'ArrowRight' && fcRevealed) { e.preventDefault(); flashcardAnswer(true); }
        if (e.key === 'Escape') { 
          fcModal.classList.add('hidden'); 
          fcModal.classList.remove('modal-visible');
          loadWords();
        }
      }

      // Modal escape
      const wordModal = document.getElementById('word-modal');
      if (!wordModal.classList.contains('hidden') && e.key === 'Escape') {
        closeModal();
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
})();
