import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { homePage } from './pages/home'
import { readingPage } from './pages/reading'
import { vocabularyPage } from './pages/vocabulary'
import { apiRoutes } from './api'

const app = new Hono()

app.use(renderer)
app.use('/api/*', cors())

// Pages
app.get('/', homePage)
app.get('/reading/:id', readingPage)
app.get('/vocabulary', vocabularyPage)

// API
app.route('/api', apiRoutes)

export default app
