import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Ubicacion from './pages/Ubicacion'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Productos from './pages/Productos'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (

    <div
      className="
      min-h-screen
      bg-[#F2F2F2]
      "
    >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-panel-2026"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>

  )
}