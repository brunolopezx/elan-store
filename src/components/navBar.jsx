import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Navbar() {
  const count = useCartStore(s => s.getCount())

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-serif tracking-widest text-stone-800">
            ÉLAN
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/catalogo" className="text-sm text-stone-500 hover:text-stone-800 transition-colors">
            Catálogo
          </Link>
          <Link to="/carrito" className="relative text-sm text-stone-500 hover:text-stone-800 transition-colors">
            Carrito
            {count > 0 && (
              <span className="absolute -top-2 -right-4 bg-stone-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar