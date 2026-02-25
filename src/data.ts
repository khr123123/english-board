// ============================================================
// LinguaFlow - Data Models & In-Memory Store
// ============================================================

// ---------- Type Definitions ----------

export interface Word {
  id: string
  word: string
  phonetic: string
  definition: string        // Chinese definition
  definitionEn: string      // English definition
  partOfSpeech: string      // e.g. "noun", "verb", "adjective"
  examples: string[]
  tags: string[]            // e.g. ["verb", "lesson-1", "common"]
  mastered: boolean
  addedAt: string           // ISO date
  reviewCount: number
  audioUrl?: string
}

export interface Note {
  id: string
  lessonId: string
  content: string
  highlightText?: string    // the selected text
  position?: number         // paragraph index
  createdAt: string
}

export interface Lesson {
  id: string
  title: string
  subtitle: string
  level: string             // "Beginner" | "Intermediate" | "Advanced"
  category: string
  coverEmoji: string
  estimatedTime: string     // e.g. "8 min"
  paragraphs: Paragraph[]
  vocabulary: VocabItem[]
}

export interface Paragraph {
  text: string
  translation?: string
}

export interface VocabItem {
  word: string
  phonetic: string
  definition: string
  definitionEn: string
  partOfSpeech: string
  examples: string[]
}

