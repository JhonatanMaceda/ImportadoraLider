import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {

  return (

    <section
      className="
      bg-gradient-to-r
      from-[#002E50]
      to-[#32738C]
      text-white
      py-32
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        text-center
        "
      >

        <motion.h1
        initial={{
        opacity:0,
        y:-40
        }}

        animate={{
        opacity:1,
        y:0
        }}

        transition={{
        duration:0.8
        }}

        className="
        text-6xl
        font-bold
        "
        >
        Importadora Lider
        </motion.h1>

        <p
          className="
          text-xl
          mt-6
          "
        >
          Productos importados
          al mejor precio
        </p>

        <motion.div
        initial={{
        opacity:0
        }}

        animate={{
        opacity:1
        }}

        transition={{
        delay:0.5
        }}

        ></motion.div>

        <Link
          to="/catalogo"
          className="
          mt-8
          inline-block
          bg-[#F28A2E]
          px-8
          py-4
          rounded-lg
          "
        >
          Ver Catálogo
        </Link>

      </div>

    </section>

  )

}