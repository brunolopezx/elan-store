import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import products from '../data/products.json'

const categories = ['todos', 'remeras', 'pantalones', 'vestidos', 'abrigos']

function Catalog() {
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('todos')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const cat = searchParams.get('categoria')
    if (cat && categories.includes(cat)) setActiveCategory(cat)
  }, [searchParams])

  const filtered = products
    .filter(p => activeCategory === 'todos' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return a.id - b.id
    })

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Encabezado */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-light tracking-widest text-stone-800 mb-2">Catálogo</h1>
        <p className="text-stone-400 text-sm">{filtered.length} productos</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-5 py-2 border tracking-widest uppercase transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-800 text-white border-stone-800'
                  : 'border-stone-300 text-stone-500 hover:border-stone-800 hover:text-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="text-xs border border-stone-300 text-stone-600 px-3 py-2 outline-none tracking-widest uppercase bg-white"
        >
          <option value="default">Ordenar</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
        </select>
      </div>

      {/* Grilla */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filtered.map(product => (
          <Link to={`/producto/${product.id}`} key={product.id} className="group">
            <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4 relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <img
                src={product.images[1]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-stone-800 font-medium">{product.name}</p>
                <p className="text-xs text-stone-400 capitalize mt-0.5">{product.category}</p>
              </div>
              <p className="text-sm text-stone-600">
                ${product.price.toLocaleString('es-AR')}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Catalog