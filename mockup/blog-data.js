// Shared content for the blog.
window.BLOG_AUTHOR = {
  name: 'A. Boneto',
  role: 'Principal Engineer · Tech Lead',
  bio: 'Escribo sobre arquitectura de software, infraestructura, IA aplicada y cómo medir el impacto real de las decisiones técnicas. 12 años construyendo sistemas que importan.',
  location: 'São Paulo, BR',
  links: [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Archivo en Medium', href: '#' },
    { label: 'RSS', href: '#' },
  ],
};

window.BLOG_CATEGORIES = [
  { slug: 'arquitectura',     name: 'Arquitectura',         count: 14 },
  { slug: 'infraestructura',  name: 'Infraestructura',      count: 11 },
  { slug: 'ia',               name: 'Inteligencia Artificial', count: 9  },
  { slug: 'liderazgo',        name: 'Liderazgo',            count: 8  },
  { slug: 'roi',              name: 'ROI & Decisiones',     count: 6  },
  { slug: 'practicas',        name: 'Buenas prácticas',     count: 12 },
];

// Each post may belong to multiple categories.
// `image` is a placeholder slug — the visual is generated from
// a hashed gradient so it reads as a real cover image until the
// user supplies the real asset in Jekyll.
window.BLOG_POSTS = [
  {
    id: 'roi-microservicios',
    title: 'El verdadero ROI de migrar a microservicios',
    excerpt: 'Después de tres migraciones, hojas de cálculo y suficiente café como para preocupar a un médico: lo que realmente cuesta y lo que realmente devuelve.',
    categories: ['roi', 'arquitectura', 'liderazgo'],
    date: '14 mayo 2026',
    readingTime: 12,
    image: 'roi-microservicios',
    featured: true,
  },
  {
    id: 'observabilidad-distribuida',
    title: 'Observabilidad en sistemas distribuidos: más allá del logging',
    excerpt: 'Por qué tus dashboards te están mintiendo, y cómo construir telemetría que responda preguntas que aún no sabes que tienes.',
    categories: ['infraestructura', 'practicas'],
    date: '02 mayo 2026',
    readingTime: 9,
    image: 'observabilidad',
  },
  {
    id: 'impacto-llm-produccion',
    title: 'Cómo evaluar el impacto real de un LLM en producción',
    excerpt: 'Latencia, costo por token, alucinaciones, y la métrica que casi nadie mide pero termina siendo la única que importa.',
    categories: ['ia', 'roi'],
    date: '24 abril 2026',
    readingTime: 11,
    image: 'llm-impacto',
  },
  {
    id: 'liderar-sin-perder-codigo',
    title: 'Liderar equipos técnicos sin perder el código',
    excerpt: 'La trampa del manager track: cómo mantener relevancia técnica mientras tu calendario se llena de 1:1s.',
    categories: ['liderazgo'],
    date: '11 abril 2026',
    readingTime: 7,
    image: 'liderar',
  },
  {
    id: 'abstracciones-prematuras',
    title: 'El costo oculto de las abstracciones prematuras',
    excerpt: 'DRY mal aplicado es el bug favorito de los seniors. Una taxonomía de cuándo no abstraer.',
    categories: ['practicas', 'arquitectura'],
    date: '28 marzo 2026',
    readingTime: 8,
    image: 'abstracciones',
  },
  {
    id: 'iac-cinco-anos',
    title: 'Infrastructure as Code: lecciones después de 5 años',
    excerpt: 'Terraform, Pulumi, CDK. Lo que aprendí dirigiendo plataforma para tres empresas y por qué seguiría empezando por lo mismo.',
    categories: ['infraestructura', 'practicas'],
    date: '15 marzo 2026',
    readingTime: 14,
    image: 'iac',
  },
  {
    id: 'rag-no-es-la-respuesta',
    title: 'RAG no es la respuesta a todo: cuándo no usar IA',
    excerpt: 'La presión por incluir IA en el roadmap está produciendo soluciones en busca de problema. Una checklist honesta.',
    categories: ['ia', 'practicas'],
    date: '01 marzo 2026',
    readingTime: 10,
    image: 'rag',
  },
  {
    id: 'metricas-cto',
    title: 'Métricas que importan para reportar a tu CTO',
    excerpt: 'DORA está bien, pero tu CTO quiere saber otras cosas. Cómo traducir señal técnica en lenguaje de board.',
    categories: ['liderazgo', 'roi'],
    date: '18 febrero 2026',
    readingTime: 6,
    image: 'metricas',
  },
  {
    id: 'event-driven-trampa',
    title: 'Event-driven no es magia: la trampa del acoplamiento implícito',
    excerpt: 'Cambiaste llamadas síncronas por eventos y crees que desacoplaste. Spoiler: probablemente no.',
    categories: ['arquitectura'],
    date: '02 febrero 2026',
    readingTime: 9,
    image: 'event-driven',
  },
  {
    id: 'plataforma-interna',
    title: 'Construir una plataforma interna sin convertirla en producto fantasma',
    excerpt: 'Platform engineering funciona cuando trata a sus devs como clientes. Cuando no, se convierte en otro silo.',
    categories: ['infraestructura', 'liderazgo'],
    date: '20 enero 2026',
    readingTime: 11,
    image: 'plataforma',
  },
  {
    id: 'code-review-cultura',
    title: 'El code review como herramienta cultural, no técnica',
    excerpt: 'Los mejores reviews que recibí no encontraron bugs. Encontraron suposiciones.',
    categories: ['practicas', 'liderazgo'],
    date: '08 enero 2026',
    readingTime: 5,
    image: 'code-review',
  },
  {
    id: 'modelos-on-prem',
    title: 'Cuándo tiene sentido correr tu propio modelo (y cuándo no)',
    excerpt: 'GPU-hours, latencia, privacidad y el factor humano que casi nadie incluye en la hoja de cálculo.',
    categories: ['ia', 'roi', 'infraestructura'],
    date: '22 diciembre 2025',
    readingTime: 13,
    image: 'on-prem',
  },
];

window.categoryName = function(slug) {
  const c = window.BLOG_CATEGORIES.find(c => c.slug === slug);
  return c ? c.name : slug;
};

// Deterministic placeholder visuals for post covers.
// Returns gradient + grid offset derived from the slug so each post has a
// stable, distinct look until the real art is supplied.
window.postImageStyle = function (slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const palettes = [
    ['#1d2a5e', '#3556ad', '#7aa2ff'],
    ['#10254a', '#1f4e8a', '#5ab0ff'],
    ['#2a1d5e', '#5535a0', '#a87cff'],
    ['#0d2a3e', '#1f6e8a', '#5ad8ff'],
    ['#1d3a5e', '#2c5fa0', '#88b8ff'],
    ['#241a4a', '#4a3aa0', '#9a7aff'],
  ];
  const p = palettes[h % palettes.length];
  const angle = 100 + (h % 80);
  const offset = (h % 40);
  return {
    background: 'linear-gradient(' + angle + 'deg, ' + p[0] + ' 0%, ' + p[1] + ' 55%, ' + p[2] + ' 100%)',
    gridOffset: offset,
    label: './img/' + slug + '.webp',
  };
};
