import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products.json'
import useCartStore from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const addItem = useCartStore(s => s.addItem)

  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    setSelectedSize(null)
    setActiveImage(0)
    setTimeout(() => setVisible(true), 100)
    window.scrollTo(0, 0)
  }, [id])

  if (!product) return (
    <div className="text-center py-40 text-stone-400 text-sm">Producto no encontrado</div>
  )

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className="transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <div className="flex gap-2 text-xs text-stone-400 mb-10">
          <Link to="/" className="hover:text-stone-800 transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-stone-800 transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-stone-600">{product.name}</span>
        </div>

        {/* Producto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Imágenes */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === i ? 'border-stone-800 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] overflow-hidden bg-stone-100">
              <img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ animation: 'fadeIn .4s ease' }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs text-stone-400 uppercase tracking-widest mb-3 capitalize">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl font-light text-stone-800 mb-4">{product.name}</h1>
            <p className="text-2xl text-stone-700 mb-2">
              ${product.price.toLocaleString('es-AR')}
            </p>
            <p className="text-xs text-stone-400 mb-8">IVA incluido · Envío a todo el país</p>

            <div className="w-12 h-px bg-stone-200 mb-8" />

            <p className="text-stone-500 text-sm leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Talles */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs uppercase tracking-widest text-stone-400">
                  Talle {selectedSize && <span className="text-stone-700">— {selectedSize}</span>}
                </p>
                <button className="text-xs text-stone-400 underline hover:text-stone-700 transition-colors">
                  Guía de talles
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs tracking-widest border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-stone-800 text-white border-stone-800'
                        : 'border-stone-300 text-stone-600 hover:border-stone-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-stone-400 mt-2">Seleccioná un talle para continuar</p>
              )}
            </div>

            {/* Botón */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={`w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 ${
                added
                  ? 'bg-stone-500 text-white'
                  : selectedSize
                  ? 'bg-stone-800 text-white hover:bg-stone-700'
                  : 'bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
            >
              {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </button>

            {/* Info extra */}
            <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-8">
              <p className="text-xs text-stone-400 flex gap-2">
                <span>↩</span> Cambios y devoluciones en 30 días
              </p>
              <p className="text-xs text-stone-400 flex gap-2">
                <span>✦</span> Pago seguro con tarjeta o transferencia
              </p>
              <p className="text-xs text-stone-400 flex gap-2">
                <span>◎</span> Envío gratis en compras mayores a $50.000
              </p>
            </div>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-28">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[.3em] uppercase text-stone-400 mb-3">Seguí explorando</p>
              <h2 className="font-serif text-2xl font-light tracking-widest text-stone-800">
                También te puede gustar
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map(p => (
                <Link to={`/producto/${p.id}`} key={p.id} className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-sm text-stone-800 font-medium">{p.name}</p>
                  <p className="text-sm text-stone-400 mt-1">
                    ${p.price.toLocaleString('es-AR')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  )
}

export default ProductDetail