import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { supabase } from '../services/supabase'

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
  imagen: string
  precio_compra: number
  tipo_producto: string
}

export default function Productos() {
  const [productos, setProductos] =
    useState<Producto[]>([])

  const [tipoProducto, setTipoProducto] =
  useState('pequeno')

  const [nombre, setNombre] =
    useState('')

  const [precio, setPrecio] =
    useState('')

  const [stock, setStock] =
    useState('')

  const [imagen, setImagen] =
    useState<File | null>(null)

  const [loading, setLoading] =
    useState(false)

  const beneficioTotal =
  productos.reduce(
    (total, producto) =>
      total +
      (
        (
          producto.precio -
          producto.precio_compra
        ) *
        producto.stock
      ),
    0
  )

    const [busqueda,
    setBusqueda] =
    useState('')

  const productosFiltrados =
  productos.filter(
    producto =>
      producto.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
  )

  const [precioCompra, setPrecioCompra] =
  useState('')

  const [editandoId,
  setEditandoId] =
  useState<number | null>(
    null
  )

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    const { data, error } =
      await supabase
        .from('productos')
        .select('*')
        .order('id', {
          ascending: false,
        })

    if (error) {
      console.error(error)
      return
    }

    setProductos(
      (data as Producto[]) || []
    )
  }

  async function subirImagen() {

    const session =
      await supabase.auth.getSession()

    console.log(
      'SESSION COMPLETA:',
      session
    )

    const user =
      await supabase.auth.getUser()

    console.log(
      'USER:',
      user
    )




    if (!imagen) return null

    const nombreArchivo =
      uuidv4() +
      '-' +
      imagen.name

    console.log(
      'Subiendo imagen...'
    )

    const { error } =
      await supabase.storage
        .from('productos')
        .upload(
          nombreArchivo,
          imagen
        )

    if (error) {
      console.error(error)
      return null
    }

    const { data } =
      supabase.storage
        .from('productos')
        .getPublicUrl(
          nombreArchivo
        )

    console.log(
      data.publicUrl
    )
    
    return data.publicUrl
  }

  async function crearProducto() {
    if (
      !nombre ||
      !precioCompra||
      !precio ||
      !stock ||
      !imagen
    ) {
      alert(
        'Completa todos los campos'
      )

      return
    }

    setLoading(true)

    const imagenUrl =
      await subirImagen()

    if (!imagenUrl) {
      setLoading(false)
      return
    }

    const { error } =
      await supabase
        .from('productos')
        .insert([
          {
            nombre,
            precio_compra:
              Number(precioCompra),
            precio:
              Number(precio),
            stock:
              Number(stock),
            imagen:
              imagenUrl,
            tipo_producto:
              tipoProducto,
          },
        ])

    setLoading(false)

    if (error) {

      console.error(error)

      alert(
        JSON.stringify(
          error,
          null,
          2
        )
      )

      return

    }

    setNombre('')
    setPrecioCompra('')
    setPrecio('')
    setStock('')
    setImagen(null)

    await cargarProductos()

    alert(
      'Producto creado'
    )
  }

  async function eliminarProducto(
    id: number
  ) {
    const confirmar =
      confirm(
        '¿Eliminar producto?'
      )

    if (!confirmar) return

    const { error } =
      await supabase
        .from('productos')
        .delete()
        .eq('id', id)

    if (error) {
      console.error(error)

      alert(
        'Error al eliminar'
      )

      return
    }

    await cargarProductos()
  }

  function editarProducto(
    producto: Producto
    ) {

    setEditandoId(
        producto.id
    )

    setNombre(
        producto.nombre
    )

    setPrecioCompra(
        String(
        producto.precio_compra
        )
    )

    setPrecio(
        String(
        producto.precio
        )
    )

    setStock(
        String(
        producto.stock
        )
    )

    }

  async function actualizarProducto() {

      if (editandoId === null)
        return

      let nuevaImagenUrl: string | null = null

      if (imagen) {

        nuevaImagenUrl =
          await subirImagen()

        if (!nuevaImagenUrl)
          return

        const productoActual =
          productos.find(
            p => p.id === editandoId
          )

        if (productoActual) {

          try {

            const nombreArchivoViejo =
              productoActual.imagen
                .split('/')
                .pop()

            if (nombreArchivoViejo) {

              await supabase.storage
                .from('productos')
                .remove([
                  nombreArchivoViejo
                ])

            }

          } catch (error) {

            console.error(error)

          }

        }

      }

      const datosActualizar: any = {
        nombre,
        precio_compra:
          Number(precioCompra),
        precio:
          Number(precio),
        stock:
          Number(stock),
        tipo_producto:
          tipoProducto,
      }

      if (nuevaImagenUrl) {
        datosActualizar.imagen =
          nuevaImagenUrl
      }

      const { error } =
        await supabase
          .from('productos')
          .update(
            datosActualizar
          )
          .eq(
            'id',
            editandoId
          )

      if (error) {

        console.error(error)

        alert(
          JSON.stringify(
            error,
            null,
            2
          )
        )

        return

      }

      setEditandoId(null)

      setNombre('')
      setPrecioCompra('')
      setPrecio('')
      setStock('')
      setImagen(null)

      await cargarProductos()

      alert(
        'Producto actualizado'
      )

  }



  return (
    <div
      className="
      max-w-6xl
      mx-auto
      p-6
    "
    >
      <h1
        className="
        text-3xl
        font-bold
        mb-6
      "
      >
        Administrar Productos
      </h1>

      <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
          mb-8
          "
          >

          <div className="bg-blue-100 p-4 rounded-xl">
            <p>Productos</p>
            <h3 className="text-2xl font-bold">
              {productos.length}
            </h3>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <p>Beneficio</p>
            <h3 className="text-2xl font-bold">
              Bs. {beneficioTotal.toFixed(2)}
            </h3>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            <p>Stock Bajo</p>
            <h3 className="text-2xl font-bold">
              {
                productos.filter(
                  p =>
                    p.stock > 0 &&
                    p.stock < 5
                ).length
              }
            </h3>
          </div>

          <div className="bg-red-100 p-4 rounded-xl">
            <p>Sin Stock</p>
        <h3 className="text-2xl font-bold">
              {
                productos.filter(
                  p =>
                    p.stock <= 0
                ).length
              }
        </h3>
        </div>

      </div>

      <div className="mb-6">

    <input
    type="text"
    placeholder="Buscar producto..."

    value={busqueda}

    onChange={e =>
    setBusqueda(
    e.target.value
    )
    }

    className="
    w-full
    border
    p-3
    rounded-lg
    bg-white
    "
    />

    </div>

      <div
        className="
        bg-white
        p-6
        rounded-lg
        shadow
        mb-10
      "
      >
        <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
        >

        {editandoId
        ? 'Editando Producto'
        : 'Nuevo Producto'}

        </h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e =>
            setNombre(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          mb-4
        "
        />

        <input
            type="number"
            placeholder="Precio Compra"
            value={precioCompra}
            onChange={e =>
                setPrecioCompra(
                e.target.value
                )
            }
            className="
            w-full
            border
            p-3
            mb-4
            "
        />

        <select
          value={tipoProducto}
          onChange={e =>
            setTipoProducto(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
          "
        >
          <option value="pequeno">
            Producto Pequeño
          </option>

          <option value="grande">
            Producto Grande
          </option>
        </select>

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={e =>
            setPrecio(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          mb-4
        "
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={e =>
            setStock(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          mb-4
        "
        />

        <div className="mb-4">

          <label
            className="
            block
            font-semibold
            mb-2
            "
          >
            Imagen del producto
          </label>

          <label
            className="
            flex
            justify-center
            items-center
            h-36
            border-2
            border-dashed
            border-[#32738C]
            rounded-xl
            cursor-pointer
            hover:bg-slate-50
            transition
            "
          >

            <div className="text-center">

              <p className="font-semibold">
                📷 Seleccionar imagen
              </p>

              <p className="text-sm text-gray-500">
                JPG • PNG • WEBP
              </p>

              {imagen && (

                <p
                  className="
                  text-green-600
                  mt-2
                  "
                >
                  ✓ {imagen.name}
                </p>

              )}

            </div>



            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {

                if (
                  e.target.files
                ) {

                  setImagen(
                    e.target.files[0]
                  )

                }

              }}
            />

          </label>

        {imagen && (

                <div className="mb-4">

                  <p
                    className="
                    font-semibold
                    mb-2
                    "
                  >
                    Vista previa
                  </p>

                  <img
                    src={URL.createObjectURL(imagen)}
                    alt="preview"
                    className="
                    w-40
                    h-40
                    object-cover
                    rounded-xl
                    border
                    shadow
                    "
                  />

                </div>

          )}

        </div>

        <button
        onClick={() =>

            editandoId
            ? actualizarProducto()
            : crearProducto()

        }

        disabled={loading}

        className="
        bg-green-600
        text-white
        px-6
        py-3
        rounded
        "

        >
        {editandoId
            ? 'Actualizar Producto'
            : 'Guardar Producto'}
        </button>

        {editandoId && (
        <button
        onClick={() => {

        setEditandoId(
        null
        )

        setNombre('')
        setPrecioCompra('')
        setPrecio('')
        setStock('')
        setImagen(null)

        }}

        className="
        ml-4
        bg-gray-500
        text-white
        px-6
        py-3
        rounded
        "

        >

        Cancelar

        </button>

        )}
      </div>

      <p
        className="
        mb-3
        text-gray-600
        "
        >
        Mostrando:

        {productosFiltrados.length} 
        
        producto(s)
        </p>

      <div className="overflow-auto">

            <table
            className="
            w-full
            bg-white
            shadow
            rounded-lg
            "
            >

            <thead>

            <tr
              className="
              bg-slate-200
              "
            >

              <th className="p-3 text-center">
                Imagen
              </th>

              <th className="p-3text-center">
                Nombre
              </th>

              <th className="p-3 text-center">
                Compra
              </th>

              <th className="p-3 text-center">
                Venta
              </th>

              <th className="p-3 text-center">
                Ganancia
              </th>

              <th
                className="
                px-4
                py-3
                text-center
                "
              >
                Tipo
              </th>

              <th className="p-3 text-center">
                Stock
              </th>

              <th className="p-3" text-center>
                Acciones
              </th>

            </tr>

            </thead>

            <tbody>

            {productosFiltrados.map(
            producto => {

            const ganancia =
            producto.precio -
            producto.precio_compra

            return (

            <tr
            key={producto.id}
            className="
            border-t
            hover:bg-slate-50
            transition
            "
            >

            <td className="p-3">

            <img
            src={producto.imagen}
            alt={producto.nombre}
            className="
            w-20
            h-20
            object-cover
            rounded-xl
            border
            shadow-sm
            "
            />

            </td>

            <td className="p-3 text-center">
            {producto.nombre}
            </td>

            <td className="p-3 text-center">
            Bs. {producto.precio_compra}
            </td>

            <td className="p-3 "text-center>
            Bs. {producto.precio}
            </td>

            <td
            className="
            p-3
            font-bold
            text-green-600
            text-center
            "
            >
            Bs. {ganancia.toFixed(2)}
            </td>

            <td
              className="
              px-4
              py-4
              text-center
              "
            >

              <span
                className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-bold

                ${
                  producto.tipo_producto === 'grande'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }
                `}
              >

                {producto.tipo_producto === 'grande'
                  ? 'Grande'
                  : 'Pequeño'}

              </span>

            </td>

            <td className="p-3 text-center ">

            <span
              className={`
              px-3
              py-1
              rounded-full
              text-sm
              font-bold

              ${
                producto.stock <= 0
                  ? 'bg-red-100 text-red-700'
                  : (
                      producto.tipo_producto === 'pequeno'
                        ? producto.stock < 15
                        : producto.stock < 3
                    )
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }
              `}
            >
              {producto.stock}

              {producto.stock <= 0
                ? ' (Sin Stock)'
                : (
                    producto.tipo_producto === 'pequeno'
                      ? producto.stock < 15
                      : producto.stock < 3
                  )
                ? ' (Bajo)'
                : ''}
            </span>
            </td>

            <td
            className="
            p-3
            text-center
            flex
            gap-2
            "
            >

            <button
            onClick={() =>
            editarProducto(
            producto
            )
            }
            className="
            bg-blue-500
            text-white
            px-3
            py-2
            rounded
            "
            >
            Editar
            </button>

            <button
            onClick={() =>
            eliminarProducto(
            producto.id
            )
            }
            className="
            bg-red-500
            text-white
            px-3
            py-2
            rounded
            "
            >
            Eliminar
            </button>

            </td>

            </tr>

            )

            })}

            </tbody>

            </table>

            </div>

    </div>
  )
}
