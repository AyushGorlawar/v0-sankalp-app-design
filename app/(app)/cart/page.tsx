'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Ticket } from 'lucide-react'
import { DiyaIcon } from '@/components/spiritual-icons'
import { useApp } from '@/lib/context'
import { useState } from 'react'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useApp()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const deliveryFee = cartTotal > 500 ? 0 : 49
  const finalTotal = cartTotal + deliveryFee - discount

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'sankalp10') {
      setDiscount(Math.floor(cartTotal * 0.1))
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-4 py-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <Link href="/store" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Shopping Cart</h1>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Add some pooja samagri to get started
          </p>
          <Link
            href="/store"
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Browse Store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/store" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">{cartCount} items</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="text-sm text-destructive font-medium hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-4">
        {cart.map((cartItem, i) => (
          <motion.div
            key={`${cartItem.type}-${cartItem.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                <DiyaIcon className="w-10 h-10 text-primary/40" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {'nameHindi' in cartItem.item && (
                      <p className="text-xs text-primary font-medium">{cartItem.item.nameHindi}</p>
                    )}
                    <h3 className="font-medium text-foreground">{cartItem.item.name}</h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(cartItem.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-secondary rounded-lg">
                    <button
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                      className="p-2 text-foreground hover:bg-accent rounded-l-lg transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold text-foreground min-w-[24px] text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                      className="p-2 text-foreground hover:bg-accent rounded-r-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-primary">
                    ₹{(cartItem.item.price * cartItem.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Promo Code */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={applyPromo}
              className="px-5 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all"
            >
              Apply
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Try: SANKALP10 for 10% off</p>
        </div>
      </main>

      {/* Order Summary */}
      <div className="fixed bottom-20 left-0 right-0 bg-card border-t border-border/50 px-4 py-4">
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">₹{cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'text-foreground'}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600 font-medium">-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <Link
          href={`/checkout?amount=${finalTotal}`}
          className="block w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
