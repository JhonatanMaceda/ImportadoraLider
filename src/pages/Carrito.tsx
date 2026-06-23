import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useCart } from '../context/CartContext'

import { Link } from 'react-router-dom'

export default function Carrito() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart()

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
              mb-2
              "
            >
              Carrito de Compras
            </h1>

            <p className="text-white/80">
              Revisa tus productos antes de finalizar el pedido.
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

          {cart.length === 0 ? (

            <div
              className="
              bg-white
              rounded-2xl
              shadow-lg
              p-10
              text-center
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-4
                "
              >
                Tu carrito está vacío
              </h2>

              <Link
                to="/catalogo"
                className="
                inline-block
                bg-[#F2762E]
                text-white
                px-6
                py-3
                rounded-xl
                hover:opacity-90
                transition
                "
              >
                Ver catálogo
              </Link>

            </div>

          ) : (

            <div
              className="
              grid
              lg:grid-cols-3
              gap-8
              "
            >

              <div className="lg:col-span-2 space-y-5">

                {cart.map(item => (

                  <div
                    className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-5
                    flex
                    flex-col
                    md:flex-row
                    gap-5
                    hover:shadow-xl
                    transition
                    "
                  >

                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="
                      w-full
                      max-w-[250px]
                      h-auto
                      mx-auto
                      md:w-28
                      md:h-28
                      object-cover
                      rounded-xl
                      border
                      "
                    />

                    <div className="flex-1">

                      <h2
                        className="
                        text-xl
                        font-bold
                        text-[#002E50]
                        "
                      >
                        {item.nombre}
                      </h2>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        mt-1
                        "
                      >
                        Stock disponible: {item.stock}
                      </p>

                      <p
                        className="
                        text-[#F2762E]
                        font-bold
                        text-lg
                        mt-2
                        "
                      >
                        Bs. {item.precio}
                      </p>

                      <p className="text-gray-500">
                        Subtotal:
                        {' '}
                        Bs.
                        {' '}
                        {(item.precio * item.cantidad).toFixed(2)}
                      </p>

                    </div>

                    <div
                      className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                      "
                    >

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-gray-200
                        hover:bg-gray-300
                        "
                      >
                        -
                      </button>

                      <span
                        className="
                        font-bold
                        text-lg
                        min-w-[30px]
                        text-center
                        "
                      >
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#32738C]
                        text-white
                        "
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="
                      w-full
                      md:w-auto
                      bg-red-500
                      text-white
                      px-4
                      py-3
                      rounded-xl
                      hover:bg-red-600
                      "
                    >
                      Eliminar
                    </button>

                  </div>

                ))}

              </div>

              <div>

                <div
                  className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-6
                  sticky
                  top-6
                  "
                >

                  <h2
                    className="
                    text-2xl
                    font-bold
                    mb-6
                    "
                  >
                    Resumen
                  </h2>

                  <div
                    className="
                    flex
                    justify-between
                    mb-4
                    "
                  >
                    <span>Productos</span>

                    <span>
                      {cart.length}
                    </span>
                  </div>

                  <div
                    className="
                    flex
                    justify-between
                    text-2xl
                    font-bold
                    border-t
                    pt-4
                    "
                  >
                    <span>Total</span>

                    <span
                      className="
                      text-[#F2762E]
                      "
                    >
                      Bs. {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="
                    block
                    text-center
                    mt-6
                    bg-green-600
                    text-white
                    py-4
                    rounded-xl
                    font-bold
                    hover:bg-green-700
                    "
                  >
                    Finalizar Pedido
                  </Link>

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