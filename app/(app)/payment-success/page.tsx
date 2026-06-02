'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Home, Calendar, ShoppingBag, Download } from 'lucide-react'
import { MandalaPattern, DiyaIcon } from '@/components/spiritual-icons'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'booking' // booking or order

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Success Animation Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
          <MandalaPattern className="w-[600px] h-[600px] text-primary" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="w-14 h-14 text-white" />
              </motion.div>
            </div>
            
            {/* Confetti-like particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: 1, 
                  opacity: 0,
                  x: Math.cos(i * 45 * Math.PI / 180) * 80,
                  y: Math.sin(i * 45 * Math.PI / 180) * 80
                }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)',
                  marginTop: -6,
                  marginLeft: -6
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground">
            {type === 'booking' 
              ? 'Your pooja has been booked successfully'
              : 'Your order has been placed successfully'
            }
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-sm bg-card rounded-2xl p-6 border border-border/50 shadow-sm mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <DiyaIcon className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {type === 'booking' ? 'Booking ID' : 'Order ID'}
              </span>
              <span className="font-medium text-foreground">#SNK{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleDateString('en-IN', { 
                  day: 'numeric', month: 'short', year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">Confirmed</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              {type === 'booking'
                ? 'You will receive a confirmation call from the pandit shortly.'
                : 'Your order will be delivered within 3-5 business days.'
              }
            </p>
          </div>
        </motion.div>

        {/* Download Receipt */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-2 text-primary font-medium mb-8"
        >
          <Download className="w-5 h-5" />
          Download Receipt
        </motion.button>
      </main>

      {/* Bottom Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-6 pb-24 space-y-3"
      >
        <Link
          href={type === 'booking' ? '/bookings' : '/store'}
          className="block w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            {type === 'booking' ? (
              <>
                <Calendar className="w-5 h-5" />
                View My Bookings
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </>
            )}
          </div>
        </Link>
        <Link
          href="/home"
          className="block w-full py-4 bg-secondary text-secondary-foreground font-medium rounded-xl text-center border border-border hover:bg-accent transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
