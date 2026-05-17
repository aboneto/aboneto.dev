/* Variant — Terminal Editorial
   Mono-leaning dev aesthetic, dark blue base.
   Posts have placeholder cover images.
   Multiple categories per post — surfaced on the post page (frontmatter)
   and as filter chips, not in row listings. */

function PostImage({ slug, height = 220 }) {
  const s = window.postImageStyle(slug);
  return (
    <div className="post-image" style={{ height, background: s.background }}>
      <div className="post-image-grid" style={{ backgroundPosition: s.gridOffset + 'px ' + s.gridOffset + 'px' }}></div>
      <div className="post-image-label">{s.label}</div>
    </div>
  );
}

function TTopBar({ onMenu }) {
  return (
    <div className="topbar">
      <div className="wordmark">
        <span className="prompt">$</span>
        <span>cd</span>
        <span className="path">~/aboneto.dev</span>
        <span className="cursor"></span>
      </div>
      <div className="topbar-right">
        <a href="#">/archivo</a>
        <a href="#">/feed.xml</a>
        <button className="hamburger" aria-label="Menú" onClick={onMenu}>≡</button>
      </div>
    </div>
  );
}

function TFoot() {
  return (
    <div className="foot">
      <span><span className="prompt">$</span> echo "© 2026 a.boneto · build: 026.5.14"</span>
      <span>
        <a href="#">rss</a><a href="#">json</a><a href="#">sitemap</a>
      </span>
    </div>
  );
}

function TAuthor() {
  const a = window.BLOG_AUTHOR;
  return (
    <div className="author">
      <div className="author-grid">
        <div className="author-photo">
          <span className="initials">AB</span>
        </div>
        <div>
          <div className="tag">// whoami</div>
          <h2>{a.name}</h2>
          <div className="role">{a.role}</div>
          <p>{a.bio}</p>
        </div>
        <dl className="author-meta">
          <dt>location</dt>
          <dd>{a.location}</dd>
          <dt>writes_about</dt>
          <dd>arch · infra · ia · lead</dd>
          <dt>contact</dt>
          {a.links.map(l => <dd key={l.label}><a href={l.href}>→ {l.label.toLowerCase()}</a></dd>)}
        </dl>
      </div>
    </div>
  );
}

function TerminalHome() {
  const featured = window.BLOG_POSTS.find(p => p.featured);
  const rest = window.BLOG_POSTS.filter(p => !p.featured).slice(0, 7);
  return (
    <div className="v-terminal" style={{minHeight: '100%'}}>
      <TTopBar />
      <div className="hero">
        <div className="hero-text">
          <div className="hero-tag">
            <span className="bracket">[</span>
            <span>destacado</span>
            <span className="dash">·</span>
            <span>2026-05-14</span>
            <span className="bracket">]</span>
          </div>
          <h1 className="hero-title">
            <span className="cmd-prefix">&gt;_</span> {featured.title}
          </h1>
          <p className="hero-excerpt">{featured.excerpt}</p>
          <div className="hero-meta">
            <span><span className="k">author:</span> a.boneto</span>
            <span><span className="k">read:</span> ~{featured.readingTime}min</span>
            <span><span className="k">wc:</span> 3214</span>
          </div>
        </div>
        <div className="hero-image-wrap">
          <PostImage slug={featured.image} variant="hero" />
        </div>
      </div>

      <div className="latest">
        <div className="section-head">
          <h2><span className="punct">{'//'}</span> <span className="accent">recent_posts</span> <span className="punct">— últimos publicados</span></h2>
          <a className="more" href="#">ls -la archivo →</a>
        </div>
        {rest.map((p, i) => (
          <div className="post-row" key={p.id}>
            <span className="num">[{String(i + 1).padStart(2, '0')}]</span>
            <span className="date">{p.date.replace(/ /g, '·')}</span>
            <div className="thumb"><PostImage slug={p.image} /></div>
            <div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
            <span className="rt">~{p.readingTime}min</span>
          </div>
        ))}
      </div>

      <TAuthor />
      <TFoot />
    </div>
  );
}

