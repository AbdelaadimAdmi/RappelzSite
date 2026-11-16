import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ChevronDown, Menu, Play, ShoppingBag } from 'lucide-react'
import './App.css'

const chapters = [
  { eyebrow: 'Placeholder', title: 'Placeholder', quote: 'Placeholder', image: 'https://artfiles.alphacoders.com/122/thumb-1920-122342.jpg' },
  { eyebrow: 'Placeholder', title: 'Placeholder', quote: 'Placeholder', image: 'https://images8.alphacoders.com/376/thumb-1920-376901.jpg' },
  { eyebrow: 'Placeholder', title: 'Placeholder', quote: 'Placeholder', image: 'https://s1.pearlcdn.com/NAEU/Upload/Community/5b8a71e4ff120231017091458587.jpg' },
]

const navItems = [
  { label: 'Home', links: [['Overview', '#top'], ['Enter the realm', '#world']] },
  { label: 'The world', links: [['Placeholder', '#world'], ['Placeholder', '#world-image']] },
  { label: 'Champions', links: [['Placeholder', '#heroes'], ['Placeholder', '#heroes'], ['Placeholder', '#heroes'], ['Placeholder', '#heroes']] },
  { label: 'Chronicles', links: [['Placeholder', '#news'], ['Placeholder', '#news']] },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    let previousY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const currentY = window.scrollY
      if (currentY < 80) {
        setShowHeader(true)
      } else if (Math.abs(currentY - previousY) > 4) {
        setShowHeader(currentY < previousY)
        setMenuOpen(false)
        setOpenDropdown(null)
      }
      previousY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`topbar${showHeader ? '' : ' topbar-hidden'}`}>
        <a className="brand" href="#top" aria-label="Eldritch home"><span className="brand-mark">E</span><span>Placeholder<small>Placeholder</small></span></a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          {navItems.map((item) => <div className="nav-item" key={item.label}>
            <button className={openDropdown === item.label ? 'nav-trigger current' : 'nav-trigger'} aria-expanded={openDropdown === item.label} onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}>{item.label}<ChevronDown size={12}/></button>
            <div className={openDropdown === item.label ? 'dropdown dropdown-open' : 'dropdown'}>
              {item.links.map(([label, href]) => <a href={href} key={label} onClick={() => { setOpenDropdown(null); setMenuOpen(false) }}>{label}</a>)}
            </div>
          </div>)}
        </nav>
        <div className="header-actions"><a className="shop-link" href="#world"><ShoppingBag size={16} strokeWidth={1.5}/> <span>Shop</span></a><a className="outline-button" href="#world">PLAY NOW <ArrowRight size={14}/></a></div>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu/></button>
    </header>
  )
}

function App() {
  const [active, setActive] = useState(0)
  const chapter = chapters[active]
  const move = (direction) => setActive((active + direction + chapters.length) % chapters.length)

  return (
    <main>
      <Navbar />

      <section className="hero" id="top" style={{ '--hero-image': `url("${chapter.image}")` }}>
        <div className="hero-grain"/><div className="hero-shade"/>
        <div className="hero-copy" key={active}>
          <p className="eyebrow"><span/> {chapter.eyebrow} <span/></p>
          <h1>{chapter.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-quote">{chapter.quote}</p>
          <a className="gold-button" href="#world"><span>Placeholder</span><ArrowRight size={16}/></a>
        </div>
        <a href="#world" className="scroll-cue"><span>SCROLL </span><ArrowDown size={14}/></a>
        <div className="slider-controls"><button aria-label="Previous story" onClick={() => move(-1)}><ArrowLeft size={16}/></button><div className="slide-count"><b>0{active + 1}</b><span/>0{chapters.length}</div><button aria-label="Next story" onClick={() => move(1)}><ArrowRight size={16}/></button></div>
        <div className="hero-caption">Placeholder <span>·</span> Placeholder</div>
      </section>

      <section className="intro section" id="world">
        <div className="section-label"><span>01</span><i/> Placeholder</div>
        <div className="intro-content"><div><p className="eyebrow muted">Placeholder</p><h2>Placeholder<br/><em>Placeholder</em></h2></div><div className="intro-text"><p>Placeholder</p><a className="text-link" href="#heroes">Placeholder <ArrowRight size={14}/></a></div></div>
        <div className="ornament">✳</div>
      </section>

      

      <section className="world-image" id="world-image" aria-label="An ancient fantasy realm"><div className="image-overlay"/>Test<div className="image-note"><span>Placeholder</span><i/> Placeholder</div></section>
{/* Fix this shit */}
      <section className="heroes section" id="heroes">
        <div className="section-label"><span>02</span><i/> Placeholder</div>
        <div className="heroes-heading"><div><p className="eyebrow muted">Placeholder</p><h2>Placeholder<br/><em>Placeholder</em></h2></div><p>Placeholder<br/>Placeholder</p></div>
        <div className="class-grid">
          {[
            ['01', 'Title1', 'Description', 'https://artfiles.alphacoders.com/122/thumb-1920-122342.jpg'],
            ['02', 'Title2', 'Description', 'https://images8.alphacoders.com/376/thumb-1920-376901.jpg'],
            ['03', 'Titile3', 'Description', 'https://s1.pearlcdn.com/NAEU/Upload/Community/5b8a71e4ff120231017091458587.jpg'],
          ].map(([number, name, desc, image]) => <a className="class-card" href="#news" key={name} style={{ '--card-image': `url("${image}")` }}><span className="class-number">{number}</span><div><h3>{name}</h3><p>{desc}</p><span className="card-arrow"><ArrowRight size={15}/></span></div></a>)}
        </div>
      </section>

      <section className="story-band" id="news"><div className="story-content"><p className="eyebrow">Placeholder</p><h2>Placeholder<br/>Placeholder <em>Placeholder.</em></h2><a href="#top" className="gold-button"><Play size={13} fill="currentColor"/><span>TRAILER</span></a></div></section>
      
      <footer><a className="brand" href="#top"><span className="brand-mark">E</span><span>Placeholder<small>Placeholder</small></span></a><p>© 2026 Copyright.</p><div><a href="#world">INSTAGRAM</a><a href="#world">DISCORD</a><a href="#world">TWITCH</a></div></footer>
    </main>
  )
}

export default App
