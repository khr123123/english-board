import { Hono } from 'hono'
import { lessons, wordbook, notes, type Word, type Note } from './data'

export const apiRoutes = new Hono()

// ========== Lessons API ==========
apiRoutes.get('/lessons', (c) => {
  const summaries = lessons.map(l => ({
    id: l.id,
    title: l.title,
    subtitle: l.subtitle,
    level: l.level,
    category: l.category,
    coverEmoji: l.coverEmoji,
    estimatedTime: l.estimatedTime,
    wordCount: l.paragraphs.reduce((sum, p) => sum + p.text.split(/\s+/).length, 0),
    vocabCount: l.vocabulary.length
  }))
  return c.json(summaries)
})

apiRoutes.get('/lessons/:id', (c) => {
  const lesson = lessons.find(l => l.id === c.req.param('id'))
  if (!lesson) return c.json({ error: 'Lesson not found' }, 404)
  return c.json(lesson)
})

// ========== Wordbook API ==========
apiRoutes.get('/wordbook', (c) => {
  const search = c.req.query('search')?.toLowerCase()
  const tag = c.req.query('tag')
  const mastered = c.req.query('mastered')

  let result = [...wordbook]

  if (search) {
    result = result.filter(w =>
      w.word.toLowerCase().includes(search) ||
      w.definition.includes(search) ||
      w.definitionEn.toLowerCase().includes(search)
    )
  }
  if (tag) {
    result = result.filter(w => w.tags.includes(tag))
  }
  if (mastered !== undefined && mastered !== '') {
    result = result.filter(w => w.mastered === (mastered === 'true'))
  }

  return c.json({
    words: result.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()),
    total: result.length,
    masteredCount: wordbook.filter(w => w.mastered).length,
    totalCount: wordbook.length
  })
})

apiRoutes.post('/wordbook', async (c) => {
  const body = await c.req.json()
  
  // Check if word already exists
  const existing = wordbook.find(w => w.word.toLowerCase() === body.word.toLowerCase())
  if (existing) {
    return c.json({ message: 'Word already in wordbook', word: existing }, 200)
  }

  const newWord: Word = {
    id: `w-${Date.now()}`,
    word: body.word,
    phonetic: body.phonetic || '',
    definition: body.definition || '',
    definitionEn: body.definitionEn || '',
    partOfSpeech: body.partOfSpeech || '',
    examples: body.examples || [],
    tags: body.tags || [],
    mastered: false,
    addedAt: new Date().toISOString(),
    reviewCount: 0
  }

  wordbook.push(newWord)
  return c.json(newWord, 201)
})

apiRoutes.patch('/wordbook/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const idx = wordbook.findIndex(w => w.id === id)
  if (idx === -1) return c.json({ error: 'Word not found' }, 404)

  wordbook[idx] = { ...wordbook[idx], ...body }
  return c.json(wordbook[idx])
})

apiRoutes.delete('/wordbook/:id', (c) => {
  const id = c.req.param('id')
  const idx = wordbook.findIndex(w => w.id === id)
  if (idx === -1) return c.json({ error: 'Word not found' }, 404)

  wordbook.splice(idx, 1)
  return c.json({ success: true })
})

// ========== Notes API ==========
apiRoutes.get('/notes', (c) => {
  const lessonId = c.req.query('lessonId')
  let result = [...notes]
  if (lessonId) {
    result = result.filter(n => n.lessonId === lessonId)
  }
  return c.json(result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
})

apiRoutes.post('/notes', async (c) => {
  const body = await c.req.json()
  const newNote: Note = {
    id: `n-${Date.now()}`,
    lessonId: body.lessonId,
    content: body.content,
    highlightText: body.highlightText || '',
    position: body.position,
    createdAt: new Date().toISOString()
  }
  notes.push(newNote)
  return c.json(newNote, 201)
})

apiRoutes.delete('/notes/:id', (c) => {
  const id = c.req.param('id')
  const idx = notes.findIndex(n => n.id === id)
  if (idx === -1) return c.json({ error: 'Note not found' }, 404)
  notes.splice(idx, 1)
  return c.json({ success: true })
})

// ========== Tags API ==========
apiRoutes.get('/tags', (c) => {
  const allTags = new Set<string>()
  wordbook.forEach(w => w.tags.forEach(t => allTags.add(t)))
  return c.json([...allTags].sort())
})
