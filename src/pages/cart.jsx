import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (items.length === 0) return (
    <div className="max-w-6xl mx-auto px-6 py-40 text-center">
      <p className="font-serif text-3xl font-light text-stone-800 mb-4">Tu carrito está vacío</p>
      <p className="text-stone-400 text-sm mb-10">Explorá nuestra colección y encontrá algo que te guste.</p>
      <Link
        to="/catalogo"
        className="text-xs tracking-widest uppercase border border-stone-800 px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors"
      >
        Ver catálogo
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="font-serif text-4xl font-light tracking-widest text-stone-800 mb-2">Carrito</h1>
        <p className="text-stone-400 text-sm">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-stone-100">
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} className="flex gap-6 py-8">
              <Link to={`/producto/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-32 object-cover bg-stone-100 hover:opacity-80 transition-opacity"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/producto/${item.id}`}>
                      <p className="text-sm font-medium text-stone-800 hover:text-stone-500 transition-colors">{item.name}</p>
                    </Link>
                    <p className="text-xs text-stone-400 mt-1 capitalize">{item.category}</p>
                    <p className="text-xs text-stone-400 mt-0.5">Talle: {item.size}</p>
                  </div>
                  <p className="text-sm text-stone-700">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-stone-200">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-stone-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-xs text-stone-300 hover:text-red-400 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-8 sticky top-24">
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-6">Resumen</p>
            <div className="flex justify-between text-sm text-stone-600 mb-3">
              <span>Subtotal</span>
              <span>${getTotal().toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600 mb-6">
              <span>Envío</span>
              <span className="text-stone-400">A calcular</span>
            </div>
            <div className="border-t border-stone-200 pt-6 mb-8">
              <div className="flex justify-between">
                <span className="text-sm text-stone-800">Total</span>
                <span className="text-xl text-stone-800">${getTotal().toLocaleString('es-AR')}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-stone-800 text-white text-xs tracking-widest uppercase text-center py-4 hover:bg-stone-700 transition-colors"
            >
              Finalizar compra
            </Link>
            <Link
              to="/catalogo"
              className="block w-full text-center text-xs text-stone-400 hover:text-stone-700 transition-colors mt-4 tracking-widest uppercase"
            >
              Seguir comprando
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart