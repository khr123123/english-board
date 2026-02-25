import type { Context } from 'hono'
import { lessons } from '../data'

export const readingPage = (c: Context) => {
  const id = c.req.param('id')
  const lesson = lessons.find(l => l.id === id)

  if (!lesson) {
    return c.render(
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <p class="text-6xl mb-4">📚</p>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
          <a href="/" class="text-brand-600 hover:underline text-sm">Back to Home</a>
        </div>
      </div>
    )
  }

  const vocabWords = lesson.vocabulary.map(v => v.word.toLowerCase())

  return c.render(
    <div class="min-h-screen bg-surface-50">
      {/* Navigation */}
      <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200">
        <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="/" class="flex items-center gap-2 text-gray-400 hover:text-brand-600 transition-colors">
              <i class="fas fa-arrow-left text-sm"></i>
              <span class="text-sm font-medium">Back</span>
            </a>
            <div class="w-px h-5 bg-surface-200"></div>
            <a href="/" class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <i class="fas fa-book-open text-white text-xs"></i>
              </div>
              <span class="text-base font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">LinguaFlow</span>
            </a>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-toggle-translation" class="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Toggle translations">
              <i class="fas fa-language mr-1"></i>Translation
            </button>
            <button id="btn-toggle-notes" class="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors lg:hidden" title="Toggle notes panel">
              <i class="fas fa-sticky-note mr-1"></i>Notes
            </button>
            <a href="/vocabulary" class="px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
              <i class="fas fa-book mr-1"></i>Vocabulary
            </a>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex gap-6" id="reading-layout">
          {/* Main Reading Area */}
          <main class="flex-1 min-w-0">
            {/* Article Header */}
            <div class="bg-white rounded-2xl border border-surface-200 p-8 mb-5">
              <div class="flex items-center gap-3 mb-4">
                <span class={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${
                  lesson.level === 'Beginner' ? 'bg-green-50 text-green-600 border-green-100' :
                  lesson.level === 'Intermediate' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  {lesson.level}
                </span>
                <span class="text-xs text-gray-400">{lesson.category}</span>
                <span class="text-xs text-gray-300">·</span>
                <span class="text-xs text-gray-400"><i class="fas fa-clock mr-1"></i>{lesson.estimatedTime}</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{lesson.title}</h1>
              <p class="text-base text-gray-400">{lesson.subtitle}</p>
            </div>

            {/* Article Content */}
            <div class="bg-white rounded-2xl border border-surface-200 p-8 mb-5" id="article-content">
              {lesson.paragraphs.map((para, idx) => (
                <div class="mb-8 last:mb-0 paragraph-block" data-index={idx}>
                  <p class="text-lg leading-[1.9] text-gray-800 font-serif reading-text" data-paragraph={idx}>
                    {para.text}
                  </p>
                  {para.translation && (
                    <p class="mt-2 text-sm text-gray-400 leading-relaxed translation-text hidden border-l-2 border-brand-100 pl-3 py-1">
                      {para.translation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Vocabulary List */}
            <div class="bg-white rounded-2xl border border-surface-200 p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-gray-900">
                  <i class="fas fa-spell-check text-brand-500 mr-2"></i>
                  Key Vocabulary
                </h2>
                <span class="text-xs text-gray-400">{lesson.vocabulary.length} words</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3" id="vocab-list">
                {lesson.vocabulary.map((v) => (
                  <div class="vocab-card group flex items-start gap-3 p-4 rounded-xl border border-surface-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all cursor-pointer" data-word={v.word} data-phonetic={v.phonetic} data-definition={v.definition} data-definition-en={v.definitionEn} data-pos={v.partOfSpeech} data-examples={JSON.stringify(v.examples)}>
                    <div class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-100 transition-colors">
                      <span class="text-brand-600 text-xs font-bold">{v.word[0].toUpperCase()}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-0.5">
                        <span class="font-semibold text-gray-900 text-sm">{v.word}</span>
                        <span class="text-xs text-gray-400">{v.phonetic}</span>
                        <span class="text-xs text-brand-400 bg-brand-50 px-1.5 py-0.5 rounded">{v.partOfSpeech}</span>
                      </div>
                      <p class="text-xs text-gray-500 truncate">{v.definitionEn}</p>
                      <p class="text-xs text-gray-400 truncate">{v.definition}</p>
                    </div>
                    <button class="add-to-wordbook opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-brand-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-brand-600 mt-0.5" title="Add to wordbook">
                      <i class="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Right Sidebar: Notes & Word Tooltip Area */}
          <aside class="w-80 flex-shrink-0 hidden lg:block" id="notes-panel">
            <div class="sticky top-20">
              {/* Quick Word Card */}
              <div class="bg-white rounded-2xl border border-surface-200 p-5 mb-4 hidden" id="word-detail-card">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-base font-bold text-gray-900" id="wc-word"></h3>
                  <button class="text-gray-300 hover:text-gray-500" id="wc-close"><i class="fas fa-times text-xs"></i></button>
                </div>
                <p class="text-xs text-gray-400 mb-1" id="wc-phonetic"></p>
                <p class="text-xs text-brand-500 mb-2 font-medium" id="wc-pos"></p>
                <p class="text-sm text-gray-700 mb-1" id="wc-def-en"></p>
                <p class="text-sm text-gray-500 mb-3" id="wc-def"></p>
                <div id="wc-examples" class="space-y-1.5 mb-4"></div>
                <button id="wc-add-btn" class="w-full py-2 bg-brand-600 text-white text-xs font-medium rounded-lg hover:bg-brand-700 transition-colors">
                  <i class="fas fa-plus mr-1"></i>Add to Wordbook
                </button>
              </div>

              {/* Notes Section */}
              <div class="bg-white rounded-2xl border border-surface-200 p-5">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-sm font-bold text-gray-900">
                    <i class="fas fa-sticky-note text-amber-500 mr-1.5"></i>Reading Notes
                  </h3>
                  <span class="text-xs text-gray-400" id="notes-count">0 notes</span>
                </div>

                {/* Note Input */}
                <div class="mb-4">
                  <textarea 
                    id="note-input"
                    class="w-full h-24 text-sm text-gray-700 bg-surface-50 border border-surface-200 rounded-xl p-3 resize-none focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 placeholder-gray-300 transition-all"
                    placeholder="Write a note about this lesson..."
                  ></textarea>
                  <button id="save-note-btn" class="mt-2 w-full py-2 bg-brand-600 text-white text-xs font-medium rounded-lg hover:bg-brand-700 transition-colors">
                    <i class="fas fa-save mr-1"></i>Save Note
                  </button>
                </div>

                {/* Notes List */}
                <div id="notes-list" class="space-y-3 max-h-[400px] overflow-y-auto">
                  <div class="text-center py-6 text-gray-300 text-xs" id="notes-empty">
                    <i class="fas fa-feather-alt text-2xl mb-2 block"></i>
                    No notes yet. Start writing!
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Word Tooltip (floating) */}
      <div id="word-tooltip" class="fixed z-[999] bg-white rounded-xl shadow-2xl shadow-black/10 border border-surface-200 p-4 max-w-xs hidden" style="pointer-events:auto;">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-gray-900 text-sm" id="tt-word"></span>
          <span class="text-xs text-gray-400" id="tt-phonetic"></span>
        </div>
        <p class="text-xs text-brand-500 font-medium mb-1" id="tt-pos"></p>
        <p class="text-sm text-gray-700 mb-0.5" id="tt-def-en"></p>
        <p class="text-xs text-gray-400 mb-2" id="tt-def"></p>
        <button id="tt-add-btn" class="w-full py-1.5 bg-brand-600 text-white text-xs font-medium rounded-lg hover:bg-brand-700 transition-colors">
          <i class="fas fa-plus mr-1"></i>Add to Wordbook
        </button>
      </div>

      {/* Toast notification */}
      <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] hidden">
        <div class="px-5 py-3 bg-gray-900 text-white text-sm rounded-xl shadow-xl flex items-center gap-2">
          <i class="fas fa-check-circle text-green-400" id="toast-icon"></i>
          <span id="toast-msg">Word added!</span>
        </div>
      </div>

      {/* Inline script with lesson data */}
      <script dangerouslySetInnerHTML={{__html: `
        window.__LESSON_ID__ = "${lesson.id}";
        window.__VOCAB__ = ${JSON.stringify(lesson.vocabulary)};
      `}} />
      <script src="/static/reading.js"></script>
    </div>
  )
}
