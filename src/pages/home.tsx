import type { Context } from 'hono'
import { lessons } from '../data'

export const homePage = (c: Context) => {
  return c.render(
    <div class="min-h-screen">
      {/* Navigation */}
      <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-200 group-hover:shadow-lg group-hover:shadow-brand-300 transition-shadow">
              <i class="fas fa-book-open text-white text-sm"></i>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">LinguaFlow</span>
          </a>
          <div class="flex items-center gap-2">
            <a href="/" class="px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg">
              <i class="fas fa-home mr-1.5"></i>Home
            </a>
            <a href="/vocabulary" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
              <i class="fas fa-book mr-1.5"></i>Vocabulary
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-blue-50"></div>
        <div class="absolute top-20 right-20 w-72 h-72 bg-brand-100 rounded-full blur-3xl opacity-40"></div>
        <div class="absolute bottom-10 left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        
        <div class="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-600 text-xs font-medium mb-6">
              <span class="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
              Smart English Learning
            </div>
            <h1 class="text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
              Read, Learn, Master
              <span class="block text-brand-600 mt-1">English Naturally</span>
            </h1>
            <p class="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Immerse yourself in curated articles. Build vocabulary through context. 
              Review with smart flashcards. Track your progress effortlessly.
            </p>
            <div class="flex items-center gap-8 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <i class="fas fa-check text-green-500 text-xs"></i>
                </div>
                <span>Context-based learning</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                  <i class="fas fa-bolt text-amber-500 text-xs"></i>
                </div>
                <span>Instant word lookup</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                  <i class="fas fa-brain text-purple-500 text-xs"></i>
                </div>
                <span>Spaced repetition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section class="border-y border-surface-200 bg-white">
        <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-newspaper text-brand-500"></i>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900">{lessons.length}</p>
                <p class="text-xs text-gray-400">Lessons</p>
              </div>
            </div>
            <div class="w-px h-8 bg-surface-200"></div>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-spell-check text-amber-500"></i>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900">{lessons.reduce((s, l) => s + l.vocabulary.length, 0)}</p>
                <p class="text-xs text-gray-400">Vocabulary</p>
              </div>
            </div>
            <div class="w-px h-8 bg-surface-200"></div>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <i class="fas fa-clock text-green-500"></i>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900">{lessons.reduce((s, l) => s + parseInt(l.estimatedTime), 0)} min</p>
                <p class="text-xs text-gray-400">Total Reading</p>
              </div>
            </div>
          </div>
          <a href="/vocabulary" class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-md shadow-brand-200">
            <i class="fas fa-book-open"></i>
            My Vocabulary
          </a>
        </div>
      </section>

      {/* Lessons Grid */}
      <section class="max-w-6xl mx-auto px-6 py-12">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Reading Lessons</h2>
            <p class="text-sm text-gray-400 mt-1">Choose an article and start learning</p>
          </div>
          <div class="flex items-center gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button class={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                lvl === 'All' ? 'bg-brand-600 text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-brand-50 hover:text-brand-600 border border-surface-200'
              }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson) => {
            const levelColor = lesson.level === 'Beginner' ? 'bg-green-50 text-green-600 border-green-100' :
              lesson.level === 'Intermediate' ? 'bg-amber-50 text-amber-600 border-amber-100' :
              'bg-rose-50 text-rose-600 border-rose-100'
            return (
              <a href={`/reading/${lesson.id}`} class="group block bg-white rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-50 transition-all duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="text-4xl">{lesson.coverEmoji}</div>
                    <span class={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${levelColor}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1.5 line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p class="text-sm text-gray-400 mb-5 line-clamp-2">{lesson.subtitle}</p>
                  <div class="flex items-center justify-between pt-4 border-t border-surface-100">
                    <div class="flex items-center gap-4 text-xs text-gray-400">
                      <span class="flex items-center gap-1.5">
                        <i class="fas fa-clock"></i>
                        {lesson.estimatedTime}
                      </span>
                      <span class="flex items-center gap-1.5">
                        <i class="fas fa-spell-check"></i>
                        {lesson.vocabulary.length} words
                      </span>
                    </div>
                    <div class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                      <i class="fas fa-arrow-right text-brand-500 text-xs"></i>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t border-surface-200 bg-white mt-8">
        <div class="max-w-6xl mx-auto px-6 py-8 text-center">
          <p class="text-sm text-gray-400">LinguaFlow &mdash; Learn English through immersive reading</p>
        </div>
      </footer>
    </div>
  )
}
