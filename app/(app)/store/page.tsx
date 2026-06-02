'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, Plus, Minus, Filter } from 'lucide-react'
import { DiyaIcon } from '@/components/spiritual-icons'
import { samagri } from '@/lib/data'
import { useApp } from '@/lib/context'
import Link from 'next/link'

const categories = ['All', 'Kits', 'Essentials', 'Holy Items', 'Utensils', 'Fragrance', 'Spiritual', 'Havan']

export default function StorePage() {
  const { cart, addToCart, updateQuantity, cartCount, cartTotal } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSamagri = samagri.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.nameHindi.includes(searchQuery)
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCartQuantity = (id: string) => {
    const cartItem = cart.find(item => item.id === id && item.type === 'samagri')
    return cartItem?.quantity || 0
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Pooja Store</h1>
              <p className="text-sm text-muted-foreground">Authentic samagri for your rituals</p>
            </div>
            <Link
              href="/cart"
              className="relative p-3 bg-primary rounded-xl text-primary-foreground"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search samagri..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredSamagri.map((item, i) => {
            const quantity = getCartQuantity(item.id)
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm"
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <DiyaIcon className="w-16 h-16 text-primary/40" />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs text-primary font-medium">{item.nameHindi}</p>
                  <h3 className="font-medium text-foreground text-sm line-clamp-1 mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    
                    {item.inStock && (
                      <>
                        {quantity === 0 ? (
                          <button
                            onClick={() => addToCart(item, 'samagri')}
                            className="p-2 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-primary/10 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="p-1.5 text-primary hover:bg-primary/20 rounded-l-lg transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-semibold text-primary min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="p-1.5 text-primary hover:bg-primary/20 rounded-r-lg transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
          <Link href="/cart">
            <div className="bg-primary rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">{cartCount} items</p>
                  <p className="font-bold text-primary-foreground">₹{cartTotal.toLocaleString()}</p>
                </div>
              </div>
              <span className="font-semibold text-primary-foreground">View Cart →</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