// ---------- Sample Data ----------

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'The Art of Morning Routines',
    subtitle: 'How successful people start their day',
    level: 'Intermediate',
    category: 'Lifestyle',
    coverEmoji: '\u{1F305}',
    estimatedTime: '8 min',
    paragraphs: [
      {
        text: 'The way you start your morning often determines the trajectory of your entire day. Successful people around the world have long recognized this fundamental truth, crafting elaborate morning rituals that set the tone for productivity and well-being.',
        translation: '\u4F60\u5F00\u59CB\u65E9\u6668\u7684\u65B9\u5F0F\u5F80\u5F80\u51B3\u5B9A\u4E86\u4F60\u4E00\u6574\u5929\u7684\u8F68\u8FF9\u3002\u4E16\u754C\u5404\u5730\u7684\u6210\u529F\u4EBA\u58EB\u65E9\u5C31\u8BA4\u8BC6\u5230\u4E86\u8FD9\u4E2A\u57FA\u672C\u4E8B\u5B9E\uFF0C\u7CBE\u5FC3\u8BBE\u8BA1\u4E86\u7CBE\u5FC3\u7684\u6668\u95F4\u4EEA\u5F0F\uFF0C\u4E3A\u6548\u7387\u548C\u5065\u5EB7\u5960\u5B9A\u57FA\u8C03\u3002'
      },
      {
        text: 'Research published in the Journal of Applied Psychology reveals that individuals who establish consistent morning habits report 23% higher levels of overall life satisfaction. This compelling statistic underscores the profound impact of our earliest waking hours.',
        translation: '\u53D1\u8868\u5728\u300A\u5E94\u7528\u5FC3\u7406\u5B66\u6742\u5FD7\u300B\u4E0A\u7684\u7814\u7A76\u63ED\u793A\uFF0C\u5EFA\u7ACB\u4E86\u7A33\u5B9A\u6668\u95F4\u4E60\u60EF\u7684\u4EBA\uFF0C\u62A5\u544A\u7684\u6574\u4F53\u751F\u6D3B\u6EE1\u610F\u5EA6\u9AD8\u51FA23%\u3002\u8FD9\u4E00\u5F15\u4EBA\u6CE8\u76EE\u7684\u7EDF\u8BA1\u6570\u636E\u5F3A\u8C03\u4E86\u6211\u4EEC\u6700\u65E9\u9192\u6765\u65F6\u5149\u7684\u6DF1\u8FDC\u5F71\u54CD\u3002'
      },
      {
        text: 'Consider the case of Tim Cook, CEO of Apple, who famously rises at 3:45 AM. His morning regimen includes reviewing emails, exercising at the gym, and arriving at the office before most people have even hit their alarm clocks. While such an extreme schedule may not suit everyone, the underlying principle remains universal: deliberate morning practices yield remarkable results.',
        translation: '\u4EE5\u82F9\u679C\u516C\u53F8CEO\u8482\u59C6\u00B7\u5E93\u514B\u4E3A\u4F8B\uFF0C\u4ED6\u4EE5\u51CC\u66683:45\u8D77\u5E8A\u800C\u95FB\u540D\u3002\u4ED6\u7684\u6668\u95F4\u5E38\u89C4\u5305\u62EC\u67E5\u770B\u90AE\u4EF6\u3001\u5728\u5065\u8EAB\u623F\u953B\u70BC\uFF0C\u4EE5\u53CA\u5728\u5927\u591A\u6570\u4EBA\u8FD8\u6CA1\u6309\u4E0B\u95F9\u949F\u4E4B\u524D\u5C31\u5230\u8FBE\u529E\u516C\u5BA4\u3002\u867D\u7136\u8FD9\u6837\u6781\u7AEF\u7684\u65F6\u95F4\u8868\u53EF\u80FD\u4E0D\u9002\u5408\u6BCF\u4E2A\u4EBA\uFF0C\u4F46\u5176\u6F5C\u5728\u539F\u5219\u662F\u666E\u904D\u7684\uFF1A\u523B\u610F\u7684\u6668\u95F4\u4E60\u60EF\u4F1A\u4EA7\u751F\u663E\u8457\u7684\u6548\u679C\u3002'
      },
      {
        text: 'Meditation has emerged as a cornerstone of many high-achievers\' morning routines. By dedicating just ten minutes to mindfulness, practitioners cultivate a sense of clarity and composure that permeates their subsequent activities. The neuroscience behind this practice is robust: regular meditation strengthens neural pathways associated with focus, emotional regulation, and creative thinking.',
        translation: '\u51A5\u60F3\u5DF2\u6210\u4E3A\u8BB8\u591A\u9AD8\u6210\u5C31\u8005\u6668\u95F4\u5E38\u89C4\u7684\u57FA\u77F3\u3002\u901A\u8FC7\u6BCF\u5929\u53EA\u82B1\u5341\u5206\u949F\u8FDB\u884C\u6B63\u5FF5\u7EC3\u4E60\uFF0C\u4FEE\u884C\u8005\u4F1A\u57F9\u517B\u51FA\u4E00\u79CD\u6E17\u900F\u5230\u5176\u540E\u7EED\u6D3B\u52A8\u4E2D\u7684\u6E05\u6670\u548C\u6C89\u7740\u611F\u3002\u8FD9\u79CD\u5B9E\u8DF5\u80CC\u540E\u7684\u795E\u7ECF\u79D1\u5B66\u662F\u575A\u5B9E\u7684\uFF1A\u5B9A\u671F\u51A5\u60F3\u4F1A\u589E\u5F3A\u4E0E\u4E13\u6CE8\u529B\u3001\u60C5\u7EEA\u8C03\u8282\u548C\u521B\u9020\u6027\u601D\u7EF4\u76F8\u5173\u7684\u795E\u7ECF\u901A\u8DEF\u3002'
      },
      {
        text: 'Ultimately, the perfect morning routine is deeply personal. Whether you prefer a vigorous workout, a quiet cup of coffee with a journal, or an invigorating cold shower, the key lies in consistency and intentionality. Start small, experiment freely, and gradually build a morning ritual that resonates with your aspirations and lifestyle.',
        translation: '\u6700\u7EC8\uFF0C\u5B8C\u7F8E\u7684\u6668\u95F4\u5E38\u89C4\u662F\u975E\u5E38\u4E2A\u4EBA\u5316\u7684\u3002\u65E0\u8BBA\u4F60\u559C\u6B22\u5267\u70C8\u7684\u953B\u70BC\u3001\u5B89\u9759\u5730\u559D\u4E00\u676F\u5496\u5561\u5199\u65E5\u8BB0\uFF0C\u8FD8\u662F\u632F\u594B\u7CBE\u795E\u7684\u51B7\u6C34\u6DC7\uFF0C\u5173\u952E\u5728\u4E8E\u575A\u6301\u548C\u7528\u5FC3\u3002\u4ECE\u5C0F\u4E8B\u505A\u8D77\uFF0C\u81EA\u7531\u5C1D\u8BD5\uFF0C\u9010\u6B65\u5EFA\u7ACB\u4E00\u4E2A\u4E0E\u4F60\u7684\u62B1\u8D1F\u548C\u751F\u6D3B\u65B9\u5F0F\u4EA7\u751F\u5171\u9E23\u7684\u6668\u95F4\u4EEA\u5F0F\u3002'
      }
    ],
    vocabulary: [
      { word: 'trajectory', phonetic: '/tr\u0259\u02C8d\u0292ekt\u0259ri/', definition: '\u8F68\u8FF9\uFF0C\u53D1\u5C55\u8DEF\u5F84', definitionEn: 'the path followed by a moving object; course of development', partOfSpeech: 'noun', examples: ['The trajectory of his career was impressive.', 'The ball followed a curved trajectory.'] },
      { word: 'elaborate', phonetic: '/\u026A\u02C8l\u00E6b\u0259r\u0259t/', definition: '\u7CBE\u5FC3\u7684\uFF0C\u8BE6\u5C3D\u7684', definitionEn: 'involving many carefully arranged parts or details', partOfSpeech: 'adjective', examples: ['She had an elaborate morning routine.', 'The building had elaborate decorations.'] },
      { word: 'compelling', phonetic: '/k\u0259m\u02C8pel\u026A\u014B/', definition: '\u5F15\u4EBA\u6CE8\u76EE\u7684\uFF0C\u4EE4\u4EBA\u4FE1\u670D\u7684', definitionEn: 'evoking interest, attention, or admiration in a powerfully irresistible way', partOfSpeech: 'adjective', examples: ['The evidence was compelling.', 'She made a compelling argument.'] },
      { word: 'underscore', phonetic: '/\u02CC\u028Cnd\u0259r\u02C8sk\u0254\u02D0r/', definition: '\u5F3A\u8C03\uFF0C\u7A81\u51FA', definitionEn: 'to emphasize or stress', partOfSpeech: 'verb', examples: ['The report underscores the importance of early education.', 'His actions underscore his commitment.'] },
      { word: 'regimen', phonetic: '/\u02C8red\u0292\u026Am\u0259n/', definition: '\u751F\u6D3B\u5236\u5EA6\uFF0C\u517B\u751F\u6CD5', definitionEn: 'a prescribed course of treatment, diet, or exercise', partOfSpeech: 'noun', examples: ['He follows a strict exercise regimen.', 'The doctor recommended a new regimen.'] },
      { word: 'deliberate', phonetic: '/d\u026A\u02C8l\u026Ab\u0259r\u0259t/', definition: '\u523B\u610F\u7684\uFF0C\u6DF1\u601D\u719F\u8651\u7684', definitionEn: 'done consciously and intentionally', partOfSpeech: 'adjective', examples: ['It was a deliberate decision.', 'She spoke in a slow, deliberate manner.'] },
      { word: 'cornerstone', phonetic: '/\u02C8k\u0254\u02D0rn\u0259rsto\u028An/', definition: '\u57FA\u77F3\uFF0C\u57FA\u7840', definitionEn: 'an important quality or feature on which something is based', partOfSpeech: 'noun', examples: ['Education is the cornerstone of success.', 'Trust is the cornerstone of any relationship.'] },
      { word: 'cultivate', phonetic: '/\u02C8k\u028Clt\u026Ave\u026At/', definition: '\u57F9\u517B\uFF0C\u53D1\u5C55', definitionEn: 'to try to develop or improve something', partOfSpeech: 'verb', examples: ['She cultivated a love of reading.', 'It takes time to cultivate good habits.'] },
      { word: 'composure', phonetic: '/k\u0259m\u02C8po\u028A\u0292\u0259r/', definition: '\u6C89\u7740\uFF0C\u9547\u5B9A', definitionEn: 'the state of being calm and in control of oneself', partOfSpeech: 'noun', examples: ['She maintained her composure during the crisis.', 'He lost his composure briefly.'] },
      { word: 'permeate', phonetic: '/\u02C8p\u025C\u02D0rmie\u026At/', definition: '\u6E17\u900F\uFF0C\u5F25\u6F2B', definitionEn: 'to spread throughout something', partOfSpeech: 'verb', examples: ['The smell of coffee permeated the room.', 'A sense of optimism permeated the team.'] },
      { word: 'vigorous', phonetic: '/\u02C8v\u026A\u0261\u0259r\u0259s/', definition: '\u5145\u6EE1\u6D3B\u529B\u7684\uFF0C\u7CBE\u529B\u5145\u6C9B\u7684', definitionEn: 'strong, healthy, and full of energy', partOfSpeech: 'adjective', examples: ['He maintained a vigorous exercise routine.', 'The debate was vigorous.'] },
      { word: 'intentionality', phonetic: '/\u026An\u02CCten\u0283\u0259\u02C8n\u00E6l\u026Ati/', definition: '\u7528\u5FC3\uFF0C\u6709\u610F\u8BC6\u6027', definitionEn: 'the quality of being deliberate or purposive', partOfSpeech: 'noun', examples: ['Living with intentionality leads to fulfillment.', 'The project was designed with great intentionality.'] }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Digital Minimalism',
    subtitle: 'Finding focus in a noisy world',
    level: 'Advanced',
    category: 'Technology',
    coverEmoji: '\u{1F4F1}',
    estimatedTime: '10 min',
    paragraphs: [
      {
        text: 'In an era defined by constant connectivity, the concept of digital minimalism has gained unprecedented traction. Coined by computer science professor Cal Newport, the philosophy advocates for a more intentional approach to technology use, prioritizing tools that genuinely support our values over those that merely capture our attention.',
        translation: '\u5728\u4E00\u4E2A\u4EE5\u6301\u7EED\u8FDE\u63A5\u4E3A\u7279\u5F81\u7684\u65F6\u4EE3\uFF0C\u6570\u5B57\u6781\u7B80\u4E3B\u4E49\u7684\u6982\u5FF5\u83B7\u5F97\u4E86\u524D\u6240\u672A\u6709\u7684\u5173\u6CE8\u3002\u8FD9\u4E00\u7406\u5FF5\u7531\u8BA1\u7B97\u673A\u79D1\u5B66\u6559\u6388\u5361\u5C14\u00B7\u7EBD\u6CE2\u7279\u63D0\u51FA\uFF0C\u5021\u5BFC\u4EE5\u66F4\u6709\u610F\u8BC6\u7684\u65B9\u5F0F\u4F7F\u7528\u6280\u672F\uFF0C\u4F18\u5148\u9009\u62E9\u771F\u6B63\u652F\u6301\u6211\u4EEC\u4EF7\u503C\u89C2\u7684\u5DE5\u5177\uFF0C\u800C\u4E0D\u662F\u4EC5\u4EC5\u5438\u5F15\u6211\u4EEC\u6CE8\u610F\u529B\u7684\u5DE5\u5177\u3002'
      },
      {
        text: 'The average person checks their smartphone approximately 96 times per day, a staggering figure that illuminates our collective dependence on digital devices. Each notification, each scroll through social media, fragments our attention and diminishes our capacity for deep, meaningful work.',
        translation: '\u666E\u901A\u4EBA\u6BCF\u5929\u67E5\u770B\u624B\u673A\u7EA6 96 \u6B21\uFF0C\u8FD9\u4E00\u60CA\u4EBA\u7684\u6570\u5B57\u63ED\u793A\u4E86\u6211\u4EEC\u5BF9\u6570\u5B57\u8BBE\u5907\u7684\u96C6\u4F53\u4F9D\u8D56\u3002\u6BCF\u4E00\u6761\u901A\u77E5\u3001\u6BCF\u4E00\u6B21\u6ED1\u52A8\u6D4F\u89C8\u793E\u4EA4\u5A92\u4F53\uFF0C\u90FD\u5728\u7834\u788E\u6211\u4EEC\u7684\u6CE8\u610F\u529B\uFF0C\u524A\u5F31\u6211\u4EEC\u8FDB\u884C\u6DF1\u5165\u3001\u6709\u610F\u4E49\u5DE5\u4F5C\u7684\u80FD\u529B\u3002'
      },
      {
        text: 'Implementing digital minimalism does not require abandoning technology altogether. Rather, it involves a thoughtful audit of our digital lives: which apps genuinely enhance our existence, and which merely serve as vehicles for mindless consumption? By curating our digital environment with the same care we devote to our physical spaces, we reclaim sovereignty over our most precious resource\u2014our attention.',
        translation: '\u5B9E\u65BD\u6570\u5B57\u6781\u7B80\u4E3B\u4E49\u5E76\u4E0D\u9700\u8981\u5B8C\u5168\u653E\u5F03\u6280\u672F\u3002\u76F8\u53CD\uFF0C\u5B83\u6D89\u53CA\u5BF9\u6211\u4EEC\u6570\u5B57\u751F\u6D3B\u7684\u6DF1\u601D\u719F\u8651\u7684\u5BA1\u89C6\uFF1A\u54EA\u4E9B\u5E94\u7528\u771F\u6B63\u63D0\u5347\u4E86\u6211\u4EEC\u7684\u5B58\u5728\uFF0C\u54EA\u4E9B\u4EC5\u4EC5\u4F5C\u4E3A\u65E0\u8111\u6D88\u8D39\u7684\u8F7D\u4F53\uFF1F\u901A\u8FC7\u50CF\u5BF9\u5F85\u7269\u7406\u7A7A\u95F4\u4E00\u6837\u7CBE\u5FC3\u7B56\u5212\u6211\u4EEC\u7684\u6570\u5B57\u73AF\u5883\uFF0C\u6211\u4EEC\u91CD\u65B0\u83B7\u5F97\u4E86\u5BF9\u6211\u4EEC\u6700\u5B9D\u8D35\u8D44\u6E90\u2014\u2014\u6CE8\u610F\u529B\u7684\u4E3B\u6743\u3002'
      },
      {
        text: 'The benefits of this approach are manifold. Practitioners report improved concentration, deeper relationships, enhanced creativity, and a pervasive sense of calm that was previously elusive. In stripping away the superfluous, we discover what truly matters.',
        translation: '\u8FD9\u79CD\u65B9\u6CD5\u7684\u597D\u5904\u662F\u591A\u65B9\u9762\u7684\u3002\u5B9E\u8DF5\u8005\u62A5\u544A\u4E86\u6CE8\u610F\u529B\u7684\u63D0\u9AD8\u3001\u66F4\u6DF1\u5C42\u7684\u4EBA\u9645\u5173\u7CFB\u3001\u589E\u5F3A\u7684\u521B\u9020\u529B\uFF0C\u4EE5\u53CA\u4E00\u79CD\u4EE5\u524D\u96BE\u4EE5\u6349\u6478\u7684\u666E\u904D\u5E73\u9759\u611F\u3002\u5728\u5265\u79BB\u591A\u4F59\u4E4B\u540E\uFF0C\u6211\u4EEC\u53D1\u73B0\u4E86\u4EC0\u4E48\u624D\u662F\u771F\u6B63\u91CD\u8981\u7684\u3002'
      }
    ],
    vocabulary: [
      { word: 'unprecedented', phonetic: '/\u028Cn\u02C8pres\u026Adent\u026Ad/', definition: '\u524D\u6240\u672A\u6709\u7684', definitionEn: 'never done or known before', partOfSpeech: 'adjective', examples: ['The pandemic caused unprecedented disruption.', 'She achieved unprecedented success.'] },
      { word: 'traction', phonetic: '/\u02C8tr\u00E6k\u0283\u0259n/', definition: '\u5173\u6CE8\u5EA6\uFF0C\u5F71\u54CD\u529B', definitionEn: 'the extent to which an idea or product gains popularity', partOfSpeech: 'noun', examples: ['The idea gained traction among young people.', 'The startup is finally gaining traction.'] },
      { word: 'advocate', phonetic: '/\u02C8\u00E6dv\u0259ke\u026At/', definition: '\u63D0\u5021\uFF0C\u4E3B\u5F20', definitionEn: 'to publicly support or suggest', partOfSpeech: 'verb', examples: ['She advocates for equal rights.', 'He advocated a new approach.'] },
      { word: 'staggering', phonetic: '/\u02C8st\u00E6\u0261\u0259r\u026A\u014B/', definition: '\u4EE4\u4EBA\u9707\u60CA\u7684', definitionEn: 'very surprising or shocking', partOfSpeech: 'adjective', examples: ['The cost was staggering.', 'A staggering number of people attended.'] },
      { word: 'sovereignty', phonetic: '/\u02C8s\u0252vr\u0259nti/', definition: '\u4E3B\u6743\uFF0C\u81EA\u4E3B\u6743', definitionEn: 'supreme power or authority; self-governance', partOfSpeech: 'noun', examples: ['National sovereignty must be respected.', 'He values his personal sovereignty.'] },
      { word: 'manifold', phonetic: '/\u02C8m\u00E6n\u026Afo\u028Ald/', definition: '\u591A\u65B9\u9762\u7684\uFF0C\u591A\u79CD\u591A\u6837\u7684', definitionEn: 'many and of several different types', partOfSpeech: 'adjective', examples: ['The problems were manifold.', 'She had manifold talents.'] },
      { word: 'pervasive', phonetic: '/p\u0259r\u02C8ve\u026As\u026Av/', definition: '\u666E\u904D\u7684\uFF0C\u5F25\u6F2B\u7684', definitionEn: 'spreading widely throughout an area or group', partOfSpeech: 'adjective', examples: ['The pervasive influence of social media.', 'A pervasive sense of fear.'] },
      { word: 'superfluous', phonetic: '/su\u02D0\u02C8p\u025C\u02D0rflu\u0259s/', definition: '\u591A\u4F59\u7684\uFF0C\u8FC7\u5269\u7684', definitionEn: 'unnecessary, more than what is needed', partOfSpeech: 'adjective', examples: ['Remove all superfluous details.', 'His comments were superfluous.'] }
    ]
  },
  {
    id: 'lesson-3',
    title: 'The Science of Happiness',
    subtitle: 'What research tells us about well-being',
    level: 'Beginner',
    category: 'Psychology',
    coverEmoji: '\u{1F60A}',
    estimatedTime: '6 min',
    paragraphs: [
      {
        text: 'Happiness is not merely the absence of sadness. Modern psychology has revealed that genuine well-being comprises multiple dimensions, including positive emotions, engagement, meaningful relationships, a sense of purpose, and personal accomplishment.',
        translation: '\u5E78\u798F\u4E0D\u4EC5\u4EC5\u662F\u6CA1\u6709\u60B2\u4F24\u3002\u73B0\u4EE3\u5FC3\u7406\u5B66\u63ED\u793A\uFF0C\u771F\u6B63\u7684\u5E78\u798F\u5305\u542B\u591A\u4E2A\u7EF4\u5EA6\uFF0C\u5305\u62EC\u79EF\u6781\u60C5\u7EEA\u3001\u6295\u5165\u611F\u3001\u6709\u610F\u4E49\u7684\u5173\u7CFB\u3001\u76EE\u6807\u611F\u548C\u4E2A\u4EBA\u6210\u5C31\u3002'
      },
      {
        text: 'One of the most robust findings in happiness research is the importance of social connections. People who maintain strong bonds with family and friends consistently report higher levels of life satisfaction. Even brief interactions with strangers can boost our mood significantly.',
        translation: '\u5E78\u798F\u7814\u7A76\u4E2D\u6700\u53EF\u9760\u7684\u53D1\u73B0\u4E4B\u4E00\u662F\u793E\u4F1A\u8054\u7CFB\u7684\u91CD\u8981\u6027\u3002\u4E0E\u5BB6\u4EBA\u548C\u670B\u53CB\u4FDD\u6301\u7262\u56FA\u7EBD\u5E26\u7684\u4EBA\u6301\u7EED\u62A5\u544A\u66F4\u9AD8\u7684\u751F\u6D3B\u6EE1\u610F\u5EA6\u3002\u5373\u4F7F\u662F\u4E0E\u964C\u751F\u4EBA\u7684\u77ED\u6682\u4E92\u52A8\u4E5F\u80FD\u663E\u8457\u63D0\u5347\u6211\u4EEC\u7684\u5FC3\u60C5\u3002'
      },
      {
        text: 'Gratitude practices have also shown remarkable efficacy. Writing down three things you are grateful for each day can measurably increase your happiness within just two weeks. This simple habit rewires the brain to notice and appreciate positive experiences more readily.',
        translation: '\u611F\u6069\u7EC3\u4E60\u4E5F\u5C55\u73B0\u51FA\u663E\u8457\u7684\u6548\u679C\u3002\u6BCF\u5929\u5199\u4E0B\u4E09\u4EF6\u4F60\u611F\u6069\u7684\u4E8B\u60C5\uFF0C\u53EF\u4EE5\u5728\u4EC5\u4EC5\u4E24\u5468\u5185\u53EF\u6D4B\u91CF\u5730\u589E\u52A0\u4F60\u7684\u5E78\u798F\u611F\u3002\u8FD9\u4E2A\u7B80\u5355\u7684\u4E60\u60EF\u4F1A\u91CD\u65B0\u8FDE\u63A5\u5927\u8111\uFF0C\u4F7F\u5176\u66F4\u5BB9\u6613\u6CE8\u610F\u5230\u548C\u6B23\u8D4F\u79EF\u6781\u7684\u7ECF\u5386\u3002'
      }
    ],
    vocabulary: [
      { word: 'comprise', phonetic: '/k\u0259m\u02C8pra\u026Az/', definition: '\u5305\u542B\uFF0C\u7EC4\u6210', definitionEn: 'to consist of; be made up of', partOfSpeech: 'verb', examples: ['The team comprises five members.', 'The collection comprises rare paintings.'] },
      { word: 'engagement', phonetic: '/\u026An\u02C8\u0261e\u026Ad\u0292m\u0259nt/', definition: '\u6295\u5165\uFF0C\u53C2\u4E0E', definitionEn: 'the state of being involved in something', partOfSpeech: 'noun', examples: ['Student engagement is key to learning.', 'The level of engagement was high.'] },
      { word: 'robust', phonetic: '/ro\u028A\u02C8b\u028Cst/', definition: '\u5F3A\u5065\u7684\uFF0C\u575A\u5B9E\u7684', definitionEn: 'strong and healthy; vigorous', partOfSpeech: 'adjective', examples: ['The evidence is robust.', 'He has a robust constitution.'] },
      { word: 'efficacy', phonetic: '/\u02C8ef\u026Ak\u0259si/', definition: '\u529F\u6548\uFF0C\u6709\u6548\u6027', definitionEn: 'the ability to produce a desired result', partOfSpeech: 'noun', examples: ['The efficacy of the treatment was proven.', 'They questioned the efficacy of the policy.'] },
      { word: 'measurably', phonetic: '/\u02C8me\u0292\u0259r\u0259bli/', definition: '\u53EF\u6D4B\u91CF\u5730\uFF0C\u660E\u663E\u5730', definitionEn: 'in a way that can be measured or noticed', partOfSpeech: 'adverb', examples: ['Performance improved measurably.', 'The results are measurably better.'] }
    ]
  }
]

