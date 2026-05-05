import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Home from './pages/home'
import Catalog from './pages/catalog'
import ProductDetail from './pages/productDetail'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Footer from './components/footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer/>
      </main>
    </BrowserRouter>
  )
}

export default App