function TerminalPost() {
  const post = window.BLOG_POSTS.find(p => p.featured);
  return (
    <div className="v-terminal" style={{minHeight: '100%'}}>
      <TTopBar />
      <div className="reader">
        <div className="reader-head">
          <div className="reader-frontmatter">
            <div><span className="dashes">{'---'}</span></div>
            <div><span className="k">title:</span> <span className="str">"El verdadero ROI de migrar a microservicios"</span></div>
            <div><span className="k">date:</span> <span className="accent">2026-05-14</span></div>
            <div><span className="k">reading_time:</span> <span className="accent">12</span> min</div>
            <div><span className="k">categories:</span> [<span className="str">"roi"</span>, <span className="str">"arquitectura"</span>, <span className="str">"liderazgo"</span>]</div>
            <div><span className="k">tags:</span> [<span className="str">"microservicios"</span>, <span className="str">"costo"</span>, <span className="str">"liderazgo-tecnico"</span>]</div>
            <div><span className="k">image:</span> <span className="str">"/img/roi-microservicios.webp"</span></div>
            <div><span className="dashes">{'---'}</span></div>
          </div>
          <h1 className="reader-title">El verdadero ROI de migrar a microservicios</h1>
        </div>

        <figure className="reader-figure">
          <PostImage slug={post.image} />
          <figcaption>Cover · <span className="caption-accent">img/roi-microservicios.webp</span> — placeholder hasta proveer asset definitivo.</figcaption>
        </figure>

        <div className="reader-body">
          <p>Cuando una compañía decide partir su monolito, casi siempre el debate empieza por la arquitectura y termina por la cultura. <strong>El ROI verdadero no es técnico, es organizacional</strong>: es el costo de coordinación que ahorras (o que añades) al cambiar quién puede desplegar qué, y cuándo.</p>

          <p>En las tres migraciones que he liderado, el patrón ha sido idéntico. Los primeros tres meses son euforia. Los siguientes seis son resaca. El año dos es cuando finalmente sabes si tomaste una buena decisión, y para entonces ya es demasiado tarde para retractarte limpiamente.</p>

          <h2>Costos visibles y costos ocultos</h2>

          <p>Los costos visibles los conoces. Los ocultos son los que terminan haciendo o deshaciendo el cálculo:</p>

          <ul>
            <li>Tiempo perdido depurando fallos transversales que antes eran un stack trace.</li>
            <li>El coordination tax: la reunión que aparece cuando dos equipos deben sincronizar contratos.</li>
            <li>La curva de onboarding multiplicada por N servicios.</li>
            <li>La degradación silenciosa de la experiencia local del developer.</li>
          </ul>

          <p>Para cuantificar esto usamos un proxy crudo pero útil: <strong>cycle time entre commits que tocan más de un servicio</strong>.</p>

          <pre><code><span className="tk-com"># proxy de acoplamiento residual</span>{"\n"}<span className="tk-key">def</span> <span className="tk-fn">coupling_proxy</span>(commits, window=<span className="tk-str">"90d"</span>):{"\n"}    cross = [c <span className="tk-key">for</span> c <span className="tk-key">in</span> commits <span className="tk-key">if</span> len(c.services) &gt; <span className="tk-str">1</span>]{"\n"}    <span className="tk-key">return</span> median(c.merge_to_deploy <span className="tk-key">for</span> c <span className="tk-key">in</span> cross){"\n\n"}<span className="tk-prompt">$ </span>python coupling.py --since 90d{"\n"}<span className="tk-com"># median: 4.2d  (↑ 38% vs prev quarter)</span></code></pre>

          <blockquote>Si tu migración a microservicios no reduce el cycle time cross-team a los 18 meses, no migraste — federaste el problema.</blockquote>

          <p>El cálculo de ROI honesto incluye una variable que casi nadie modela: <strong>la opcionalidad</strong>. Microservicios bien hechos te dan opciones futuras (escalar, reemplazar, vender un módulo) que un monolito no.</p>
        </div>
      </div>
      <TFoot />
    </div>
  );
}

function TerminalCategory() {
  // Filter: posts whose categories array includes 'infraestructura'
  const slug = 'infraestructura';
  const posts = window.BLOG_POSTS.filter(p => p.categories.includes(slug));
  const cat = window.BLOG_CATEGORIES.find(c => c.slug === slug);
  return (
    <div className="v-terminal" style={{minHeight: '100%'}}>
      <TTopBar />
      <div className="cat-head">
        <div className="crumb">~<span className="slash">/</span>aboneto.dev<span className="slash">/</span>categories<span className="slash">/</span><span className="accent">{slug}</span></div>
        <h1><span className="hash">#</span>{slug}</h1>
        <div className="stats">
          <span><span className="k">posts:</span>{cat.count}</span>
          <span><span className="k">last_update:</span>2026-05-02</span>
          <span><span className="k">avg_read:</span>~10min</span>
        </div>
      </div>
      <div className="latest" style={{paddingTop: 48}}>
        <div className="section-head">
          <h2><span className="punct">{'//'}</span> <span className="accent">all posts</span> <span className="punct">— ordered by date desc</span></h2>
          <a className="more" href="#">sort by reading_time →</a>
        </div>
        {posts.map((p, i) => (
          <div className="post-row" key={p.id}>
            <span className="num">[{String(i + 1).padStart(2, '0')}]</span>
            <span className="date">{p.date.replace(/ /g, '·')}</span>
            <div className="thumb"><PostImage slug={p.image} /></div>
            <div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
            </div>
            <span className="rt">~{p.readingTime}min</span>
          </div>
        ))}
      </div>
      <TFoot />
    </div>
  );
}

function TerminalArchive() {
  return (
    <div className="v-terminal" style={{minHeight: '100%'}}>
      <TTopBar />
      <div className="cat-head" style={{paddingBottom: 32}}>
        <div className="crumb">~<span className="slash">/</span>aboneto.dev<span className="slash">/</span><span className="accent">archivo</span></div>
        <h1><span className="hash">$ </span>find . -type post</h1>
        <div className="stats">
          <span><span className="k">total:</span>60 posts</span>
          <span><span className="k">since:</span>2022-11</span>
          <span><span className="k">categories:</span>6</span>
        </div>
      </div>
      <div style={{padding: '40px 56px 80px'}}>
        <div className="search-bar">
          <span className="prompt">/</span>
          <input placeholder="grep -i 'arquitectura|observabilidad|…'" />
          <span className="kbd">⌘K</span>
        </div>

        <div className="filter-row">
          <span className="chip active">todos · 60</span>
          {window.BLOG_CATEGORIES.map(c => (
            <span className="chip" key={c.slug}>#{c.slug} · {c.count}</span>
          ))}
        </div>

        <div className="archive-list">
          {window.BLOG_POSTS.map(p => (
            <div className="archive-row" key={p.id}>
              <span className="date">{p.date}</span>
              <h3>{p.title}</h3>
              <span className="rt">~{p.readingTime}min</span>
            </div>
          ))}
          <div className="archive-row" style={{opacity: 0.55}}>
            <span className="date">04 dic 2025</span>
            <h3>Por qué dejé de usar gRPC en el borde</h3>
            <span className="rt">~8min</span>
          </div>
          <div className="archive-row" style={{opacity: 0.35}}>
            <span className="date">21 nov 2025</span>
            <h3>El framework que reemplacé por 40 líneas de código</h3>
            <span className="rt">~6min</span>
          </div>
        </div>
      </div>
      <TFoot />
    </div>
  );
}

function TerminalMenu() {
  const recent = window.BLOG_POSTS.slice(0, 4);
  return (
    <div className="v-terminal" style={{minHeight: '100%', position: 'relative'}}>
      <TTopBar />
      <div style={{padding: '64px 56px', opacity: 0.12}}>
        <h1 style={{fontSize: 64, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 600, maxWidth: '18ch', margin: 0}}>
          <span style={{color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace'}}>&gt;_</span> El verdadero ROI de migrar a microservicios
        </h1>
      </div>

      <div className="overlay">
        <div className="overlay-head">
          <div className="wordmark" style={{fontSize: 13}}>
            <span className="prompt">$</span> <span>cd</span> <span className="path">~/aboneto.dev</span>
          </div>
          <button className="overlay-close">[esc]</button>
        </div>
        <div className="overlay-prompt">
          <span>$</span> <span className="cmd">ls -la categories/</span><span className="cursor"></span>
        </div>

        <div className="overlay-body">
          <div className="overlay-nav">
            <div className="nav-label">// 6 directorios · ordenados por volumen</div>
            {window.BLOG_CATEGORIES.map((c, i) => (
              <a key={c.slug} href="#" className="nav-item">
                <span className="nav-num">{String(i + 1).padStart(2, '0')}.</span>
                <span>
                  <div className="nav-title">{c.name}</div>
                </span>
                <span className="nav-count">{c.count} posts · ~{Math.round(c.count * 9)}min total</span>
              </a>
            ))}
          </div>
          <div className="overlay-side">
            <div className="side-label">// recent_posts · últimas 4</div>
            {recent.map(p => (
              <div className="it" key={p.id}>
                <div className="t">{p.title}</div>
                <div className="m">{p.date} · ~{p.readingTime}min</div>
              </div>
            ))}
            <div style={{marginTop: 28, fontSize: 12, color: 'var(--ink-mute)'}}>
              <a href="#" style={{color: 'var(--accent)', textDecoration: 'none'}}>$ cat archive.md →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  TerminalHome, TerminalPost, TerminalCategory, TerminalArchive, TerminalMenu,
});