// ---------- In-Memory Stores (for demo; production would use D1) ----------

export let wordbook: Word[] = [
  {
    id: 'w-1',
    word: 'trajectory',
    phonetic: '/tr\u0259\u02C8d\u0292ekt\u0259ri/',
    definition: '\u8F68\u8FF9\uFF0C\u53D1\u5C55\u8DEF\u5F84',
    definitionEn: 'the path followed by a moving object; course of development',
    partOfSpeech: 'noun',
    examples: ['The trajectory of his career was impressive.', 'The ball followed a curved trajectory.'],
    tags: ['noun', 'lesson-1', 'academic'],
    mastered: false,
    addedAt: '2026-02-20T08:00:00Z',
    reviewCount: 2
  },
  {
    id: 'w-2',
    word: 'compelling',
    phonetic: '/k\u0259m\u02C8pel\u026A\u014B/',
    definition: '\u5F15\u4EBA\u6CE8\u76EE\u7684\uFF0C\u4EE4\u4EBA\u4FE1\u670D\u7684',
    definitionEn: 'evoking interest, attention, or admiration in a powerfully irresistible way',
    partOfSpeech: 'adjective',
    examples: ['The evidence was compelling.', 'She made a compelling argument.'],
    tags: ['adjective', 'lesson-1', 'common'],
    mastered: true,
    addedAt: '2026-02-19T10:00:00Z',
    reviewCount: 5
  },
  {
    id: 'w-3',
    word: 'unprecedented',
    phonetic: '/\u028Cn\u02C8pres\u026Adent\u026Ad/',
    definition: '\u524D\u6240\u672A\u6709\u7684',
    definitionEn: 'never done or known before',
    partOfSpeech: 'adjective',
    examples: ['The pandemic caused unprecedented disruption.', 'She achieved unprecedented success.'],
    tags: ['adjective', 'lesson-2', 'academic'],
    mastered: false,
    addedAt: '2026-02-21T14:00:00Z',
    reviewCount: 1
  }
]

export let notes: Note[] = [
  {
    id: 'n-1',
    lessonId: 'lesson-1',
    content: 'The connection between morning routines and productivity is fascinating. I should try waking up earlier.',
    highlightText: 'morning rituals',
    position: 0,
    createdAt: '2026-02-20T09:00:00Z'
  }
]
