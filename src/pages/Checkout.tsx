import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

import { supabase } from '../services/supabase'

export default function Checkout() {

  const {
    cart,
    totalPrice,
    clearCart
  } = useCart()

  const [cliente, setCliente] =
    useState('')

  const [telefono, setTelefono] =
    useState('')

  const [latitud, setLatitud] = useState<number | null>(null)

  const [longitud, setLongitud] = useState<number | null>(null)

  const [obteniendoUbicacion, setObteniendoUbicacion] =
    useState(false)

  const [codigoPedido, setCodigoPedido] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function obtenerUbicacion() {

    if (!navigator.geolocation) {

      alert("Tu navegador no soporta geolocalización")

      return

    }

    setObteniendoUbicacion(true)

    navigator.geolocation.getCurrentPosition(

      posicion => {

        setLatitud(posicion.coords.latitude)

        setLongitud(posicion.coords.longitude)

        setObteniendoUbicacion(false)

      },

      () => {

        alert("No se pudo obtener tu ubicación")

        setObteniendoUbicacion(false)

      },

      {

        enableHighAccuracy: true

      }

    )

  }

  async function finalizarPedido() {

    if (
      !cliente.trim() ||
      !telefono.trim() ||
      latitud === null ||
      longitud === null
    ) {
      alert("Completa todos los campos y comparte tu ubicación.")
      return
    }

    if (cart.length === 0) return

    setLoading(true)

    const codigo =
      'IL-' +
      uuidv4()
        .slice(0, 6)
        .toUpperCase()

    const mapsUrl =
      `https://www.google.com/maps?q=${latitud},${longitud}`

    const { data: pedidoData, error } =
      await supabase
        .from('pedidos')
        .insert([
          {
            codigo,
            cliente,
            telefono,

            latitud,
            longitud,

            maps_url: mapsUrl,

            total: totalPrice,

            estado: 'Pendiente'
          }
        ])
        .select()
        .single()

    if (error) {

      console.error(error)

      setLoading(false)

      return
    }

    if (!pedidoData) {

      alert("No se pudo registrar el pedido.")

      setLoading(false)

      return

    }

    await Promise.all(
      cart.map(item =>
        supabase
          .from('detalle_pedido')
          .insert([
            {
              pedido_id: pedidoData.id,
              producto_id: item.id,
              cantidad: item.cantidad,
              subtotal: item.cantidad * item.precio
            }
          ])
      )
    )

    const detalleProductos =
      cart.map(item =>

        `• ${item.nombre}
    Cantidad: ${item.cantidad}
    Precio: Bs. ${item.precio}
    Subtotal: Bs. ${(item.precio * item.cantidad).toFixed(2)}
    `

      ).join('\n')

    const numero = "59168481834"

    const mensaje = `
    🛒 NUEVO PEDIDO

    ━━━━━━━━━━━━━━

    📦 Código:
    ${codigo}

    👤 Cliente:
    ${cliente}

    📞 Teléfono:
    ${telefono}

    📍 Ubicación:
    ${mapsUrl}

    ━━━━━━━━━━━━━━

    🛍 PRODUCTOS

    ${detalleProductos}

    ━━━━━━━━━━━━━━

    💰 TOTAL

    Bs. ${totalPrice.toFixed(2)}

    Gracias por su compra.
    `

    const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`

    window.open(url, "_blank")

    clearCart()

    setCodigoPedido(codigo)

    setLoading(false)

    }

  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      "
    >

      <Navbar />

      <main className="flex-1">

        <section
          className="
          bg-gradient-to-r
          from-[#002E50]
          to-[#32738C]
          text-white
          py-10
          "
        >
          <div className="max-w-7xl mx-auto px-6">

            <h1
              className="
              text-4xl
              font-bold
              "
            >
              Finalizar Pedido
            </h1>

            <p className="text-white/80 mt-2">
              Completa tus datos para confirmar la compra.
            </p>

          </div>
        </section>

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          py-10
          "
        >

          {codigoPedido ? (

            <div
              className="
              bg-green-100
              border
              border-green-300
              p-10
              rounded-2xl
              text-center
              "
            >

              <h2
                className="
                text-3xl
                font-bold
                text-green-700
                "
              >
                Pedido Registrado
              </h2>

              <p className="mt-4">
                Código de seguimiento
              </p>

              <p
                className="
                text-4xl
                font-bold
                mt-2
                "
              >
                {codigoPedido}
              </p>

            </div>

          ) : (

            <div
              className="
              grid
              lg:grid-cols-3
              gap-8
              "
            >

              <div
                className="
                lg:col-span-2
                bg-white
                rounded-2xl
                shadow-lg
                p-8
                "
              >

                <h2
                  className="
                  text-2xl
                  font-bold
                  mb-6
                  "
                >
                  Datos del Cliente
                </h2>

                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={cliente}
                  onChange={e =>
                    setCliente(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  mb-4
                  "
                />

                <input
                  type="text"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={e =>
                    setTelefono(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  p-4
                  rounded-xl
                  "
                />

                <div className="mb-6">

                  <button
                    type="button"
                    onClick={obtenerUbicacion}
                    disabled={obteniendoUbicacion}
                    className="
                      w-full
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >

                    {obteniendoUbicacion
                      ? "Obteniendo ubicación..."
                      : "📍 Compartir mi ubicación"}
                  </button>

                  {latitud && longitud && (

                    <div
                      className="
                        mt-4
                        bg-green-50
                        border
                        border-green-300
                        rounded-xl
                        p-4
                      "
                    >

                      <p className="text-green-700 font-semibold">
                        ✅ Ubicación obtenida correctamente
                      </p>

                      <a
                        href={`https://www.google.com/maps?q=${latitud},${longitud}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-block
                          mt-4
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-5
                          py-2
                          rounded-lg
                          font-semibold
                        "
                      >
                        🗺 Ver ubicación en Google Maps
                      </a>

                    </div>

                  )}

                </div>

              </div>

              <div>

                <div
                  className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-6
                  "
                >

                  <h2
                    className="
                    text-2xl
                    font-bold
                    mb-5
                    "
                  >
                    Resumen
                  </h2>

                  <div className="space-y-4">

                    {cart.map(item => (

                      <div
                        key={item.id}
                        className="
                        flex
                        justify-between
                        text-sm
                        "
                      >

                        <div>

                          <p className="font-semibold">
                            {item.nombre}
                          </p>

                          <p>
                            x{item.cantidad}
                          </p>

                        </div>

                        <p>
                          Bs.
                          {' '}
                          {(item.precio * item.cantidad).toFixed(2)}
                        </p>

                      </div>

                    ))}

                  </div>

                  <div
                    className="
                    border-t
                    mt-6
                    pt-4
                    "
                  >

                    <div
                      className="
                      flex
                      justify-between
                      text-2xl
                      font-bold
                      "
                    >
                      <span>Total</span>

                      <span
                        className="
                        text-[#F2762E]
                        "
                      >
                        Bs.
                        {' '}
                        {totalPrice.toFixed(2)}
                      </span>

                    </div>

                  </div>

                  <button
                    onClick={
                      finalizarPedido
                    }
                    disabled={loading}
                    className="
                    w-full
                    mt-6
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    py-4
                    rounded-xl
                    font-bold
                    "
                  >
                    {loading
                      ? 'Procesando...'
                      : 'Confirmar y Enviar a WhatsApp'}
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

      <Footer />

    </div>
  )
}