import type { Producto } from '../types/Producto'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

interface Props {
  producto: Producto
}

export default function ProductoCard({
  producto,
}: Props) {

  const { addToCart } = useCart()

  const stockBajo =
  producto.stock > 0 &&
  (
    producto.tipo_producto === 'pequeno'
      ? producto.stock < 15
      : producto.stock < 3
  )

  const sinStock =
    producto.stock <= 0

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 40
      }}

      whileInView={{
        opacity: 1,
        y: 0
      }}

      viewport={{
        once: true
      }}

      transition={{
        duration: 0.4
      }}

      whileHover={{
        y: -10,
        scale: 1.02
      }}

      className="
      bg-white/95
      backdrop-blur-sm
      rounded-2xl
      overflow-hidden
      shadow-md
      max-w-[320px]
      w-full
      "
      >

      <div className="relative">

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="
          h-72
          w-full
          object-contain
          bg-gray-100
          "
        />

        {sinStock && (

          <span
            className="
            absolute
            top-3
            right-3
            bg-red-600
            text-white
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
            "
          >
            Sin Stock
          </span>

        )}

        {stockBajo && (

          <span
            className="
            absolute
            top-3
            right-3
            bg-yellow-500
            text-white
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
            "
          >
            Stock Bajo
          </span>

        )}

      </div>

      <div className="p-5">

        <h2
          className="
          text-lg
          font-bold
          text-[#002E50]
          line-clamp-2
          "
        >
          {producto.nombre}
        </h2>

        <div className="mt-4">

          <p
            className="
            text-3xl
            font-bold
            text-[#F2762E]
            "
          >
            Bs. {producto.precio}
          </p>

        </div>

        <div className="mt-4">

          <p
            className="
            text-sm
            text-gray-500
            "
          >
            Disponibilidad
          </p>

          <p
            className={`
            font-semibold

            ${
              producto.stock <= 0
                ? 'text-red-600'
                : (
                    producto.tipo_producto === 'pequeno'
                      ? producto.stock < 15
                      : producto.stock < 3
                  )
                ? 'text-yellow-600'
                : 'text-green-600'
            }
          `}
          >
            {producto.stock} unidades
          </p>

        </div>

        <button

          disabled={
            producto.stock <= 0
          }

          onClick={() =>
            addToCart(
              producto
            )
          }

          className={`
            w-full
            mt-5
            py-3
            rounded-xl
            font-bold
            transition

            ${
              producto.stock > 0
                ? `
                  bg-[#F28A2E]
                  hover:bg-[#F2762E]
                  text-white
                `
                : `
                  bg-gray-300
                  text-gray-500
                  cursor-not-allowed
                `
            }
          `}
        >

          {producto.stock > 0
            ? 'Agregar al carrito'
            : 'Sin stock'}

        </button>

      </div>

    </motion.div>

  )

}