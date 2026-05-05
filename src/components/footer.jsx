import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">

        <div>
          <p className="font-serif text-2xl font-light tracking-widest text-white mb-4">ÉLAN</p>
          <p className="text-sm leading-relaxed">
            Moda consciente para la mujer moderna. Prendas atemporales, calidad premium.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">Navegación</p>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm hover:text-white transition-colors">Inicio</Link>
            <Link to="/catalogo" className="text-sm hover:text-white transition-colors">Catálogo</Link>
            <Link to="/carrito" className="text-sm hover:text-white transition-colors">Carrito</Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">Contacto</p>
          <div className="flex flex-col gap-2 text-sm">
            <p>hola@elan.com.ar</p>
            <p>+54 9 351 0000-0000</p>
            <p>Córdoba, Argentina</p>
          </div>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>

      </div>
      <div className="border-t border-stone-800 py-6 text-center">
        <p className="text-xs text-stone-600">© 2026 ÉLAN. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer