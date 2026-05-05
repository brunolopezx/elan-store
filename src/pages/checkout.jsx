import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Checkout() {
  const { items, getTotal, clearCart } = useCartStore()

  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '',
    direccion: '', ciudad: '', provincia: ''
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'Requerido'
    if (!form.email.trim()) newErrors.email = 'Requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido'
    if (!form.telefono.trim()) newErrors.telefono = 'Requerido'
    if (!form.direccion.trim()) newErrors.direccion = 'Requerido'
    if (!form.ciudad) newErrors.ciudad = 'Requerido'
    if (!form.provincia) newErrors.provincia = 'Requerido'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSuccess(true)
    clearCart()
  }

  if (items.length === 0 && !success) return (
    <div className="max-w-6xl mx-auto px-6 py-40 text-center">
      <p className="font-serif text-3xl font-light text-stone-800 mb-4">No tenés productos en el carrito</p>
      <p className="text-stone-400 text-sm mb-10">Explorá nuestra colección antes de continuar.</p>
      <Link
        to="/catalogo"
        className="text-xs tracking-widest uppercase border border-stone-800 px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors"
      >
        Ver catálogo
      </Link>
    </div>
  )

  if (success) return (
    <div className="max-w-xl mx-auto px-6 py-40 text-center">
      <div className="w-14 h-14 rounded-full bg-stone-800 text-white flex items-center justify-center text-lg mx-auto mb-8">
        ✓
      </div>
      <h2 className="font-serif text-4xl font-light tracking-widest text-stone-800 mb-4">¡Pedido confirmado!</h2>
      <p className="text-stone-500 text-sm mb-2">Gracias, <span className="text-stone-700">{form.nombre}</span>.</p>
      <p className="text-stone-400 text-sm mb-12">Te enviamos los detalles a <span className="text-stone-600">{form.email}</span></p>
      <Link
        to="/"
        className="text-xs tracking-widest uppercase border border-stone-800 px-10 py-4 hover:bg-stone-800 hover:text-white transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )

  const field = (name, label, placeholder, half = false) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="text-xs uppercase tracking-widest text-stone-400 block mb-2">{label}</label>
      <input
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={name === 'telefono' ? (e => {
          if (!/[\d\s+\-()]/.test(e.key) && !['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(e.key)) {
            e.preventDefault()
          }
        }) : undefined}
        className={`w-full border px-4 py-3 text-sm text-stone-700 outline-none transition-colors bg-white placeholder:text-stone-300 ${
          errors[name] ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-stone-800'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  )

  const selectField = (name, label, options, half = false) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="text-xs uppercase tracking-widest text-stone-400 block mb-2">{label}</label>
      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={`w-full border px-4 py-3 text-sm text-stone-700 outline-none transition-colors bg-white ${
          errors[name] ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-stone-800'
        }`}
      >
        <option value="">Seleccioná</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <div className="mb-10">
        <h1 className="font-serif text-4xl font-light tracking-widest text-stone-800 mb-2">Checkout</h1>
        <p className="text-stone-400 text-sm">Completá tus datos para finalizar la compra</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Formulario */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-6 pb-4 border-b border-stone-100">
            Datos de envío
          </p>
          <div className="grid grid-cols-2 gap-4">
            {field('nombre', 'Nombre completo', 'Ana García')}
            {field('email', 'Email', 'ana@email.com')}
            {field('telefono', 'Teléfono', '+54 9 11 0000-0000')}
            {field('direccion', 'Dirección', 'Av. Corrientes 1234')}
            {selectField('provincia', 'Provincia', [
              'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
              'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
              'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
              'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
              'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
            ], true)}
            {selectField('ciudad', 'Ciudad',
              form.provincia === 'CABA' ? ['CABA'] :
              form.provincia === 'Córdoba' ? ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto', 'Villa María', 'Río Tercero', 'Alta Gracia', 'Jesús María', 'Cosquín', 'La Falda', 'Bell Ville'] :
              form.provincia === 'Buenos Aires' ? ['La Plata', 'Mar del Plata', 'Quilmes', 'Lanús', 'Lomas de Zamora', 'Bahía Blanca', 'Tigre', 'Morón', 'San Isidro', 'Tandil'] :
              form.provincia === 'Santa Fe' ? ['Rosario', 'Santa Fe', 'Rafaela', 'Venado Tuerto', 'Villa Constitución'] :
              form.provincia === 'Mendoza' ? ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Luján de Cuyo', 'Maipú'] :
              form.provincia ? ['Capital'] : []
            , true)}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-stone-800 text-white text-xs tracking-widest uppercase py-4 mt-8 hover:bg-stone-700 transition-colors"
          >
            Confirmar pedido
          </button>

          <p className="text-xs text-stone-300 text-center mt-4">
            ✦ &nbsp; Pago seguro · Envíos a todo el país · Devoluciones en 30 días
          </p>
        </div>

        {/* Resumen */}
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-6 pb-4 border-b border-stone-100">
            Tu pedido
          </p>
          <div className="divide-y divide-stone-100">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 py-5">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-20 object-cover bg-stone-100 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-stone-800">{item.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">Talle: {item.size} · Cant: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-stone-600">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-5 mt-2">
            <div className="flex justify-between text-sm text-stone-500 mb-2">
              <span>Subtotal</span>
              <span>${getTotal().toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-500 mb-5">
              <span>Envío</span>
              <span className="text-stone-300">A calcular</span>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-4">
              <span className="text-sm text-stone-800">Total</span>
              <span className="text-lg text-stone-800">${getTotal().toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout