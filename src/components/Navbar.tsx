import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

import logo from '../assets/logo.png'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <motion.nav
    initial={{
    y:-50,
    opacity:0
    }}

    animate={{
    y:0,
    opacity:1
    }}

    transition={{
    duration:0.5
    }}

    className="
    bg-[#002E50]
    text-white
    shadow-lg
    sticky
    top-0
    z-50
    " 
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-3
        flex
        items-center
        justify-between
        "
      >

        <Link
          to="/"
          className="
          flex
          items-center
          gap-3
          "
        >

          <img
            src={logo}
            alt="Importadora Lider"
            className="
            h-16
            w-16
            rounded-full
            object-cover
            border-2
            border-[#F28A2E]
            shadow-lg
            "
          />

          <div>

            <h1
              className="
              text-2xl
              font-bold
              "
            >
              Importadora Lider
            </h1>

            <p
              className="
              text-xs
              text-gray-300
              "
            >
              Productos Importados
            </p>

          </div>

        </Link>

        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          "
        >

          <Link
            to="/"
            className="
            text-white
            font-medium
            hover:text-[#F28A2E]
            transition-all
            duration-300
            "
          >
            Inicio
          </Link>

          <Link
            to="/catalogo"
            className="
            text-white
            font-medium
            hover:text-[#F28A2E]
            transition-all
            duration-300
            "
          >
            Catálogo
          </Link>

          <Link
            to="/ubicacion"
            className="
            text-white
            font-medium
            hover:text-[#F28A2E]
            transition-all
            duration-300
            "
          >
            Ubicación
          </Link>

        </div>

        <Link
          to="/carrito"
          className="
          relative
          hover:text-[#F28A2E]
          transition
          "
        >
          <FaShoppingCart size={28} />

          {totalItems > 0 && (

            <span
              className="
              absolute
              -top-2
              -right-3
              bg-[#F2762E]
              text-white
              text-xs
              rounded-full
              px-2
              py-0.5
              font-bold
              "
            >
              {totalItems}
            </span>

          )}

        </Link>

      </div>

    </motion.nav>
  )
}