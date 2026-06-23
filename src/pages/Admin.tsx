import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { supabase } from '../services/supabase'

import { Link } from 'react-router-dom'

interface Pedido {
  id: number
  codigo: string
  cliente: string
  telefono: string
  total: number
  estado: string
}

interface DetallePedido {
  id: number
  pedido_id: number
  producto_id: number
  cantidad: number
  subtotal: number
}

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
  imagen: string
  precio_compra: number
  tipo_producto: string
}

export default function Admin() {
  const navigate = useNavigate()

  const [loading, setLoading] =
    useState(true)

  const [pedidos, setPedidos] =
    useState<Pedido[]>([])

  const [totalProductos,
  setTotalProductos] =
  useState(0)

  const [stockTotal,
    setStockTotal] =
    useState(0)

  const [pendientes,
    setPendientes] =
    useState(0)

  const [confirmados,
    setConfirmados] =
    useState(0)
  
  const [beneficioPotencial,
  setBeneficioPotencial] =
  useState(0)

  const [ventasTotales,
    setVentasTotales] =
    useState(0)

  const [sinStock,
    setSinStock] =
    useState<Producto[]>([])

  const [stockBajo,
    setStockBajo] =
    useState<Producto[]>([])

  

  useEffect(() => {
    verificarSesion()
  }, [])

  async function verificarSesion() {
    const { data } =
      await supabase.auth.getSession()

    if (!data.session) {
      navigate('/login')
      return
    }

    await cargarPedidos()

    await cargarDashboard()

    setLoading(false)
  }

  async function cargarPedidos() {
    const { data, error } =
      await supabase
        .from('pedidos')
        .select('*')
        .order('id', {
          ascending: false,
        })

    if (error) {
      console.error(error)
      return
    }

    setPedidos(
      (data as Pedido[]) || []
    )
  }

  async function cargarDashboard() {

    const {
      data: productos
    } =
      await supabase
        .from('productos')
        .select('*')

    const {
      data: pedidos
    } =
      await supabase
        .from('pedidos')
        .select('*')

    const productosLista =
      (productos as Producto[]) || []

    const pedidosLista =
      pedidos || []

    setTotalProductos(
      productosLista.length
    )

    setStockTotal(

      productosLista.reduce(
        (
          total,
          producto
        ) =>
          total +
          producto.stock,
        0
      )

    )

    setPendientes(

      pedidosLista.filter(
        pedido =>
          pedido.estado ===
          'Pendiente'
      ).length

    )

    setConfirmados(

      pedidosLista.filter(
        pedido =>
          pedido.estado ===
          'Confirmado'
      ).length

    )

    const beneficio =

      productosLista.reduce(
        (
          total,
          producto
        ) =>

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

    setBeneficioPotencial(
      beneficio
    )

    const ventas =

      pedidosLista
        .filter(
          pedido =>
            pedido.estado ===
            'Confirmado'
        )
        .reduce(
          (
            total,
            pedido
          ) =>
            total +
            Number(
              pedido.total
            ),
          0
        )

    setVentasTotales(
      ventas
    )

    setSinStock(

      productosLista.filter(
        producto =>
          producto.stock <= 0
      )

    )

    setStockBajo(

      productosLista.filter(
        producto =>
          producto.stock > 0 &&
          producto.tipo_producto === 'pequeno'
          ? producto.stock < 15
          : producto.stock < 3
      )

    )

  }

  async function descontarStock(
    pedidoId: number
  ) {
    const {
      data: detalles,
      error,
    } = await supabase
      .from('detalle_pedido')
      .select('*')
      .eq('pedido_id', pedidoId)

    if (error || !detalles) {
      console.error(error)
      return
    }

    for (const item of detalles as DetallePedido[]) {
      const {
        data: producto,
        error: productoError,
      } = await supabase
        .from('productos')
        .select('*')
        .eq(
          'id',
          item.producto_id
        )
        .single()

      if (
        productoError ||
        !producto
      ) {
        console.error(
          productoError
        )
        continue
      }

      const productoActual =
        producto as Producto

      const nuevoStock =
        productoActual.stock -
        item.cantidad

      await supabase
        .from('productos')
        .update({
          stock: nuevoStock,
        })
        .eq(
          'id',
          productoActual.id
        )
    }
  }

  async function confirmarPedido(
    pedidoId: number
  ) {
    const {
      data: pedido,
      error,
    } = await supabase
      .from('pedidos')
      .select('*')
      .eq('id', pedidoId)
      .single()

    if (error || !pedido) {
      alert(
        'Pedido no encontrado'
      )
      return
    }

    if (
      pedido.estado ===
      'Confirmado'
    ) {
      alert(
        'Este pedido ya fue confirmado'
      )
      return
    }

    await descontarStock(
      pedidoId
    )

    const {
      error: updateError,
    } = await supabase
      .from('pedidos')
      .update({
        estado: 'Confirmado',
      })
      .eq('id', pedidoId)

    if (updateError) {
      console.error(
        updateError
      )

      alert(
        'Error al confirmar pedido'
      )

      return
    }

    await cargarPedidos()

    alert(
      'Pedido confirmado correctamente'
    )
  }

  async function logout() {
    await supabase.auth.signOut()

    navigate('/login')
  }

  if (loading) {
    return (
      <div className="p-6">
        Cargando panel...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div
        className="
        bg-slate-900
        text-white
        p-4
        flex
        justify-between
        items-center
      "
      >
        <div className="flex items-center gap-4">

          <h1
            className="
            text-2xl
            font-bold
          "
          >
            Panel Administrativo
          </h1>

          <Link
            to="/admin/productos"
            className="
            bg-blue-600
            px-4
            py-2
            rounded
            text-white
          "
          >
            Productos
          </Link>

        </div>

        <button
          onClick={logout}
          className="
          bg-red-500
          px-4
          py-2
          rounded
        "
        >
          Salir
        </button>
      </div>

      <div
        className="
        max-w-6xl
        mx-auto
        p-6
      "
      >
        <h2
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Pedidos
        </h2>

        <div
          className="
          grid
          md:grid-cols-3
          lg:grid-cols-6
          gap-4
          mb-8
        "
        >

          <div className="bg-white p-4 rounded shadow">
            <h3>Productos</h3>

            <p className="text-3xl font-bold">
              {totalProductos}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Stock</h3>

            <p className="text-3xl font-bold">
              {stockTotal}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Pendientes</h3>

            <p className="text-3xl font-bold text-yellow-500">
              {pendientes}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Confirmados</h3>

            <p className="text-3xl font-bold text-green-500">
              {confirmados}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Ventas</h3>

            <p className="text-3xl font-bold text-blue-600">
              Bs. {ventasTotales}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3>Beneficio</h3>

            <p className="text-3xl font-bold text-green-700">
              Bs. {beneficioPotencial}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div
            className="
            bg-white
            p-5
            rounded-lg
            shadow
          "
          >

            <h3
              className="
              text-xl
              font-bold
              text-red-600
              mb-3
            "
            >
              Productos sin stock
            </h3>

            {sinStock.length === 0 ? (
              <p>
                No existen
              </p>
            ) : (

              sinStock.map(
                producto => (

                  <p
                    key={
                      producto.id
                    }
                  >
                    ❌ {producto.nombre}
                  </p>

                )
              )

            )}

          </div>

          <div
            className="
            bg-white
            p-5
            rounded-lg
            shadow
          "
          >

            <h3
              className="
              text-xl
              font-bold
              text-yellow-600
              mb-3
            "
            >
              Stock bajo
            </h3>

            {stockBajo.length === 0 ? (
              <p>
                No existen
              </p>
            ) : (

              stockBajo.map(
                producto => (

                  <p
                    key={
                      producto.id
                    }
                  >
                    ⚠ {producto.nombre}
                    {' '}
                    ({producto.stock})
                  </p>

                )
              )

            )}

          </div>

        </div>

        {pedidos.length === 0 ? (
          <div
            className="
            bg-white
            p-6
            rounded-lg
            shadow
          "
          >
            No existen pedidos.
          </div>
        ) : (
          <div className="space-y-4">

            {pedidos.map(
              pedido => (
                <div
                  key={pedido.id}
                  className="
                  bg-white
                  p-5
                  rounded-lg
                  shadow
                "
                >
                  <div className="grid md:grid-cols-5 gap-4">

                    <div>
                      <p className="font-semibold">
                        Código
                      </p>

                      <p>
                        {pedido.codigo}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Cliente
                      </p>

                      <p>
                        {pedido.cliente}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Teléfono
                      </p>

                      <p>
                        {pedido.telefono}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Total
                      </p>

                      <p>
                        Bs. {pedido.total}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">
                        Estado
                      </p>

                      <p>
                        {pedido.estado}
                      </p>
                    </div>

                  </div>

                  {pedido.estado !==
                    'Confirmado' && (
                    <button
                      onClick={() =>
                        confirmarPedido(
                          pedido.id
                        )
                      }
                      className="
                      mt-4
                      bg-green-600
                      text-white
                      px-4
                      py-2
                      rounded
                    "
                    >
                      Confirmar Pedido
                    </button>
                  )}
                </div>
              )
            )}

          </div>
        )}
      </div>

    </div>
  )
}