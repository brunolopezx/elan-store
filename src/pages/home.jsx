import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'

function Home() {
  const featured = products.filter(p => p.featured)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div>

      {/* Hero */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-stone-200">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-stone-900/20" />
        <div
          className="relative z-10 text-center px-6 transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <p className="text-xs tracking-[.4em] text-white/80 mb-6 uppercase">Nueva colección 2026</p>
          <h1 className="font-serif text-8xl font-light tracking-widest text-white mb-6">ÉLAN</h1>
          <p className="text-white/70 mb-10 text-lg font-light font-serif italic">Moda consciente. Estilo atemporal.</p>
          <Link
            to="/catalogo"
            className="bg-white text-stone-800 text-xs tracking-widest uppercase px-12 py-4 hover:bg-stone-100 transition-colors"
          >
            Ver colección
          </Link>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[.3em] uppercase text-stone-400 mb-3">Selección especial</p>
          <h2 className="font-serif text-3xl font-light tracking-widest text-stone-800">
            Destacados
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <Link to={`/producto/${product.id}`} key={product.id} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4 relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
              </div>
              <p className="text-sm text-stone-800 font-medium">{product.name}</p>
              <p className="text-sm text-stone-400 mt-1">
                ${product.price.toLocaleString('es-AR')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner intermedio */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="relative z-10 text-center px-6">
          <p className="font-serif text-3xl font-light tracking-widest text-white mb-6">
            Envíos a todo el país
          </p>
          <Link
            to="/catalogo"
            className="border border-white text-white text-xs tracking-widest uppercase px-10 py-3 hover:bg-white hover:text-stone-800 transition-colors"
          >
            Ver todo
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[.3em] uppercase text-stone-400 mb-3">Explorá</p>
          <h2 className="font-serif text-3xl font-light tracking-widest text-stone-800">
            Categorías
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['remeras', 'pantalones', 'vestidos', 'abrigos'].map(cat => (
            <Link
              key={cat}
              to={`/catalogo?categoria=${cat}`}
              className="group relative aspect-square overflow-hidden bg-stone-100"
            >
              <img
                src={products.find(p => p.category === cat)?.images[0]}
                alt={cat}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/50 transition-colors duration-300" />
              <p className="absolute bottom-4 left-0 right-0 text-center text-white text-xs uppercase tracking-widest capitalize">
                {cat}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home