import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { Toaster, toast } from 'react-hot-toast'

import './index.css'
import App from './App'

import { CartProvider } from './context/CartContext'

window.alert = (mensaje?: unknown) => {

  const texto = String(mensaje)

  const t = texto.toLowerCase()

  if (
    t.includes('correcto') ||
    t.includes('correctamente') ||
    t.includes('éxito') ||
    t.includes('exito') ||
    t.includes('registrado') ||
    t.includes('guardado') ||
    t.includes('agregado') ||
    t.includes('eliminado') ||
    t.includes('actualizado')
  ) {

    toast.success(texto)

    return

  }

  if (
    t.includes('advertencia') ||
    t.includes('stock') ||
    t.includes('atención') ||
    t.includes('atencion')
  ) {

    toast(texto, {
      icon: '⚠️'
    })

    return

  }

  toast.error(texto)

}

ReactDOM.createRoot(
  document.getElementById('root')!
).render(

  <React.StrictMode>

    <HashRouter>

      <CartProvider>

        <App />

        <Toaster

          position="top-right"

          reverseOrder={false}

          toastOptions={{

            duration: 3500,

            style: {

              background: '#002E50',

              color: '#fff',

              borderRadius: '14px',

              padding: '16px',

              fontSize: '15px'

            },

            success: {

              iconTheme: {

                primary: '#16a34a',

                secondary: '#fff'

              }

            },

            error: {

              iconTheme: {

                primary: '#dc2626',

                secondary: '#fff'

              }

            }

          }}

        />

      </CartProvider>

    </HashRouter>

  </React.StrictMode>

)