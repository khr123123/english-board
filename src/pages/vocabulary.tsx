import type { Context } from 'hono'

export const vocabularyPage = (c: Context) => {
  return c.render(
    <div class="min-h-screen bg-surface-50">
      {/* Navigation */}
      <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-200">
              <i class="fas fa-book-open text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">LinguaFlow</span>
          </a>
          <div class="flex items-center gap-2">
            <a href="/" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
              <i class="fas fa-home mr-1.5"></i>Home
            </a>
            <a href="/vocabulary" class="px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg">
              <i class="fas fa-book mr-1.5"></i>Vocabulary
            </a>
          </div>
        </div>
      </nav>

      <div class="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">My Vocabulary</h1>
            <p class="text-sm text-gray-400 mt-1">Manage and review your collected words</p>
          </div>
          <button id="start-flashcard-btn" class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-md shadow-brand-200">
            <i class="fas fa-brain"></i>
            Flashcard Review
          </button>
        </div>

        {/* Stats Cards */}
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-2xl border border-surface-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-layer-group text-brand-500"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900" id="stat-total">0</p>
                <p class="text-xs text-gray-400">Total Words</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-surface-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-check-circle text-green-500"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-green-600" id="stat-mastered">0</p>
                <p class="text-xs text-gray-400">Mastered</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl border border-surface-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-hourglass-half text-amber-500"></i>
              </div>
              <div>
                <p class="text-2xl font-bold text-amber-600" id="stat-learning">0</p>
                <p class="text-xs text-gray-400">Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div class="bg-white rounded-2xl border border-surface-200 p-5 mb-6">
          <div class="flex items-center gap-3 flex-wrap">
            <div class="flex-1 min-w-[240px] relative">
              <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
              <input id="search-input" type="text" placeholder="Search words, definitions..." class="w-full h-10 pl-10 pr-4 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all" />
            </div>
            <div class="flex items-center gap-2" id="filter-tags">
              <button class="tag-filter active px-3 py-2 text-xs font-medium rounded-lg bg-brand-600 text-white" data-tag="">All</button>
              <button class="tag-filter px-3 py-2 text-xs font-medium rounded-lg bg-white text-gray-500 border border-surface-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors" data-tag="noun">Noun</button>
              <button class="tag-filter px-3 py-2 text-xs font-medium rounded-lg bg-white text-gray-500 border border-surface-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors" data-tag="verb">Verb</button>
              <button class="tag-filter px-3 py-2 text-xs font-medium rounded-lg bg-white text-gray-500 border border-surface-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors" data-tag="adjective">Adjective</button>
              <button class="tag-filter px-3 py-2 text-xs font-medium rounded-lg bg-white text-gray-500 border border-surface-200 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors" data-tag="adverb">Adverb</button>
            </div>
            <select id="mastery-filter" class="h-10 px-3 text-xs font-medium bg-white border border-surface-200 rounded-xl focus:outline-none focus:border-brand-300 text-gray-600">
              <option value="">All Status</option>
              <option value="false">Learning</option>
              <option value="true">Mastered</option>
            </select>
          </div>
        </div>

        {/* Word List */}
        <div id="word-list" class="space-y-3">
          <div class="text-center py-16 text-gray-300">
            <i class="fas fa-spinner fa-spin text-3xl mb-3 block"></i>
            <p class="text-sm">Loading vocabulary...</p>
          </div>
        </div>
      </div>

      {/* Word Detail Modal */}
      <div id="word-modal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" id="modal-overlay"></div>
        <div class="absolute inset-0 flex items-center justify-center p-6">
          <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" id="modal-content">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900" id="modal-word"></h2>
                  <p class="text-sm text-gray-400 mt-0.5" id="modal-phonetic"></p>
                </div>
                <button id="modal-close" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 text-gray-400 hover:text-gray-600 transition-colors">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <div class="inline-flex items-center px-2.5 py-1 bg-brand-50 text-brand-600 text-xs font-medium rounded-full mb-4" id="modal-pos"></div>
              
              <div class="space-y-4">
                <div>
                  <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">English Definition</h4>
                  <p class="text-sm text-gray-700 leading-relaxed" id="modal-def-en"></p>
                </div>
                <div>
                  <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Chinese Definition</h4>
                  <p class="text-sm text-gray-700 leading-relaxed" id="modal-def"></p>
                </div>
                <div>
                  <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Examples</h4>
                  <div id="modal-examples" class="space-y-2"></div>
                </div>
                <div>
                  <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</h4>
                  <div id="modal-tags" class="flex flex-wrap gap-1.5"></div>
                </div>
              </div>

              <div class="flex items-center gap-3 mt-6 pt-4 border-t border-surface-100">
                <button id="modal-toggle-mastery" class="flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors"></button>
                <button id="modal-delete" class="px-4 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
                  <i class="fas fa-trash mr-1"></i>Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard Modal */}
      <div id="flashcard-modal" class="fixed inset-0 z-[100] hidden">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="absolute inset-0 flex items-center justify-center p-6">
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-gray-900">
                  <i class="fas fa-brain text-brand-500 mr-2"></i>Flashcard Review
                </h2>
                <button id="fc-close" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 text-gray-400 hover:text-gray-600">
                  <i class="fas fa-times"></i>
                </button>
              </div>

              {/* Progress */}
              <div class="flex items-center gap-3 mb-6">
                <div class="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full bg-brand-500 rounded-full transition-all duration-500" id="fc-progress-bar" style="width:0%"></div>
                </div>
                <span class="text-xs font-medium text-gray-400" id="fc-progress-text">0/0</span>
              </div>

              {/* Card */}
              <div id="fc-card" class="min-h-[280px] bg-surface-50 rounded-2xl border border-surface-200 p-8 flex flex-col items-center justify-center text-center cursor-pointer select-none" style="perspective:1000px">
                <div id="fc-front">
                  <p class="text-3xl font-bold text-gray-900 mb-2" id="fc-word"></p>
                  <p class="text-sm text-gray-400" id="fc-phonetic-card"></p>
                  <p class="text-xs text-brand-400 mt-2 font-medium" id="fc-pos-card"></p>
                  <p class="text-xs text-gray-300 mt-6"><i class="fas fa-hand-pointer mr-1"></i>Click to reveal</p>
                </div>
                <div id="fc-back" class="hidden">
                  <p class="text-xl font-bold text-gray-900 mb-1" id="fc-word-back"></p>
                  <p class="text-sm text-gray-700 mb-1" id="fc-def-en-back"></p>
                  <p class="text-sm text-gray-500 mb-3" id="fc-def-back"></p>
                  <p class="text-sm text-gray-500 italic leading-relaxed" id="fc-example-back"></p>
                </div>
              </div>

              {/* Actions */}
              <div class="flex items-center gap-3 mt-6" id="fc-actions" style="display:none">
                <button id="fc-forgot" class="flex-1 py-3 bg-rose-50 text-rose-600 text-sm font-medium rounded-xl hover:bg-rose-100 transition-colors">
                  <i class="fas fa-times mr-1.5"></i>Still Learning
                </button>
                <button id="fc-got-it" class="flex-1 py-3 bg-green-50 text-green-600 text-sm font-medium rounded-xl hover:bg-green-100 transition-colors">
                  <i class="fas fa-check mr-1.5"></i>Got It!
                </button>
              </div>

              {/* Complete State */}
              <div id="fc-complete" class="hidden text-center py-8">
                <p class="text-4xl mb-3">🎉</p>
                <p class="text-lg font-bold text-gray-900 mb-1">Review Complete!</p>
                <p class="text-sm text-gray-400 mb-4">Great job! Keep up the good work.</p>
                <button id="fc-restart" class="px-6 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors">
                  <i class="fas fa-redo mr-1.5"></i>Review Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] hidden">
        <div class="px-5 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl flex items-center gap-2">
          <i class="fas fa-check-circle text-green-400" id="toast-icon"></i>
          <span id="toast-msg">Updated!</span>
        </div>
      </div>

      <script src="/static/vocabulary.js"></script>
    </div>
  )
}
