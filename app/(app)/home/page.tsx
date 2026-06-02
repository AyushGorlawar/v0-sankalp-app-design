'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Bell, MapPin, Star, Clock, ChevronRight, Flame } from 'lucide-react'
import { MandalaPattern, DiyaIcon } from '@/components/spiritual-icons'
import { pandits, poojas, categories } from '@/lib/data'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const featuredPoojas = poojas.filter(p => p.isFeatured)
  const topPandits = pandits.filter(p => p.isAvailable).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DiyaIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Namaste</p>
                <h1 className="font-semibold text-foreground">Arjun Sharma</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-full bg-secondary hover:bg-accent transition-colors relative">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span>New Delhi, India</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search poojas, pandits..."
              className="w-full pl-12 pr-4 py-3 bg-secondary rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-6"
        >
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
            <MandalaPattern className="w-full h-full text-primary-foreground" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary-foreground" />
              <span className="text-sm text-primary-foreground/80 font-medium">Special Offer</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-2">
              Griha Pravesh Pooja
            </h2>
            <p className="text-primary-foreground/70 text-sm mb-4">
              20% off on complete house warming ceremony
            </p>
            <Link
              href="/booking/2"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary font-semibold rounded-full text-sm hover:shadow-lg transition-all"
            >
              Book Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
            <Link href="/categories" className="text-sm text-primary font-medium">
              See All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:border-primary/50'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Poojas */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Featured Poojas</h2>
            <Link href="/poojas" className="text-sm text-primary font-medium">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredPoojas.map((pooja, i) => (
              <motion.div
                key={pooja.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/pooja/${pooja.id}`}>
                  <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <DiyaIcon className="w-16 h-16 text-primary/60" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-primary font-medium mb-1">{pooja.nameHindi}</p>
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {pooja.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pooja.duration}</span>
                        </div>
                        <span className="font-bold text-primary text-sm">
                          ₹{pooja.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Pandits */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Top Pandits</h2>
            <Link href="/pandits" className="text-sm text-primary font-medium">
              See All
            </Link>
          </div>
          <div className="space-y-3">
            {topPandits.map((pandit, i) => (
              <motion.div
                key={pandit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/pandit/${pandit.id}`}>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-serif font-bold text-primary">
                        {pandit.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{pandit.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {pandit.specializations.slice(0, 2).join(', ')}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium text-foreground">{pandit.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {pandit.experience} yrs exp
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary">₹{pandit.hourlyRate}</span>
                      <p className="text-xs text-muted-foreground">/hour</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/store">
            <div className="p-5 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl border border-accent/30">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <DiyaIcon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Pooja Samagri</h3>
              <p className="text-sm text-muted-foreground mt-1">Order authentic items</p>
            </div>
          </Link>
          <Link href="/bookings">
            <div className="p-5 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl border border-primary/30">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">My Bookings</h3>
              <p className="text-sm text-muted-foreground mt-1">View your schedule</p>
            </div>
          </Link>
        </section>
      </main>
    </div>
  )
}
