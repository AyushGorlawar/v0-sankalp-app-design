'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { CartItem, Samagri, Pooja, User, Booking } from '@/lib/types'

interface AppContextType {
  cart: CartItem[]
  addToCart: (item: Samagri | Pooja, type: 'samagri' | 'pooja') => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  user: User | null
  setUser: (user: User | null) => void
  isLoggedIn: boolean
  bookings: Booking[]
  addBooking: (booking: Booking) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>({
    id: 'user1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    address: '123, Green Park Extension',
    city: 'New Delhi'
  })
  const [bookings, setBookings] = useState<Booking[]>([])

  const addToCart = useCallback((item: Samagri | Pooja, type: 'samagri' | 'pooja') => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id && cartItem.type === type)
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { id: item.id, type, item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.item.price * item.quantity)
  }, 0)

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const addBooking = useCallback((booking: Booking) => {
    setBookings(prev => [...prev, booking])
  }, [])

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        user,
        setUser,
        isLoggedIn: !!user,
        bookings,
        addBooking
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
