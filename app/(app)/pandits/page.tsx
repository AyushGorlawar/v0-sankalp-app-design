'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter, Star, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react'
import { pandits } from '@/lib/data'

export default function PanditsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price'>('rating')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPandits = pandits
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'experience') return b.experience - a.experience
      return a.hourlyRate - b.hourlyRate
    })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">Find Pandits</h1>
          
          {/* Search */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-secondary rounded-xl flex items-center gap-2 hover:bg-accent transition-colors"
            >
              <Filter className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {[
                { key: 'rating', label: 'Top Rated' },
                { key: 'experience', label: 'Most Experienced' },
                { key: 'price', label: 'Lowest Price' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSortBy(filter.key as 'rating' | 'experience' | 'price')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    sortBy === filter.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* Results */}
      <main className="px-4 py-6">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredPandits.length} pandits available
        </p>

        <div className="space-y-4">
          {filteredPandits.map((pandit, i) => (
            <motion.div
              key={pandit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/pandit/${pandit.id}`}>
                <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-3xl font-serif font-bold text-primary">
                            {pandit.name.split(' ').slice(-1)[0].charAt(0)}
                          </span>
                        </div>
                        {pandit.isAvailable && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{pandit.name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{pandit.city}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-accent/30 rounded-lg">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="text-sm font-semibold text-foreground">{pandit.rating}</span>
                          </div>
                        </div>

                        {/* Specializations */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {pandit.specializations.slice(0, 3).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded-md"
                            >
                              {spec}
                            </span>
                          ))}
                          {pandit.specializations.length > 3 && (
                            <span className="px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded-md">
                              +{pandit.specializations.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{pandit.experience} yrs</span>
                        </div>
                        <span>{pandit.totalReviews} reviews</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">₹{pandit.hourlyRate}</span>
                        <span className="text-sm text-muted-foreground">/hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
