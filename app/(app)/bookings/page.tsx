'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ChevronRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { DiyaIcon } from '@/components/spiritual-icons'
import { bookings, pandits, poojas } from '@/lib/data'
import { Booking } from '@/lib/types'

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'

const statusConfig = {
  pending: { color: 'text-yellow-600 bg-yellow-100', icon: AlertCircle, label: 'Pending' },
  confirmed: { color: 'text-blue-600 bg-blue-100', icon: CheckCircle2, label: 'Confirmed' },
  completed: { color: 'text-green-600 bg-green-100', icon: CheckCircle2, label: 'Completed' },
  cancelled: { color: 'text-red-600 bg-red-100', icon: XCircle, label: 'Cancelled' }
}

export default function BookingsPage() {
  const [filter, setFilter] = useState<BookingStatus>('all')

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

  const getPandit = (id: string) => pandits.find(p => p.id === id)
  const getPooja = (id: string) => poojas.find(p => p.id === id)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">My Bookings</h1>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  filter === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-accent'
                }`}
              >
                {status === 'all' ? 'All' : statusConfig[status].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No bookings found</h2>
            <p className="text-muted-foreground text-center mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings`
              }
            </p>
            <Link
              href="/home"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              Book a Pooja
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, i) => {
              const pandit = getPandit(booking.panditId)
              const pooja = getPooja(booking.poojaId)
              const status = statusConfig[booking.status]
              const StatusIcon = status.icon

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/bookings/${booking.id}`}>
                    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-all">
                      {/* Status Banner */}
                      <div className={`px-4 py-2 flex items-center justify-between ${status.color}`}>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{status.label}</span>
                        </div>
                        <span className="text-xs">#{booking.id.slice(-6).toUpperCase()}</span>
                      </div>

                      <div className="p-4">
                        {/* Pooja Info */}
                        <div className="flex gap-4 mb-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                            <DiyaIcon className="w-10 h-10 text-primary/60" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {pooja && (
                              <>
                                <p className="text-xs text-primary font-medium">{pooja.nameHindi}</p>
                                <h3 className="font-semibold text-foreground">{pooja.name}</h3>
                              </>
                            )}
                            {pandit && (
                              <p className="text-sm text-muted-foreground mt-1">
                                by {pandit.name}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-primary">
                              ₹{booking.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(booking.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{booking.address}</span>
                        </div>

                        {/* Action */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                          <span className="text-sm text-muted-foreground">
                            Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                          <div className="flex items-center gap-1 text-primary font-medium text-sm">
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
