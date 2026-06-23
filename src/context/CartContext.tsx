import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { Producto } from '../types/Producto'
import type { CartItem } from '../types/CartItem'

interface CartContextType {
  cart: CartItem[]
  addToCart: (producto: Producto) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')

    if (stored) {
      setCart(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (producto: Producto) => {
    const existe = cart.find(
      item => item.id === producto.id
    )

    if (existe) {

    if (
      existe.cantidad >=
      existe.stock
    ) {

      alert(
        'No hay más stock disponible'
      )

      return

    }
      setCart(prev =>
        prev.map(item =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      )
    } else {
      setCart(prev => [
        ...prev,
        {
          ...producto,
          cantidad: 1,
        },
      ])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  const increaseQuantity = (id: number) => {

    setCart(prev =>
      prev.map(item => {

        if (item.id !== id)
          return item

        if (
          item.cantidad >= item.stock
        )
          return item

        return {
          ...item,
          cantidad:
            item.cantidad + 1,
        }

      })
    )

  }

  const decreaseQuantity = (id: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter(item => item.cantidad > 0)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce(
    (acc, item) => acc + item.cantidad,
    0
  )

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.precio * item.cantidad,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart debe usarse dentro de CartProvider'
    )
  }

  return context
}