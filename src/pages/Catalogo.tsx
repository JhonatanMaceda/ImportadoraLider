import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { supabase } from '../services/supabase'

import type { Producto } from '../types/Producto'

import Navbar from '../components/Navbar'
import ProductoCard from '../components/ProductoCard'
import Footer from '../components/Footer'

export default function Catalogo() {

  const [productos, setProductos] =
    useState<Producto[]>([])

  const [loading, setLoading] =
    useState(true)

  const [busqueda, setBusqueda] =
    useState('')

  const [filtroStock, setFiltroStock] =
    useState('todos')

  useEffect(() => {

    obtenerProductos()

  }, [])

  async function obtenerProductos() {

    const { data, error } =
      await supabase
        .from('productos')
        .select('*')

    if (error) {

      console.error(error)

    } else {

      setProductos(
        data as Producto[]
      )

    }

    setLoading(false)
  }

  const productosFiltrados =
    productos.filter(
      producto => {

        const coincideNombre =
          producto.nombre
            .toLowerCase()
            .includes(
              busqueda.toLowerCase()
            )

        if (
          filtroStock ===
          'sin-stock'
        ) {

          return (
            coincideNombre &&
            producto.stock <= 0
          )

        }

        if (
          filtroStock ===
          'con-stock'
        ) {

          return (
            coincideNombre &&
            producto.stock > 0
          )

        }

        if (
          filtroStock ===
          'stock-bajo'
        ) {

          return (
            coincideNombre &&
            producto.stock > 0 &&
            producto.stock < 5
          )

        }

        return coincideNombre

      }
    )

  if (loading) {

    return (
      <>
        <Navbar />

        <div
          className="
          min-h-screen
          flex
          justify-center
          items-center
          "
        >
          Cargando...
        </div>

        <Footer />
      </>
    )

  }

  return (
    <>
      <Navbar />

      <section
        className="
        bg-gradient-to-r
        from-[#002E50]
        to-[#32738C]
        text-white
        py-8
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          "
        >

          <h1
            className="
            text-5xl
            font-bold
            mb-3
            "
          >
            Catálogo
          </h1>

          <p
            className="
            text-lg
            "
          >
            Descubre nuestros productos importados
          </p>

          <p
            className="
            mt-3
            text-white/80
            "
          >
            {productos.length}
            {' '}
            productos disponibles
          </p>

        </div>

      </section>

      <section
        className="
        bg-slate-50
        min-h-screen
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          py-8
          "
        >

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-lg
            mb-8
            "
          >

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-4
              gap-4
              "
            >

              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                value={busqueda}
                onChange={e =>
                  setBusqueda(
                    e.target.value
                  )
                }
                className="
                md:col-span-3
                border
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-[#32738C]
                "
              />

              <select
                value={filtroStock}
                onChange={e =>
                  setFiltroStock(
                    e.target.value
                  )
                }
                className="
                border
                p-4
                rounded-xl
                "
              >

                <option value="todos">
                  Todos
                </option>

                <option value="con-stock">
                  Con stock
                </option>

                <option value="stock-bajo">
                  Stock bajo
                </option>

                <option value="sin-stock">
                  Sin stock
                </option>

              </select>

            </div>

            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mt-6
              "
            >

              <div
                className="
                bg-slate-50
                rounded-xl
                p-4
                text-center
                "
              >
                <p className="text-gray-500">
                  Productos
                </p>

                <p
                  className="
                  text-2xl
                  font-bold
                  text-[#002E50]
                  "
                >
                  {productos.length}
                </p>
              </div>

              <div
                className="
                bg-slate-50
                rounded-xl
                p-4
                text-center
                "
              >
                <p className="text-gray-500">
                  Disponibles
                </p>

                <p
                  className="
                  text-2xl
                  font-bold
                  text-green-600
                  "
                >
                  {
                    productos.filter(
                      p => p.stock > 0
                    ).length
                  }
                </p>
              </div>

              <div
                className="
                bg-slate-50
                rounded-xl
                p-4
                text-center
                "
              >
                <p className="text-gray-500">
                  Stock Bajo
                </p>

                <p
                  className="
                  text-2xl
                  font-bold
                  text-orange-500
                  "
                >
                  {
                    productos.filter(
                      p =>
                        p.stock > 0 &&
                        (
                          p.tipo_producto === 'pequeno'
                            ? p.stock < 15
                            : p.stock < 3
                        )
                    ).length
                  }
                </p>
              </div>

              <div
                className="
                bg-slate-50
                rounded-xl
                p-4
                text-center
                "
              >
                <p className="text-gray-500">
                  Sin Stock
                </p>

                <p
                  className="
                  text-2xl
                  font-bold
                  text-red-500
                  "
                >
                  {
                    productos.filter(
                      p => p.stock <= 0
                    ).length
                  }
                </p>
              </div>

            </div>

          </div>

          <div
            className="
            flex
            justify-between
            items-center
            mb-8
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              text-[#002E50]
              "
            >
              Productos
            </h2>

            <span
              className="
              text-gray-600
              "
            >
              Mostrando
              {' '}
              {productosFiltrados.length}
              {' '}
              producto(s)
            </span>

          </div>

          {productosFiltrados.length === 0 ? (

            <div
              className="
              bg-yellow-100
              border
              border-yellow-300
              p-6
              rounded-xl
              "
            >
              No se encontraron productos.
            </div>

          ) : (

            <motion.div

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.5
              }}

              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-8
              "
            >

              {productosFiltrados.map(
                producto => (

                  <ProductoCard
                    key={producto.id}
                    producto={producto}
                  />

                )
              )}

            </motion.div>

          )}

        </div>

      </section>

      <Footer />
    </>
  )
}